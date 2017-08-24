import { I$Element } from './interface';

class CardImg implements I$Element<HTMLImageElement> {
  constructor(private src: string, private alt: string){ };

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
  constructor(link: string) {
    this.$footer = $('<div>').addClass('card-footer') as JQuery<HTMLDivElement>
    this.$button = $('<a>') as JQuery<HTMLAnchorElement>
    this.$button.addClass('btn btn-primary').prop('href', link).text('Go to site');
  }

  public render() {
    return this.$footer.append(this.$button) as JQuery<HTMLDivElement>;
  }
}

export interface URLs {
  github: string
  site: string
}

export class Card implements I$Element<HTMLDivElement> {
  constructor(private title: string, private desc: string, private url: URLs, private img? : string) { }

  private initimg(title: string, desc: string, url:URLs, img: string): JQuery<HTMLDivElement> {
    const $card: JQuery<HTMLDivElement> = $('<div>').addClass('card mb-3') as JQuery<HTMLDivElement>
    const $image: JQuery<HTMLImageElement> = new CardImg(img, `${title} image`).render();
    const $block: JQuery<HTMLDivElement> = new CardBlock(title, desc, url.github).render();
    const $footer: JQuery<HTMLDivElement> = new CardFooter(url.site).render();
    return $card.append($image, $block, $footer)
  }
  private init(title: string, desc: string, url: URLs): JQuery<HTMLDivElement> {
    const $card: JQuery<HTMLDivElement> = $('<div>').addClass('card mb-3') as JQuery<HTMLDivElement>
    const $block: JQuery<HTMLDivElement> = new CardBlock(title, desc, url.github).render();
    const $footer: JQuery<HTMLDivElement> = new CardFooter(url.site).render();
    return $card.append($block, $footer);
  }

  public render() {
    return this.img ? this.initimg(this.title, this.desc, this.url, this.img) : this.init(this.title, this.desc, this.url); 
  }
}