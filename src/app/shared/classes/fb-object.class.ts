import { OnInit, Input, HostListener, OnChanges } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { ModalService } from '../../modal/modal.service';
import { Field } from '../models/field.model';
import { generateUUID } from '../helpers/math.helpers';
import { Subscription } from 'rxjs';

export class FBObject implements OnInit, OnChanges {
    @Input() public path: string = null;

    protected _fields: Array<Field> = [];
    protected _key: string = null;
    private _uuid: string = generateUUID();
    private data: FirebaseObjectObservable<any>;

    constructor (
        private _af: AngularFire,
        private _modalService: ModalService
    ) {}

    public ngOnInit (): void {
        this.refreshData();

        this._modalService.close$
            .filter(res => !!res && res.source === this._uuid)
            .map(res => res.data)
            .subscribe(data => this.updateData(data));
    }

    public ngOnChanges (): void {
        this.refreshData();
    }

    private refreshData (): void {
        if (this.path) {
            this.data = this._af.database
                .object(`${ this.path }/${ this._key }`);
        }
    }

    @HostListener('click', ['$event'])
    public editData ($event): void {
        $event.preventDefault();

        this.data
            .first()
            .subscribe(data => {
                this._modalService
                    .openModal({
                        data: Object.assign({}, data),
                        fields: this._fields.map(a => Object.assign({}, a)),
                        preventDelete: true,
                        source: this._uuid
                    });
            });

    }

    private updateData (data): void {
      this.data.update(data);
    }
}
