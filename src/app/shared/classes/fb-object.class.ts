import { OnInit, Input, HostListener, OnChanges } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { ModalService } from '../../modal/modal.service';
import { Field } from '../models/field.model';
import { generateUUID } from '../helpers/math.helpers';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

export class FBObject implements OnInit {
    @Input() public section: any;
    @Input() public path: string;

    private _uuid = generateUUID();
    protected _fields: Array<Field> = [];

    constructor (
      private _af: AngularFire,
      private _modalService: ModalService
    ) {}

    public ngOnInit (): void {
        this._modalService.close$
            .filter(res => !!res && res.source === this._uuid)
            .subscribe(res => this.updateData(res.data));
    }

    @HostListener('click', ['$event'])
    public editData ($event): void {
        $event.preventDefault();

        this._modalService
            .openModal({
                data: this.getDataClone(),
                fields: this._fields.map(a => Object.assign({}, a)),
                source: this._uuid
          });
    }

    private updateData (newData): void {
      if (newData) {
        this._af.database.object(`${ this.path }/data`).update(newData);
      } else {
        this._af.database.object(`${ this.path }`).remove();
      }
    }

    private getDataClone (): any {
        let clone = {};

        Object.keys(this.section.data || {})
            .filter(key => key[0] !== '$')
            .forEach(key => clone[key] = this.section.data[key]);

        return clone;
    }
}
