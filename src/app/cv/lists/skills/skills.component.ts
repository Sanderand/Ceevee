import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { ModalService } from '../../../modal/modal.service';
import { Field } from '../../../shared/models/field.model';
import { SkillsFields } from './skills.model';
import { FBList } from '../fb-list.class';

@Component({
	selector: 'app-skills',
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SkillsComponent extends FBList {
	public emptyListValue: string = 'Empty skill list';
	public emptyItemValue: string = 'Empty skill item: Click to edit.';
	protected _fields: Array<Field> = SkillsFields;

	constructor (
		_db: AngularFireDatabase,
		_modalService: ModalService
	) {
		super(_db, _modalService);
	}
}
