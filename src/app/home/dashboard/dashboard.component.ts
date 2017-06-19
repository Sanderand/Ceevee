import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { CVService } from '../../cv/cv.service';
import { FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

const CV_TITLE_MIN_LENGTH = 3;

@Component({
	selector: 'cv-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
	public newTitle: string = null;
	public error: string = null;
	public user$: Observable<any>;
	public cvs$: Observable<any>;

	constructor (
		private _authService: AuthService,
		private _cvService: CVService
	) {}

	public ngOnInit (): void {
		this.user$ = this._authService.user$;
		this.cvs$ = this._cvService.getCvs();
	}

	public onFormSubmit ($event: Event): void {
		$event.preventDefault();
		this.clearError();

		if (!this.newTitle || this.newTitle.length <= CV_TITLE_MIN_LENGTH) {
			this.error = `Please enter a longer title!`;
			return;
		}

		this._cvService.addCV(this.newTitle);
		this.newTitle = null;
	}

	public clearError (): void {
		this.error = null;
	}
}
