import { HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Field } from '../../shared/models/field.model';
import { ModalService } from '../../modal/modal.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { generateUUID } from '../../shared/helpers/math.helpers';

export class FBObject implements OnInit, OnChanges, OnDestroy {
	@Input() public section: any;
	@Input() public path: string;
	public isEmpty: boolean = true;

	protected _fields: Array<Field> = [];
	protected _destroyed$: Subject<any> = new Subject<any>();
	private _uuid = generateUUID();

	constructor (
		private _db: AngularFireDatabase,
		private _modalService: ModalService
	) {}

	public ngOnInit (): void {
		this._modalService.close$
			.takeUntil(this._destroyed$)
			.filter(res => !!res && res.source === this._uuid)
			.subscribe(res => this.onModalClosed(res.data));
	}

	public ngOnDestroy (): void {
		this._destroyed$.next();
	}

	public ngOnChanges (changes: SimpleChanges): void {
		const { section } = changes;

		if (section && section.currentValue && section.currentValue.data) {
			this.setIsEmpty();
		}
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

	private setIsEmpty (): void {
		this.isEmpty = Object
			.keys(this.section.data)
			.every(key => {
				const value = this.section.data[key];
				return !(value && value.length);
			});
	}

	private onModalClosed (newData): void {
		if (newData) {
			this._db.object(`${ this.path }/data`).update(newData);
		} else {
			this._db.object(`${ this.path }`).remove();
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
