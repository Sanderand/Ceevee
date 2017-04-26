import { OnInit, Input } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../modal/modal.service';
import { Field } from '../models/field.model';
import { generateUUID } from '../helpers/math.helpers';

export class FBList implements OnInit {
    @Input() public path: string = null;

    public data: any = null;
    protected _fields: Array<Field> = [];
    private _uuid: string = generateUUID();
    private keyInModal: string = null;

    constructor (
        private _af: AngularFire,
        private _modalService: ModalService
    ) {}

    public ngOnInit (): void {
        this._af.database
            .list(this.path)
            .subscribe(data => this.data = data);

        this._modalService.close$
            .filter(res => !!res && res.source === this._uuid)
            .subscribe(res => this.updateData(res.data));
    }

    public editData ($event, item): void {
        if (!item) {
            return;
        }

        $event.preventDefault();

        this._modalService
            .openModal({
                data: Object.assign({}, item),
                fields: this._fields.map(a => Object.assign({}, a)),
                preventDelete: false,
                source: this._uuid
            });

        this.keyInModal = item.$key || null;
    }

    private updateData (data): void {
        if (data) {
            if (this.keyInModal) {
                this._af.database
                    .list(this.path)
                    .update(this.keyInModal, data);
            } else {
                this._af.database
                    .list(this.path)
                    .push(data);
            }
        } else {
            this._af.database
                .list(this.path)
                .remove(this.keyInModal);
        }

        this.keyInModal = null;
    }
}
