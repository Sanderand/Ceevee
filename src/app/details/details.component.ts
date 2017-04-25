import { Component, OnInit, ViewEncapsulation, Input, HostBinding, HostListener } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../services/modal.service';
import { DetailsFields } from '../models/details.model';
import { generateUUID } from '../helpers/math.helpers';

@Component({
    selector: 'cv-details',
    templateUrl: 'details.component.html',
    styleUrls: ['details.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit {
    @Input() public data: any = null;
    @Input() public path: string = null;
    @HostBinding('class.details') true;

    private _uuid: string = generateUUID();

    constructor (
        private _af: AngularFire,
        private _modalService: ModalService
    ) {}

    public ngOnInit (): void {
        this._modalService.close$
            .filter(res => !!res && res.source === this._uuid)
            .subscribe(res => {
                this.updateData(res.data);
            });
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
                fields: DetailsFields.map(a => Object.assign({}, a)),
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
