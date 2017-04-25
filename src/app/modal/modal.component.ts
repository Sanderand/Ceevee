import { Component, Output, OnInit, ViewEncapsulation, SimpleChanges, ElementRef, HostListener, EventEmitter } from '@angular/core';

import { ModalService } from '../services/modal.service';

@Component({
    selector: 'cv-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
    public fields: any = null;
    public data: any = null;
    public isAdding: boolean = false;
    public isOpen: boolean = false;
    public preventDelete: boolean = false;
    public source: string = '';

    constructor (
        private _modalService: ModalService
    ) {}

    public ngOnInit (): void {
        this._modalService.open$
            .filter(options => !!options)
            .subscribe(options => {
                this.isAdding = !options.data;
                this.fields = options.fields;
                this.preventDelete = options.preventDelete;
                this.data = options.data || {};
                this.source = options.source;
                this.isOpen = true;
            });
    }

    public closeModal (): void {
        this.isOpen = false;
        this._modalService.closeModal({
            data: this.data,
            source: this.source
        });
    }

    public submitModal ($event): void {
        $event.preventDefault();
        this.closeModal();
    }

    public cancelModal (): void {
        if (this.isAdding) {
            this.removeItem();
        } else {
            this.closeModal();
        }
    }

    public removeItem (): void {
        this.data = null;
        this.closeModal();
    }

    public onBackdropClick ($event): void {
        if ($event.target.classList.contains('modal-wrapper')) {
            this.cancelModal();
        }
    }

    @HostListener('window:keydown.escape') public onEscapeKey (): void {
        this.cancelModal();
    }
}
