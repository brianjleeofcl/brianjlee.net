import { Btn } from './button';
import { I$Element } from './interface';

class FormGroup implements I$Element<HTMLFieldSetElement> {
  private $input: JQuery<HTMLElement>;
  private $label: JQuery<HTMLElement>;
  constructor(type: string, label: string, value?: string) {
    const $input = type === 'message' ? $('<textarea>').attr('rows', '3') : $('<input>').attr({type});
    if (value) $input.val(value);
    this.$input = $input.addClass('form-control');
    this.$label = $('<label>').text(label);
  }

  get valid(): boolean {
    return true
  }

  get data(): string {
    return this.$input.val() as string
  }

  public render() {
    return $('<fieldset>').addClass('form-group').append(this.$label, this.$input) as JQuery<HTMLFieldSetElement>
  }
}

class Form implements I$Element<HTMLFormElement> {
  public name: FormGroup
  public email: FormGroup
  public message: FormGroup
  constructor(name?: string, email?: string, message?: string) {
    this.name = new FormGroup('text', 'Name', name);
    this.email = new FormGroup('email', 'E-mail', email);
    this.message = new FormGroup('message', 'Message', message);
  }

  public render() {
    return $('<form>').append(
      this.name.render(), 
      this.email.render(), 
      this.message.render()
    ) as JQuery<HTMLFormElement>;
  }
}

class SubmitBtn extends Btn implements I$Element<HTMLButtonElement> {
  constructor(private clickHandler: Function) {
    super('Submit');
  }

  public render() {
    return super.render().on('click', this.clickHandler as JQuery.EventHandler<any, any>).addClass('btn-primary mx-auto').attr({type: 'button'})
  }
}

interface EventRecord {
  [event: string]: Array<(...data: any[]) => void>
}

export class Contact {
  private form: Form;
  public $formElement: JQuery<HTMLFormElement>;
  public $button: JQuery<HTMLButtonElement>;
  private eventRecord: EventRecord;

  constructor(name?: string, email?: string, message?: string) {
    this.form = new Form(name, email, message);
    this.$formElement = this.form.render();
    this.submit = this.submit.bind(this);
    this.$button = new SubmitBtn(this.submit).render();
    this.eventRecord = {};
  }

  public on(event: string, fn: (...data: any[]) => void ): this {
    if (this.eventRecord[event]) this.eventRecord[event].push(fn);
    else this.eventRecord[event] = [fn];
    return this;
  }

  private emit(event: string, ...data: any[]): void {
    for (let fn of this.eventRecord[event]) fn(...data);
  }

  private submit(): void {
    const data: string = JSON.stringify(this.data);

    $.ajax('/api/v1/email/send', { 
      method: 'POST', 
      contentType: 'application/json',
      data 
    })
    .always(() => this.emit('POST_SENT'))
    .then(() => this.emit('POST_SUCCESS'), res => this.emit('POST_FAIL', res))
  }

  get data(): MessageData {
    return { 
      name: this.form.name.data, 
      email: this.form.email.data,
      message: this.form.message.data
    }
  }
}

export interface MessageData {
  name: string,
  email: string,
  message: string
}

export class ReturnBtn extends Btn implements I$Element<HTMLButtonElement> {
  constructor (private clickHandler: Function) {
    super('Go back');
  }

  public render() {
    return super.render().addClass('btn-primary').click(this.clickHandler as JQuery.EventHandler<any>)
  }
}