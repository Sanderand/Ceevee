import { Component, OnInit, ViewEncapsulation, Input, HostBinding, HostListener } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ModalService } from '../services/modal.service';
import { DividerFields } from '../models/divider.model';
import { generateUUID } from '../helpers/math.helpers';

@Component({
    selector: 'cv-divider',
    templateUrl: 'divider.component.html',
    styleUrls: ['divider.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DividerComponent implements OnInit {
    @Input() public data: any = null;
    @Input() public path: string = null;
    @HostBinding('class.divider') true;

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
                fields: DividerFields.map(a => Object.assign({}, a)),
                source: this._uuid
            });
    }

    private updateData (data): void {
        if (data) {
            this._af.database
                .object(this.path)
                .update(data);
        } else {
            this._af.database
                .object(this.path)
                .remove();
        }
    }
}
