export interface IRoutingStrategy {

  init(): void;

  getActivePath(): string;

  pushState(path: string, state?: any): void;

  onNavigate(cb: NavCB): void;
}

export type NavCB = (path: string, state?: any) => void;