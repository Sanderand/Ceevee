import { OnInit, Input, HostListener } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../modal/modal.service';
import { Field } from '../models/field.model';
import { generateUUID } from '../helpers/math.helpers';

export class FBObject implements OnInit {
    @Input() public path: string = null;

    public data: any = null;
    protected _fields: Array<Field> = [];
    private _uuid: string = generateUUID();

    constructor (
        private _af: AngularFire,
        private _modalService: ModalService
    ) {}

    public ngOnInit (): void {
        this._af.database
            .object(this.path)
            .subscribe(data => this.data = data);

        this._modalService.close$
            .filter(res => !!res && res.source === this._uuid)
            .subscribe(res => this.updateData(res.data));
    }

    @HostListener('click', ['$event'])
    public editData ($event): void {
        if (!this.data) {
            return;
        }

        $event.preventDefault();

        this._modalService
            .openModal({
                data: Object.assign({}, this.data),
                fields: this._fields.map(a => Object.assign({}, a)),
                preventDelete: true,
                source: this._uuid
            });
    }

    private updateData (data): void {
        this._af.database
            .object(this.path)
            .update(data);
    }
}
