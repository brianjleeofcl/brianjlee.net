import { I$Element } from './interface';

import * as moment from 'moment';

class CardImg implements I$Element<HTMLImageElement> {
  constructor(private src: string | null, private alt: string) { }

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
    return $('<div>').addClass('card-block').append(this.$title, this.$text, this.$github) as JQuery<HTMLDivElement>;
  }
}

class CardFooter implements I$Element<HTMLDivElement> {
  private $btn: JQuery<HTMLElement>;
  private $updated: JQuery<HTMLElement>;
  constructor(link: string, updatedAt: string) {
    this.$btn = $('<a>') as JQuery<HTMLAnchorElement>;
    this.$btn.addClass('btn btn-primary').prop('href', link).text('Go to site');
    const relTime = moment(updatedAt).fromNow();
    this.$updated = $('<small>').text(`Last updated ${relTime}`).addClass('text-muted d-flex align-items-center');
  }

  public render() {
    return $('<div>').addClass('card-footer card-f-align').append(this.$btn, this.$updated) as JQuery<HTMLDivElement>;
  }
}

export interface URLs {
  github: string;
  site: string;
}

export class Card implements I$Element<HTMLDivElement> {
  private $image?: JQuery<HTMLImageElement>;
  private $block: JQuery<HTMLDivElement>;
  private $footer: JQuery<HTMLDivElement>;

  constructor(
    title: string, 
    desc: string, 
    url: URLs, 
    updatedAt: string, 
    img?: string
  ) {
    if (img) this.$image = new CardImg(img, `${title} image`).render();
    this.$block = new CardBlock(title, desc, url.github).render();
    this.$footer = new CardFooter(url.site, updatedAt).render();
  }

  public render() {
    return this.$image 
      ? $('<div>').addClass('card mb-3').append(this.$image, this.$block, this.$footer) as JQuery<HTMLDivElement>
      : $('<div>').addClass('card mb-3').append(this.$block, this.$footer) as JQuery<HTMLDivElement>;
  }
}