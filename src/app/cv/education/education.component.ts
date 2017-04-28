import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../../modal/modal.service';
import { Field } from '../../models/field.model';
import { EducationFields } from '../../models/education.model';
import { FBList } from '../../classes/fb-list.class';

@Component({
    selector: 'cv-education',
    templateUrl: 'education.component.html',
    styleUrls: ['education.component.scss'],
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
