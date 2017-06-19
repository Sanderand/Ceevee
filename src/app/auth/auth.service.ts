import { AngularFire } from 'angularfire2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PHOTO_PLACEHOLDER_URL } from '../shared/constants/constants';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
	public user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor (
		private _af: AngularFire,
		private _router: Router
	) {
		this._af.auth
			.distinctUntilChanged()
			.subscribe(user => {
				if (this.user$.getValue() && !user) {
					this.onLoggedOut();
				} else if (user) {
					this.onLoggedIn(user);
				}
			});
	}

	public login (): void {
		this._af.auth.login()
			.then(() => this.user$
				.filter(Boolean)
				.first()
				.subscribe(user => {
					const redirectRoute = user._updated ? '/' : '/me';
					this._router.navigate([redirectRoute]);
				}));
	}

	public logout (): void {
		this._af.auth.logout();
	}

	private onLoggedOut = (): void => {
		this._router.navigate(['/']);
		this.isLoggedIn$.next(false);
		this.user$.next(null);
	}

	private onLoggedIn = (user): void => {
		this.isLoggedIn$.next(true);
		this._af.database.object(`/users/${ user.uid }`)
			.first()
			.subscribe(userData => this.user$.next({
				uid: user.uid,
				photo: userData.photo || PHOTO_PLACEHOLDER_URL,
				name: userData.name || user.google.displayName.split(' ')[0],
				_updated: userData._updated
			}));
	}
}
