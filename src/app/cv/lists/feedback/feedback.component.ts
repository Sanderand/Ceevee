import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { ModalService } from '../../../modal/modal.service';
import { Field } from '../../../shared/models/field.model';
import { FeedbackFields } from './feedback.model';
import { FBList } from '../fb-list.class';

@Component({
	selector: 'app-feedback',
	templateUrl: './feedback.component.html',
	styleUrls: ['./feedback.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class FeedbackComponent extends FBList {
	public emptyListValue: string = 'Empty feedback list';
	public emptyItemValue: string = 'Empty feedback item: Click to edit.';
	protected _fields: Array<Field> = FeedbackFields;

	constructor (
		_db: AngularFireDatabase,
		_modalService: ModalService
	) {
		super(_db, _modalService);
	}
}
