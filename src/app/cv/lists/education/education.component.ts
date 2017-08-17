import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { ModalService } from '../../../modal/modal.service';
import { Field } from '../../../shared/models/field.model';
import { EducationFields } from './education.model';
import { FBList } from '../fb-list.class';

@Component({
	selector: 'app-education',
	templateUrl: './education.component.html',
	styleUrls: ['./education.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class EducationComponent extends FBList {
	protected _fields: Array<Field> = EducationFields;
	public emptyListValue: string = 'Empty education list';
	public emptyItemValue: string = 'Empty education item: Click to edit.';

	constructor (
		_db: AngularFireDatabase,
		_modalService: ModalService
	) {
		super(_db, _modalService);
	}
}
