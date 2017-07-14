import { URLs, Card } from './card-gen';
import { Modal } from './modal-gen';
import { Contact } from './contact-form';
import { Btn } from './button';
import { CloseBtn } from './close';

interface Project {
  title: string
  desc: string
  url: URLs
  img?: string
}

// const $body: JQuery<HTMLElement> = $('body')

const $projects: JQuery<HTMLElement> = $('#projects-container');

$.ajax('/api/v1/projects/', {
  method: 'GET'
}).then(data => {
  const projects: Project[] = data;
  $projects.siblings('object.loader').remove();
  $projects.append(...projects.map(({title, desc, url, img}) => new Card(title, desc, url, img).div));
})

const $contactModalBtn: JQuery<HTMLElement> = $('.contact-modal-loader')
const $contactModal: JQuery<HTMLElement> = $('#contact-modal')

$contactModalBtn.on('click', () => {
  const $contactForm = new Contact();
  const $modal = new Modal('Message', [$contactForm.formElement], [$contactForm.button]).modal;
  let $form: JQuery<HTMLFormElement>;
  $contactForm.on('POST_SENT', () => {
    $form = $('div.modal-body').detach() as JQuery<HTMLFormElement>
    $('div.modal-body').append(
      $('<object>').attr({data: '/assets/img/loading.svg'}).addClass('loader mx-auto')
    )
    $('div.modal-footer').empty().append(
      (new Btn('Sending...')).btn.prop('disabled', true).addClass('mx-auto')
    )
  })
  .on('POST_SUCCESS', () => {
    $('h5.modal-title').text('Success!')
    $('div.modal-body').empty().append(
      $('<p>').text('Thanks for the message! I will get back to you shortly.'),
      $('<p>').text('– Brian').addClass('align-right')
    )
    $('div.modal-footer').empty().append((new CloseBtn()).btn)
  })
  .on('POST_FAILURE', () => {
    $('h5.modal-title').text('Error')
    $('div.modal-body').empty().append(
      $('<p>').text('An error occurred while sending your message. Please try again.')
    )
    $('div.modal-footer').empty().append((new CloseBtn()).btn)

  })
  $contactModal.empty().append($modal)
})