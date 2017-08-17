import { Component, ViewEncapsulation, HostBinding } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { ModalService } from '../../../modal/modal.service';
import { Field } from '../../../shared/models/field.model';
import { TitleFields } from './title.model';
import { FBObject } from '../fb-object.class';

@Component({
	selector: 'app-title',
	templateUrl: './title.component.html',
	styleUrls: ['./title.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TitleComponent extends FBObject {
	@HostBinding('class.editable') public editableClass = true;
	public emptyValue: string = 'Empty title: click to edit.';
	protected _fields: Array<Field> = TitleFields;

	constructor (
		_db: AngularFireDatabase,
		_modalService: ModalService
	) {
		super(_db, _modalService);
	}
}
