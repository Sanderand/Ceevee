import { Field } from './field.model';

export const RecommendationFields: Array<Field> = [{
  key: 'name',
  label: 'Name',
  type: 'text',
  placeholder: 'John Doe'
}, {
  key: 'institution',
  label: 'Institution',
  type: 'text',
  placeholder: 'The Company'
}, {
  key: 'relationship',
  label: 'Relationship',
  type: 'text',
  placeholder: 'Manager'
}, {
  key: 'comment',
  label: 'Comment',
  type: 'textarea',
  placeholder: 'Lorem ipsum dolor sit amet.'
}];
