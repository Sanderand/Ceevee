import { Field } from '../../../shared/models/field.model';

export const HeaderFields: Array<Field> = [{
	key: 'name',
	label: 'Name',
	placeholder: 'Name',
	type: 'text'
}, {
	key: 'title',
	label: 'Title',
	placeholder: 'Title',
	type: 'text'
}, {
	key: 'address',
	label: 'Address',
	placeholder: 'Address',
	type: 'text'
}, {
	key: 'email',
	label: 'Email',
	placeholder: 'Email',
	type: 'email'
}, {
	key: 'tel',
	label: 'Tel',
	placeholder: 'Tel',
	type: 'text'
}];
