import { IRoutingStrategy, NavCB } from "./routing-strategy.interface";

export class HistoryRoutingStrategy implements IRoutingStrategy {

  // @ts-ignore
  private callAfterNavigate: NavCB = (path: string, state: any) => null;

  init() {
    const self = this;
    window.addEventListener('popstate', (e) => {
      const route = e.state?.newRoute || '/';

      self.callAfterNavigate(route, {});
    });

    this.pushState(this.getActivePath());
  }

  getActivePath() {
    return window.location.pathname;
  }

  pushState(newRoute: string, state: any = {}) {
    window.history.pushState({newRoute, state}, newRoute, newRoute);
    this.callAfterNavigate(newRoute, state);
  }

  onNavigate(cb: NavCB): void {
    this.callAfterNavigate = cb;
  }

}