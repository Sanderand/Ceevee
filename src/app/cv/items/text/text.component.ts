import { Component, ViewEncapsulation, HostBinding } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { ModalService } from '../../../modal/modal.service';
import { Field } from '../../../shared/models/field.model';
import { TextFields } from './text.model';
import { FBObject } from '../fb-object.class';

@Component({
	selector: 'app-text',
	templateUrl: './text.component.html',
	styleUrls: ['./text.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TextComponent extends FBObject {
	@HostBinding('class.editable') public editableClass = true;
	public emptyValue: string = 'Empty text section: click to edit.';
	protected _fields: Array<Field> = TextFields;

	constructor (
		_db: AngularFireDatabase,
		_modalService: ModalService
	) {
		super(_db, _modalService);
	}
}
