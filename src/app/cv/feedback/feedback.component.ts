import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../../modal/modal.service';
import { Field } from '../../shared/models/field.model';
import { FeedbackFields } from '../../shared/models/feedback.model';
import { FBList } from '../../shared/classes/fb-list.class';

@Component({
    selector: 'cv-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FeedbackComponent extends FBList {
    protected _fields: Array<Field> = FeedbackFields;
    protected _key: string = 'feedback';

    constructor (
        _af: AngularFire,
        _modalService: ModalService
    ) {
        super(_af, _modalService);
    }
}
