import { IRoutingStrategy, NavCB } from "./routing-strategy.interface";


export class HashRoutingStrategy implements IRoutingStrategy {

  // @ts-ignore
  private callAfterNavigate: NavCB = (path: string, state: any) => null;

  init() {
    const self = this;
    if (window.location.hash === '') {
      window.location.hash = '/';
    }
    window.addEventListener('hashchange', () => {
      const route = this.stripHash(window.location.hash);

      self.callAfterNavigate(route, {});
    });

    this.pushState(this.getActivePath())
  }

  getActivePath() {
    return this.stripHash(window.location.hash);
  }

  pushState(newRoute: string, state: any = {}) {
    const path = this.stripHash(newRoute);
    window.location.hash = path;
    this.callAfterNavigate(path, state);
  }

  onNavigate(cb: (path: string, state?: any) => void): void {
    this.callAfterNavigate = cb;
  }

  private stripHash(path: string) {
    return path.startsWith('#') ? path.slice(1, path.length) : path;
  }

}