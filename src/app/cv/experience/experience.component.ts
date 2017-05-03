import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../../modal/modal.service';
import { Field } from '../../shared/models/field.model';
import { ExperienceFields } from '../../shared/models/experience.model';
import { FBList } from '../../shared/classes/fb-list.class';

@Component({
    selector: 'cv-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExperienceComponent extends FBList {
    protected _fields: Array<Field> = ExperienceFields;
    protected _key: string = 'experience';

    constructor (
        _af: AngularFire,
        _modalService: ModalService
    ) {
        super(_af, _modalService);
    }
}
