import { I$Element } from './interface';

export class Button implements I$Element<HTMLButtonElement> {
  private $button: JQuery<HTMLButtonElement>
  constructor(text: string | JQuery<HTMLElement>) {
    this.$button = $('<button>').attr('type', 'button') as JQuery<HTMLButtonElement>
    typeof text == 'string' ? this.$button.text(text) : this.$button.append(text)
  }

  render() {
    return this.$button
  }
}

export class Btn extends Button implements I$Element<HTMLButtonElement> {
  constructor(text: string) {
    super(text);
  }

  render() {
    return super.render().addClass('btn');
  }
}