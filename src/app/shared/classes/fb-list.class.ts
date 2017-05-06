import { Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { ModalService } from '../../modal/modal.service';
import { Field } from '../models/field.model';
import { generateUUID } from '../helpers/math.helpers';

export class FBList implements OnInit, OnChanges {
    @Input() public section: any;
    @Input() public path: string;

    public items: FirebaseListObservable<any>;
    public keyInModal: string = 'kokl';
    public uuid = generateUUID();
    protected _fields: Array<Field>;

    constructor (
        private _af: AngularFire,
        private _modalService: ModalService
    ) {}

    public ngOnInit (): void {
        this._modalService.close$
            .filter(res => !!res && res.source === this.uuid)
            .subscribe(res => this.updateData(res.data));
    }

    public ngOnChanges(changes: SimpleChanges): void {
      let { path } = changes;

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
                source: this.uuid
            });

      this.keyInModal = item ? item.$key : null;
    }

    public updateData (data): void {
        if (data) {
            if (this.keyInModal) {
                this.items.update(this.keyInModal, data);
            } else {
                this.items.push(data);
            }
        } else {
            this.items.remove(this.keyInModal);
        }

        this.keyInModal = null;
    }
}
