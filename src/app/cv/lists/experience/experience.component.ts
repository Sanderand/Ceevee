import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { ModalService } from '../../../modal/modal.service';
import { Field } from '../../../shared/models/field.model';
import { ExperienceFields } from './experience.model';
import { FBList } from '../fb-list.class';

@Component({
	selector: 'app-experience',
	templateUrl: './experience.component.html',
	styleUrls: ['./experience.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ExperienceComponent extends FBList {
	public emptyListValue: string = 'Empty experience list';
	public emptyItemValue: string = 'Empty experience item: Click to edit.';
	protected _fields: Array<Field> = ExperienceFields;

	constructor (
		_db: AngularFireDatabase,
		_modalService: ModalService
	) {
		super(_db, _modalService);
	}
}
