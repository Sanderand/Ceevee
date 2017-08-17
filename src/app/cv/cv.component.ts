import * as firebase from 'firebase';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, HostBinding, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FONT_SIZE_CHANGE_STEP, MAX_FONT_SIZE, MIN_FONT_SIZE } from '../shared/constants/constants';

import { AuthService } from '../auth/auth.service';
import { CVService } from './cv.service';
import { DropdownComponent } from '../shared/components/dropdown/dropdown.component';
import { ModalService } from '../modal/modal.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { generateUUID } from '../shared/helpers/math.helpers';
import { restrictRange } from '../shared/helpers/math.helpers';
import { SectionTypes } from './section-types.config';

import 'rxjs/add/Operator/map';

@Component({
	selector: 'app-cv',
	templateUrl: './cv.component.html',
	styleUrls: ['./cv.component.scss', './andre.theme.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CVComponent implements OnInit, OnDestroy {
	@HostBinding('class.cv') true;
	public themeClass: string = '';
	public fontSize: number = 1;
	public fontFamily: string = null;

	@ViewChild('dropdown') public dropdown: DropdownComponent;

	public MIN_FONT_SIZE = MIN_FONT_SIZE;
	public MAX_FONT_SIZE = MAX_FONT_SIZE;
	public types = SectionTypes;
	public newSection: any;

	public cid: string;
	public uid: string;

	public cv$: Observable<any>;
	public sections$: Observable<any>;
	public basePath$: Observable<string>;

	private _destroyed$: Subject<any> = new Subject<any>();
	private _theme: Observable<any>;
	private _uuid = generateUUID();

	constructor (
		private _authService: AuthService,
		private _cvService: CVService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _modalService: ModalService
	) { }

	public ngOnInit (): void {
		this.cid = this._route.snapshot.params['id'];

		this.cv$ = this._cvService.getCv(this.cid);
		this.sections$ = this._cvService.getCvSections(this.cid);

		this.basePath$ = this._authService.user$
			.filter(Boolean)
			.map(user => `sections/${ user.uid }/${ this.cid }/`);

		this._modalService.close$
			.takeUntil(this._destroyed$)
			.filter(res => !!res && res.source === this._uuid)
			.subscribe(this.onCvRenameModalClose);

		this.resetForm();
	}

	public ngOnDestroy (): void {
		this._destroyed$.next();
	}

	public submitChanges (event$): void {
		event$.preventDefault();

		if (!this.newSection.type) {
			return;
		}

		this._cvService.addCvSection(this.cid, {
			data: {},
			meta: {
				type: this.newSection.type,
				_created: firebase.database.ServerValue.TIMESTAMP
			}
		});

		this.resetForm();
	}

	private resetForm(): void {
		this.newSection = {
			title: null,
			type: null
		};
	}

	public removeCV ($event): void {
		this._router
			.navigate(['/'])
			.then(() => this._cvService.removeCV(this.cid));
	}

	public duplicateCV ($event): void {
		this._router
			.navigate(['/'])
			.then(() => this._cvService.duplicateCV(this.cid));
	}

	public decreaseFontSize (): void {
		this.fontSize = restrictRange(this.fontSize - FONT_SIZE_CHANGE_STEP, MIN_FONT_SIZE, MAX_FONT_SIZE);
		this._cvService.updateCVFontSize(this.cid, this.fontSize);
	}

	public increaseFontSize (): void {
		this.fontSize = restrictRange(this.fontSize + FONT_SIZE_CHANGE_STEP, MIN_FONT_SIZE, MAX_FONT_SIZE);
		this._cvService.updateCVFontSize(this.cid, this.fontSize);
	}

	public changeFontFamily ($event): void {
		this.fontFamily = $event.target.value || null;
		this._cvService.updateCVFontFamily(this.cid, this.fontFamily);
	}

	public openDropdown ($event): void {
		$event.stopPropagation();
		this.dropdown.open = true;
	}

	public openPrintDialog ($event: Event): void {
		$event.stopPropagation();
		this.dropdown.open = false;

		setTimeout(() => {
			window.print();
		});
	}

	public renameCV ($event): void {
		$event.stopPropagation();
		this.dropdown.open = false;

		this.cv$
			.filter(Boolean)
			.first()
			.subscribe(this.openCvRenameModal);
	}

	private openCvRenameModal = (cv): void => {
		this._modalService
			.openModal({
				data: {
					title: cv.title,
					description: cv.description
				},
				fields: [{
					key: 'title',
					label: 'Title',
					type: 'text',
					placeholder: 'Title'
				}, {
					key: 'description',
					label: 'Description',
					type: 'textarea',
					placeholder: 'Description'
				}],
				source: this._uuid
			});
	}

	private onCvRenameModalClose = (res): void => {
		if (!(res.data && res.data.title && res.data.title.length)) {
			return;
		}

		this._cvService.renameCv(this.cid, {
			title: res.data.title,
			description: res.data.description
		});
	}
}
