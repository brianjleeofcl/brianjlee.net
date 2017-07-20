import { CloseIcon } from './close';

class ModalHeader {
  public div: JQuery<HTMLDivElement>;
  constructor(title: string) {
    const $div = $('<div>').addClass('modal-header');
    const $title = $('<h5>').addClass('modal-title').text(title);
    const $close = new CloseIcon().btn;
    this.div = $div.append($title, $close) as JQuery<HTMLDivElement>;
  }
}

class ModalBody {
  public div: JQuery<HTMLDivElement>;
  constructor(...body: JQuery<HTMLElement>[]) {
    this.div = $('<div>').addClass('modal-body').append(...body) as JQuery<HTMLDivElement>;
  }
}

class ModalFooter {
  public div: JQuery<HTMLDivElement>;
  constructor(...buttons: JQuery<HTMLElement>[]) {
    this.div = $('<div>').addClass('modal-footer').append(...buttons) as JQuery<HTMLDivElement>;
  }
}

export class Modal {
  public modal: JQuery<HTMLDivElement>;
  constructor(title: string, body: JQuery<HTMLElement>[], buttons: JQuery<HTMLElement>[]) {
    const $header: JQuery<HTMLDivElement> = new ModalHeader(title).div;
    const $body: JQuery<HTMLDivElement> = new ModalBody(...body).div;
    const $footer: JQuery<HTMLDivElement> = new ModalFooter(...buttons).div;
    const $modalContent = $('<div>').addClass('modal-content').append($header, $body, $footer);
    const $modalDialog = $('<div>').addClass('modal-dialog').append($modalContent);
    this.modal = $modalDialog as JQuery<HTMLDivElement>;
  }
}