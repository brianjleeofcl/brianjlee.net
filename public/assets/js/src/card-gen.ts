class CardImg {
  public img: JQuery<HTMLImageElement>
  constructor(src: string, alt: string){
    this.img = $('<img>').prop({src, alt}).addClass('card-img-top img-fluid') as JQuery<HTMLImageElement>
  }
}

class CardBlock {
  public div: JQuery<HTMLDivElement>
  constructor(title: string, desc: string, github: string) {
    const $title = $('<h4>').text(title).addClass('card-title');
    const $text = $('<p>').text(desc).addClass('card-text');
    const $github = $('<a>').text('GitHub').prop('href', github).addClass('card-link')
    this.div = $('<div>').addClass('card-block').append($title, $text, $github) as JQuery<HTMLDivElement>
  }
}

class CardFooter {
  public div: JQuery<HTMLDivElement>
  constructor(link: string) {
    const $footer: JQuery<HTMLDivElement> = $('<div>').addClass('card-footer') as JQuery<HTMLDivElement>
    const $button: JQuery<HTMLAnchorElement> = $('<a>') as JQuery<HTMLAnchorElement>
    $button.addClass('btn btn-primary').prop('href', link).text('Go to site')
    this.div = $footer.append($button);
  }
}

export interface URLs {
  github: string
  site: string
}

export class Card {
  public div: JQuery<HTMLDivElement>
  
  constructor(title: string, desc: string, url: URLs, img? : string) {
    const $card = img ? this.initimg(title, desc, url, img) : this.init(title, desc, url) 
    this.div = $card as JQuery<HTMLDivElement>
  }

  private initimg(title: string, desc: string, url:URLs, img: string): JQuery<HTMLDivElement> {
    const $card: JQuery<HTMLDivElement> = $('<div>').addClass('card mb-3') as JQuery<HTMLDivElement>
    const $image: JQuery<HTMLImageElement> = new CardImg(img, `${title} image`).img
    const $block: JQuery<HTMLDivElement> = new CardBlock(title, desc, url.github).div
    const $footer: JQuery<HTMLDivElement> = new CardFooter(url.site).div
    return $card.append($image, $block, $footer)
  }
  private init(title: string, desc: string, url: URLs): JQuery<HTMLDivElement> {
    const $card: JQuery<HTMLDivElement> = $('<div>').addClass('card mb-3') as JQuery<HTMLDivElement>
    const $block: JQuery<HTMLDivElement> = new CardBlock(title, desc, url.github).div
    const $footer: JQuery<HTMLDivElement> = new CardFooter(url.site).div
    return $card.append($block, $footer)
  }
}