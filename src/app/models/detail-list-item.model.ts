import { Tag } from './tag.model';

export class DetailListItem {
  public title: string = 'Title';
  public institution: string = 'Institution';
  public link: string = 'http://something.com';
  public location: string = 'Location';
  public start: string = 'Start';
  public end: string = 'End';
  public description: string = 'Description';
  public tags: Array<Tag> = [];
}
