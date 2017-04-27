import { OnInit, Input, HostListener, OnChanges } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../modal/modal.service';
import { Field } from '../models/field.model';
import { generateUUID } from '../helpers/math.helpers';
import { Subscription } from 'rxjs';

export class FBObject implements OnInit, OnChanges {
    @Input() public path: string = null;

    public data: any = null;
    protected _fields: Array<Field> = [];
    protected _key: string = null;
    private _uuid: string = generateUUID();
    private _subscription: Subscription;

    constructor (
        private _af: AngularFire,
        private _modalService: ModalService
    ) {}

    public ngOnInit (): void {
        this.refreshData();

        this._modalService.close$
            .filter(res => !!res && res.source === this._uuid)
            .subscribe(res => this.updateData(res.data));
    }

    public ngOnChanges (): void {
        this.refreshData();
    }

    private refreshData (): void {
        if (this.path) {
            if (this._subscription) {
                this._subscription.unsubscribe();
            }

            this._subscription = this._af.database
                .object(`${ this.path }/${ this._key }`)
                .subscribe(data => this.data = data);
        }
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
            .object(`${ this.path }/${ this._key }`)
            .update(data);
    }
}
