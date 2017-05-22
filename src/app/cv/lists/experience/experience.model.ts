import { Field } from '../../../shared/models/field.model';

export const ExperienceFields: Array<Field> = [{
  key: 'title',
  label: 'Title',
  placeholder: 'Title',
  type: 'text'
}, {
  key: 'institution',
  label: 'Institution',
  placeholder: 'Institution',
  type: 'text'
}, {
  key: 'link',
  label: 'Link',
  placeholder: 'http://',
  type: 'text'
}, {
  key: 'location',
  label: 'Location',
  placeholder: 'Location',
  type: 'text'
}, {
  key: 'start',
  label: 'Start',
  placeholder: 'Start',
  type: 'month'
}, {
  key: 'end',
  label: 'End',
  placeholder: 'End',
  type: 'month'
}, {
  key: 'description',
  label: 'Description',
  placeholder: 'Description',
  type: 'textarea'
}, {
  key: 'tags',
  label: 'Tags',
  placeholder: 'Tags',
  type: 'text'
}];
