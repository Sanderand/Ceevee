import { Component, ViewEncapsulation, HostBinding } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../../modal/modal.service';
import { Field } from '../../models/field.model';
import { SkillsFields } from '../../models/skills.model';
import { FBList } from '../../classes/fb-list.class';

@Component({
    selector: 'cv-skills',
    templateUrl: 'skills.component.html',
    styleUrls: ['skills.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SkillsComponent extends FBList {
    @HostBinding('class.skills') public cssClass = true;
    protected _fields: Array<Field> = SkillsFields;

    constructor (
        _af: AngularFire,
        _modalService: ModalService
    ) {
        super(_af, _modalService);
    }
}
