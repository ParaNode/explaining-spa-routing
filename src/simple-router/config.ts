export interface ISimpleRouterConfig {
  routerOutletSelector: string;
  navLinkSelector: string;
  navPageSelector: string;
  notFoundSelector: string;
  navPageLinkAttr: string;
}

export const defaultConfig: ISimpleRouterConfig = {
  routerOutletSelector: '#routerOutlet',
  navLinkSelector: 'a[navLink]',
  navPageSelector: 'template[navPage]',
  notFoundSelector: 'template[notFound]',
  navPageLinkAttr: 'navPage',
}