import { OnInit, Input } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../../modal/modal.service';
import { Field } from '../models/field.model';
import { generateUUID } from '../helpers/math.helpers';
import { Subscription } from 'rxjs';

export class FBList implements OnInit {
    @Input() public path: string = null;

    public items: any = null;
    public title: string = null;

    protected _fields: Array<Field> = [];
    protected _key: string = null;
    private _uuid: string = generateUUID();
    private keyInModal: string = null;
    private _titleSubscription: Subscription;
    private _itemsSubscription: Subscription;

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
            if (this._titleSubscription) {
                this._titleSubscription.unsubscribe();
            }

            if (this._itemsSubscription) {
                this._itemsSubscription.unsubscribe();
            }

            this._titleSubscription = this._af.database
                .object(`${this.path}/${this._key}/title`)
                .subscribe(title => this.title = title);

            this._itemsSubscription = this._af.database
                .list(`${this.path}/${this._key}/items`)
                .subscribe(items => this.items = items);
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

        this.keyInModal = item ? item.$key : null;
    }

    private updateData (data): void {
        if (data) {
            if (this.keyInModal) {
                this._af.database
                    .list(`${this.path}/${this._key}/items`)
                    .update(this.keyInModal, data);
            } else {
                this._af.database
                    .list(`${this.path}/${this._key}/items`)
                    .push(data);
            }
        } else {
            this._af.database
                .list(`${this.path}/${this._key}/items`)
                .remove(this.keyInModal);
        }

        this.keyInModal = null;
    }
}
