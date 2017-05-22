import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../../modal/modal.service';
import { Field } from '../../shared/models/field.model';
import { ExperienceFields } from './experience.model';
import { FBList } from '../../shared/classes/fb-list.class';

@Component({
    selector: 'cv-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExperienceComponent extends FBList {
    public emptyListValue: string = 'Empty experience list';
    public emptyItemValue: string = 'Empty experience item: Click to edit.';
    protected _fields: Array<Field> = ExperienceFields;

    constructor (
        _af: AngularFire,
        _modalService: ModalService
    ) {
        super(_af, _modalService);
    }
}
