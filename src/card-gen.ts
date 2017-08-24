import { I$Element } from './interface';

import * as moment from 'moment';

class CardImg implements I$Element<HTMLImageElement> {
  constructor(private src: string | null, private alt: string){ };

  public render() {
    const src = this.src;
    const alt = this.alt;
    return $('<img>').prop({src, alt}).addClass('card-img-top img-fluid') as JQuery<HTMLImageElement>;
  }
}

class CardBlock implements I$Element<HTMLDivElement> {
  private $title: JQuery<HTMLElement>;
  private $text: JQuery<HTMLElement>;
  private $github: JQuery<HTMLElement>;
  constructor(title: string, desc: string, github: string) {
    this.$title = $('<h4>').text(title).addClass('card-title');
    this.$text = $('<p>').text(desc).addClass('card-text');
    this.$github = $('<a>').text('GitHub').prop('href', github).addClass('card-link');
  }

  public render() {
    return $('<div>').addClass('card-block').append(this.$title, this.$text, this.$github) as JQuery<HTMLDivElement>
  }
}

class CardFooter implements I$Element<HTMLDivElement> {
  private $footer: JQuery<HTMLElement>;
  private $button: JQuery<HTMLElement>;
  private $updated: JQuery<HTMLElement>;
  constructor(link: string, updated_at: string) {
    this.$footer = $('<div>').addClass('card-footer d-flex justify-content-between') as JQuery<HTMLDivElement>
    this.$button = $('<a>') as JQuery<HTMLAnchorElement>
    this.$button.addClass('btn btn-primary').prop('href', link).text('Go to site');
    const relTime = moment(updated_at).fromNow()
    this.$updated = $('<small>').text(`Last updated ${relTime}`).addClass('text-muted d-flex align-items-center')
  }

  public render() {
    return this.$footer.append(this.$button, this.$updated) as JQuery<HTMLDivElement>;
  }
}

export interface URLs {
  github: string
  site: string
}

export class Card implements I$Element<HTMLDivElement> {
  constructor(
    private title: string, 
    private desc: string, 
    private url: URLs, 
    private updated_at: string, 
    private img? : string
  ) { }

  public render() {
    const $card: JQuery<HTMLDivElement> = $('<div>').addClass('card mb-3') as JQuery<HTMLDivElement>
    const $image: JQuery<HTMLImageElement> | null = this.img ? new CardImg(this.img, `${this.title} image`).render() : null;
    const $block: JQuery<HTMLDivElement> = new CardBlock(this.title, this.desc, this.url.github).render();
    const $footer: JQuery<HTMLDivElement> = new CardFooter(this.url.site, this.updated_at).render();
    return $image ? $card.append($image, $block, $footer) : $card.append($block, $footer);
  }
}