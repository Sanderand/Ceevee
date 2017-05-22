import { Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { ModalService } from '../../modal/modal.service';
import { Field } from '../models/field.model';
import { generateUUID } from '../helpers/math.helpers';

export class FBList implements OnInit, OnChanges {
    @Input() public section: any;
    @Input() public path: string;

    public items: FirebaseListObservable<any>;
    protected _fields: Array<Field>;
    private _uuid = generateUUID();
    private _keyInModal: string;

    constructor (
        private _af: AngularFire,
        private _modalService: ModalService
    ) {}

    public ngOnInit (): void {
        this._modalService.close$
            .filter(res => !!res && res.source === this._uuid)
            .subscribe(res => this.updateData(res.data));
    }

    public ngOnChanges(changes: SimpleChanges): void {
        const { path } = changes;

        if (path && path.currentValue) {
            this.items = this._af.database.list(`${ this.path }/data`);
        }
    }

    public editData ($event, item): void {
        $event.preventDefault();

        this._modalService
            .openModal({
                data: item ? Object.assign({}, item) : null,
                fields: this._fields.map(a => Object.assign({}, a)),
                preventDelete: false,
                source: this._uuid
            });

      this._keyInModal = item ? item.$key : null;
    }

    public updateData (data): void {
        if (data) {
            if (this._keyInModal) {
                this.items.update(this._keyInModal, data);
            } else {
                this.items.push(data);
            }
        } else {
            if (this._keyInModal) {
                this.items.remove(this._keyInModal);
            } else {
                // NOTE: A new item got cancelled: do nothing
            }
        }

        this._keyInModal = null;
    }

    public removeSection ($event: Event): void {
        if (!this.path) {
            return;
        }

        this._af.database.object(this.path).remove();
    }

    public isEmptyItem (item): boolean {
        return Object
            .keys(item)
            .every(key => {
                const value = item[key];
                return !(value && value.length);
            });
    }
}
