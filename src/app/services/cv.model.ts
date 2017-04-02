export class Details {
  public name: string;
  public dob: number;
  public email: string;
  public url: string;
  public tel: string;
  public summary: string;
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
