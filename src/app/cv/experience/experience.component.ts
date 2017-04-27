import { Component, ViewEncapsulation, HostBinding } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../../modal/modal.service';
import { Field } from '../../models/field.model';
import { ExperienceFields } from '../../models/experience.model';
import { FBList } from '../../classes/fb-list.class';

@Component({
    selector: 'cv-experience',
    templateUrl: 'experience.component.html',
    styleUrls: ['experience.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExperienceComponent extends FBList {
    @HostBinding('class.experience') public cssClass = true;
    protected _fields: Array<Field> = ExperienceFields;
    protected _key: string = 'experience';

    constructor (
        _af: AngularFire,
        _modalService: ModalService
    ) {
        super(_af, _modalService);
    }
}
