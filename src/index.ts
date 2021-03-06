import { URLs, Card } from './card-gen';
import { Modal } from './modal-gen';
import { Contact, ReturnBtn, MessageData } from './contact-form';
import { Btn } from './button';
import { CloseBtn } from './close';

interface Project {
  title: string;
  desc: string;
  url: URLs;
  updated_at: string;
  img?: string;
}

const $projects: JQuery<HTMLElement> = $('#projects-container');

$.ajax('/api/v1/projects/', {
  method: 'GET'
}).then((data: Project[]) => {
  $projects.siblings('object.loader').remove();

  for (let project of data) {
    const {title, desc, url, updated_at, img} = project;
    new Card(title, desc, url, updated_at, img).render().appendTo($projects);
  }
});

const $contactModalBtn: JQuery<HTMLElement> = $('.contact-modal-loader');
const $contactModal: JQuery<HTMLElement> = $('#contact-modal');

$contactModalBtn.on('click', () => {
  const $contactForm = new Contact();
  const $modal = new Modal('Message', [$contactForm.$formElement], [$contactForm.$button]).render();

  attachListeners($contactForm);
  $contactModal.empty().append($modal);

  function attachListeners(contact: Contact): void {
    let messageData: MessageData;
    contact.on('POST_SENT', () => {
      messageData = contact.data;
      $('div.modal-body').append(
        $('<object>').attr({data: '/assets/img/loading.svg'}).addClass('loader mx-auto')
      );
      $('div.modal-footer').empty().append(
        (new Btn('Sending...')).render().prop('disabled', true).addClass('mx-auto')
      );
    })
    .on('POST_SUCCESS', () => {
      $('h5.modal-title').text('Success!');
      $('div.modal-body').empty().append(
        $('<p>').text('Thanks for the message! I will get back to you shortly.'),
        $('<p>').text('– Brian').addClass('align-right')
      );
      $('div.modal-footer').empty().append((new CloseBtn()).render());
    })
    .on('POST_FAIL', res => {
      $('h5.modal-title').text('Uh-oh!');
      $('div.modal-body').empty().append(
        $('<div>').addClass('alert alert-danger').append(
          $('<h6>').text(`${res.status}: ${res.statusText}`),
          $('<p>').text('An error occurred while sending your message. Please try again.')
        )
      );
      const goBack = createReturnCallback(messageData);
      $('div.modal-footer').empty().append((new ReturnBtn(goBack)).render(), (new CloseBtn()).render());
    });
  }
    
  function createReturnCallback(messageData: MessageData): () => void {
    return function() {
      const $newForm = new Contact(messageData.name, messageData.email, messageData.message);
      $('h5.modal-title').text('Message');
      $('div.modal-body').empty().append($newForm.$formElement);
      $('div.modal-footer').empty().append($newForm.$button);
      attachListeners($newForm);
    };
  }
});