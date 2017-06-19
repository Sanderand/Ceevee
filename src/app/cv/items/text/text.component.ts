import { Component, ViewEncapsulation, HostBinding } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../../../modal/modal.service';
import { Field } from '../../../shared/models/field.model';
import { TextFields } from './text.model';
import { FBObject } from '../fb-object.class';

@Component({
	selector: 'cv-text',
	templateUrl: './text.component.html',
	styleUrls: ['./text.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TextComponent extends FBObject {
	@HostBinding('class.editable') public editableClass = true;
	public emptyValue: string = 'Empty text section: click to edit.';
	protected _fields: Array<Field> = TextFields;

	constructor (
		_af: AngularFire,
		_modalService: ModalService
	) {
		super(_af, _modalService);
	}
}
