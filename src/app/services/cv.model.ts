export class Details {
  public name: string;
  public address: string;
  public email: string;
  public url: string;
  public tel: string;
}

export class Theme {
  public name: string;
  public class: string;
}

export class CV {
  public details: Details;
  public theme: Theme;
  public items: Array<any> = [];
}
