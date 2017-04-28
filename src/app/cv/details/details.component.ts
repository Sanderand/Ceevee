import { Component, ViewEncapsulation, HostBinding } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../../modal/modal.service';
import { Field } from '../../models/field.model';
import { DetailsFields } from '../../models/details.model';
import { FBObject } from '../../classes/fb-object.class';

@Component({
    selector: 'cv-details',
    templateUrl: 'details.component.html',
    styleUrls: ['details.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DetailsComponent extends FBObject {
    @HostBinding('class.editable') public editableClass = true;
    protected _fields: Array<Field> = DetailsFields;
    protected _key: string = 'details';

    constructor (
        _af: AngularFire,
        _modalService: ModalService
    ) {
        super(_af, _modalService);
    }
}
