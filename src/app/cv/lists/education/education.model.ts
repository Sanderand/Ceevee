import { Field } from '../../../shared/models/field.model';

export const EducationFields: Array<Field> = [{
	key: 'institution',
	label: 'Institution',
	type: 'text',
	placeholder: 'Institution'
}, {
	key: 'link',
	label: 'Link',
	type: 'text',
	placeholder: 'http://'
}, {
	key: 'location',
	label: 'Location',
	type: 'text',
	placeholder: 'Location'
}, {
	key: 'start',
	label: 'Start',
	type: 'month',
	placeholder: 'Start'
}, {
	key: 'end',
	label: 'End',
	type: 'month',
	placeholder: 'End'
}, {
	key: 'title',
	label: 'Title',
	type: 'text',
	placeholder: 'Title'
}, {
	key: 'description',
	label: 'Description',
	type: 'textarea',
	placeholder: 'Description'
}];
