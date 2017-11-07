import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

import { PHOTO_PLACEHOLDER_URL } from '../shared/constants/constants';

@Injectable()
export class AuthService {
	public user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor (
		private _auth: AngularFireAuth,
		private _db: AngularFireDatabase,
		private _router: Router
	) {
		this._auth.authState
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
		this._auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then(() => this.user$
				.filter(Boolean)
				.first()
				.subscribe(user => {
					const redirectRoute = user._updated ? '/' : '/me';
					this._router.navigate([redirectRoute]);
				}));
	}

	public logout (): void {
		this._auth.auth.signOut();
	}

	private onLoggedOut = (): void => {
		this._router.navigate(['/']);
		this.isLoggedIn$.next(false);
		this.user$.next(null);
	}

	private onLoggedIn = (user): void => {
		this.isLoggedIn$.next(true);
		this._db.object(`/users/${ user.uid }`).valueChanges()
			.first()
			.subscribe((userData: any) => {
				if (userData) {
					this.user$.next({
						uid: user.uid,
						photo: userData.photo || PHOTO_PLACEHOLDER_URL,
						name: userData.name || user.displayName.split(' ')[0],
						_updated: userData._updated
					});
				} else {
					this.user$.next({
						uid: user.uid,
						photo: PHOTO_PLACEHOLDER_URL,
						name: user.displayName.split(' ')[0]
					});
				}
			});
	}
}
