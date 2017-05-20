import { Component, ViewEncapsulation, HostBinding } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../../modal/modal.service';
import { Field } from '../../shared/models/field.model';
import { TitleFields } from './title.model';
import { FBObject } from '../../shared/classes/fb-object.class';

@Component({
    selector: 'cv-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TitleComponent extends FBObject {
    @HostBinding('class.editable') public editableClass = true;
    protected _fields: Array<Field> = TitleFields;

    constructor (
        _af: AngularFire,
        _modalService: ModalService
    ) {
        super(_af, _modalService);
    }
}
