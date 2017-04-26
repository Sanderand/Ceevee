import { Field } from './field.model';

export const SkillFields: Array<Field> = [{
  key: 'title',
  label: 'Title',
  type: 'text',
  placeholder: 'Title'
}, {
  key: 'percentage',
  label: 'Percentage',
  type: 'number',
  placeholder: 'Percentage'
}, {
  key: 'description',
  label: 'Description',
  type: 'textarea',
  placeholder: 'Description'
}];
