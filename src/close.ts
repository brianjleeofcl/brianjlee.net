import { Button, Btn } from './button';
import { I$Element } from './interface';

export class CloseIcon extends Button implements I$Element<HTMLButtonElement> {
  constructor() {
    super($('<span>').html('&times;').prop('aria-hidden', true));
  }

  render() {
    return super.render().addClass('close').attr({
      'data-dismiss': 'modal', 
      type: 'button', 
      'aria-label': 'close'
    });
  }
}

export class CloseBtn extends Btn implements I$Element<HTMLButtonElement> {
  constructor() {
    super('close');
  }

  render() {
    return super.render().addClass('btn-secondary').attr({
      'data-dismiss': 'modal', 
      type: 'button', 
      'aria-label': 'close'
    });
  }
}
