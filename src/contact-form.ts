import { Btn } from './button';

class FormGroup {
  public field: JQuery<HTMLElement>
  private input: JQuery<HTMLElement>
  constructor(type: string, label: string, value?: string) {
    const $input = type === 'message' ? $('<textarea>').attr('rows', '3') : $('<input>').attr({type});
    if (value) $input.val(value);
    this.input = $input;
    $input.addClass('form-control');
    const $label = $('<label>').text(label);
    const $fs = $('<fieldset>').addClass('form-group').append($label, $input);
    this.field = $fs;
  }

  get valid(): boolean {
    return true
  }

  get data(): string {
    return this.input.val() as string
  }
}

class Form {
  public name: FormGroup
  public email: FormGroup
  public message: FormGroup
  constructor(name?: string, email?: string, message?: string) {
    this.name = new FormGroup('text', 'Name', name);
    this.email = new FormGroup('email', 'E-mail', email);
    this.message = new FormGroup('message', 'Message', message);
  }
}

class SubmitBtn extends Btn {
  public btn: JQuery<HTMLButtonElement>;
  constructor(fn: Function) {
    super('Submit')
    this.btn.on('click', fn as JQuery.EventHandler<any, any>)
    this.btn.addClass('btn-primary mx-auto').attr({type: 'button'})
  }
}

interface EventRecord {
  [event: string]: Array<(...data: any[]) => void>
}

export class Contact {
  private form: Form;
  public formElement: JQuery<HTMLElement>
  public button: JQuery<HTMLElement>;
  private eventRecord: EventRecord;

  constructor(name?: string, email?: string, message?: string) {
    this.form = new Form(name, email, message);
    const $form = $('<form>').append(this.form.name.field, this.form.email.field, this.form.message.field);
    this.formElement = $form;
    this.submit = this.submit.bind(this);
    this.button = new SubmitBtn(this.submit).btn;
    this.eventRecord = {};
  }

  public on(event: string, fn: (...data: any[]) => void ): this {
    if (this.eventRecord[event]) this.eventRecord[event].push(fn)
    else this.eventRecord[event] = [fn]
    return this
  }

  private emit(event: string, ...data: any[]): void {
    for (let fn of this.eventRecord[event]) fn(...data)
  }

  private submit(): void {
    const data: string = JSON.stringify(this.returnData())

    $.ajax('/api/v1/email/send', { 
      method: 'POST', 
      contentType: 'application/json',
      data 
    })
    .always(() => this.emit('POST_SENT'))
    .then(() => this.emit('POST_SUCCESS'), res => this.emit('POST_FAIL', res))
  }

  public returnData(): MessageData {
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

export class ReturnBtn extends Btn{
  constructor (fn: Function) {
    super('Go back');
    this.btn.addClass('btn-primary');
    this.btn.click(fn as JQuery.EventHandler<any>)
  }
}