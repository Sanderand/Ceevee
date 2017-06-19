import { Component, HostBinding, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { ModalService } from './modal.service';
import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'cv-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
	@HostBinding('class.is-open') public isOpen: boolean = false;

	public fields: any = null;
	public data: any = null;
	public isAdding: boolean = false;
	public preventDelete: boolean = false;
	public source: string = '';

	private _destroyed$: Subject<any> = new Subject<any>();

	constructor (
		private _modalService: ModalService
	) {}

	public ngOnInit (): void {
		this._modalService.open$
			.takeUntil(this._destroyed$)
			.filter(Boolean)
			.subscribe(options => {
				this.isAdding = !options.data;
				this.fields = options.fields;
				this.preventDelete = options.preventDelete;
				this.data = options.data || {};
				this.source = options.source;
				this.isOpen = true;
			});
	}

	public ngOnDestroy (): void {
		this._destroyed$.next();
	}

	public closeModal (data): void {
		this.isOpen = false;
		this._modalService.closeModal({
			data: data,
			source: this.source
		});
	}

	public submitModal ($event): void {
		$event.preventDefault();
		this.closeModal(this.data);
	}

	public cancelModal (): void {
		if (this.isAdding) {
			this.removeItem();
		} else {
			this.closeModal(this.data);
		}
	}

	public removeItem (): void {
		this.closeModal(null);
	}

	@HostListener('click', ['$event'])
	public onBackdropClick ($event): void {
		if (!this.isOpen) {
			return;
		}

		if ($event.target.classList.contains('modal') || $event.target.classList.contains('modal-inner')) {
			this.cancelModal();
		}
	}

	@HostListener('window:keydown.escape')
	public onEscapeKey (): void {
		if (!this.isOpen) {
			return;
		}

		this.cancelModal();
	}
}
