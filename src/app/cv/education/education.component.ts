import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../../modal/modal.service';
import { Field } from '../../shared/models/field.model';
import { EducationFields } from './education.model';
import { FBList } from '../../shared/classes/fb-list.class';

@Component({
    selector: 'cv-education',
    templateUrl: './education.component.html',
    styleUrls: ['./education.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EducationComponent extends FBList {
    protected _fields: Array<Field> = EducationFields;
    protected _key: string = 'education';

    constructor (
        _af: AngularFire,
        _modalService: ModalService
    ) {
        super(_af, _modalService);
    }
}
