import { Component, ViewEncapsulation, HostBinding, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../../modal/modal.service';
import { Field } from '../../shared/models/field.model';
import { DetailsFields } from '../../shared/models/details.model';
import { FBObject } from '../../shared/classes/fb-object.class';

@Component({
    selector: 'cv-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DetailsComponent extends FBObject {
    @HostBinding('class.editable') public editableClass = true;
    protected _fields: Array<Field> = DetailsFields;

    constructor (
        _af: AngularFire,
        _modalService: ModalService
    ) {
        super(_af, _modalService);
    }
}
