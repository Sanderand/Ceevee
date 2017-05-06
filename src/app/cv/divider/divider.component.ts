import { Component, ViewEncapsulation, HostBinding } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../../modal/modal.service';
import { Field } from '../../shared/models/field.model';
import { DividerFields } from '../../shared/models/divider.model';
import { FBObject } from '../../shared/classes/fb-object.class';

@Component({
    selector: 'cv-divider',
    templateUrl: './divider.component.html',
    styleUrls: ['./divider.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DividerComponent extends FBObject {
    @HostBinding('class.editable') public editableClass = true;
    protected _fields: Array<Field> = DividerFields;

    constructor (
        _af: AngularFire,
        _modalService: ModalService
    ) {
        super(_af, _modalService);
    }
}
