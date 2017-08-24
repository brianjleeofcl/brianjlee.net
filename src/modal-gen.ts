import { CloseIcon } from './close';
import { I$Element } from './interface';

class ModalHeader implements I$Element<HTMLDivElement> {
  private $close = new CloseIcon().render();
  private $title: JQuery<HTMLElement>;

  constructor(title: string) {
    this.$title = $('<h5>').addClass('modal-title').text(title);
  }

  render() {
    return $('<div>').addClass('modal-header').append(this.$title, this.$close) as JQuery<HTMLDivElement>;
  }
}

class ModalBody implements I$Element<HTMLDivElement> {
  private body: JQuery<HTMLElement>[];
  constructor(...body: JQuery<HTMLElement>[]) {
    this.body = body;
  }

  render() {
    return $('<div>').addClass('modal-body').append(...this.body) as JQuery<HTMLDivElement>;
  }
}

class ModalFooter implements I$Element<HTMLDivElement> {
  private buttons: JQuery<HTMLElement>[];
  constructor(...buttons: JQuery<HTMLElement>[]) {
    this.buttons = buttons;
  }

  render() {
    return $('<div>').addClass('modal-footer').append(...this.buttons) as JQuery<HTMLDivElement>;
  }
}

export class Modal implements I$Element<HTMLDivElement> {
  private content: JQuery<HTMLElement>;
  constructor(title: string, body: JQuery<HTMLElement>[], buttons: JQuery<HTMLElement>[]) {
    const $header: JQuery<HTMLDivElement> = new ModalHeader(title).render();
    const $body: JQuery<HTMLDivElement> = new ModalBody(...body).render();
    const $footer: JQuery<HTMLDivElement> = new ModalFooter(...buttons).render();
    this.content = $('<div>').addClass('modal-content').append($header, $body, $footer);
  }

  render() {
    return $('<div>').addClass('modal-dialog').append(this.content) as JQuery<HTMLDivElement>;
  }
}