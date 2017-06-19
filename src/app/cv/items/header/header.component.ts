import { Component, ViewEncapsulation, HostBinding, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../../../modal/modal.service';
import { Field } from '../../../shared/models/field.model';
import { HeaderFields } from './header.model';
import { FBObject } from '../fb-object.class';

@Component({
	selector: 'cv-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HeaderComponent extends FBObject {
	@HostBinding('class.editable') public editableClass = true;
	protected _fields: Array<Field> = HeaderFields;
	public emptyValue: string = 'Empty header section: click to edit.';

	constructor (
		_af: AngularFire,
		_modalService: ModalService
	) {
		super(_af, _modalService);
	}
}
