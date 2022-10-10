import { ISimpleRouterConfig, defaultConfig } from "./config";
import { IRoutingStrategy } from "./routing-strategy.interface";


export class SimpleRouter {
  private _config: ISimpleRouterConfig;
  private _pagesMap = new Map<string, HTMLTemplateElement>();
  private _navLinksArr: Array<HTMLAnchorElement> = [];
  private _routerOutlet!: HTMLElement;
  private _notFoundPage!: HTMLTemplateElement;

  constructor(private strategy: IRoutingStrategy, config: Partial<ISimpleRouterConfig> = {}) {
    this._config = {
      ...defaultConfig,
      ...config
    }

  }

  initialize() {
    const self = this;

    // pages
    const navPages = document.querySelectorAll(this._config.navPageSelector);
    navPages.forEach(page => {
      const routeLink = page.getAttribute(this._config.navPageLinkAttr) || '/';
      this._pagesMap.set(routeLink, page as HTMLTemplateElement)
    });

    // notfound page
    this._notFoundPage = document.querySelector(this._config.notFoundSelector) || this.createNotFoundElement();

    // links
    const navLinks = document.querySelectorAll(this._config.navLinkSelector);
    navLinks.forEach(item => this._navLinksArr.push(item as HTMLAnchorElement));
    this._navLinksArr.forEach(item => {item.onclick = this.createLinkInterceptor(item)});
  
    // outlet
    const outlet = document.querySelector(this._config.routerOutletSelector);
    if(!outlet) {
      throw new Error('Router outlet is not found');
    }
    this._routerOutlet = outlet as HTMLElement;

    // define what happen when navigation happens
    this.strategy.onNavigate((path) => {
      self.navigate(path);
    });

    // initialize routes
    this.strategy.init();
  }

  private createNotFoundElement() {
    const elm = document.createElement('template');
    elm.innerHTML = `Page Not Found`;
    return elm;
  }

  private navigate(to: string) {
    let page = this._pagesMap.get(to);
  
    if (!page) {
      page = this._notFoundPage;
    }

    this.mountPage(page);
  }


  private createLinkInterceptor(item: HTMLAnchorElement) {
    return (event: MouseEvent) => {
      event.preventDefault();
      const href = item.getAttribute('href') || '/';
      this.strategy.pushState(href);
    }
  }

  private mountPage(page: HTMLTemplateElement) {
    this._routerOutlet.innerHTML = page.innerHTML;
  }
}