import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { PHOTO_PLACEHOLDER_URL } from '../shared/constants/constants';

@Injectable()
export class AuthService {
    public user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor (
        private _af: AngularFire,
        private _router: Router
    ) {
        this._af.auth
            .subscribe(user => {
                if (this.user$.getValue() && !user) {
                    this._router.navigate(['/']);
                    this.user$.next(null);
                } else if (user) {
                    this._af.database.object(`/users/${ user.uid }`).subscribe(userData => {
                        this.user$.next({
                            uid: user.uid,
                            photo: userData.photo || PHOTO_PLACEHOLDER_URL,
                            name: userData.name || user.google.displayName.split(' ')[0],
                            _updated: userData._updated
                        });
                    })
                }
            });
    }

    public login (): void {
        this._af.auth.login().then(() => {
            this.user$
              .filter(Boolean)
              .subscribe(user => {
                let redirectRoute = user._updated ? '/' : '/me';
                this._router.navigate([redirectRoute]);
            });
        });
    }

    public logout (): void {
        this._af.auth.logout();
    }

    public isLoggedIn (): Observable<boolean> {
        return this._af.auth.map(user => !!user);
    }
}
