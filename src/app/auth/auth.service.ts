import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { BehaviorSubject } from 'rxjs';

const REDIRECT_AUTH_ROUTE = '/me';
const REDIRECT_UN_AUTH_ROUTE = '/';

@Injectable()
export class AuthService {
    public user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private _previousUser: any = null;

    constructor (
        private _af: AngularFire,
        private _router: Router
    ) {
        this._af.auth
            .subscribe(user => {
                if (!this._previousUser && user) {
                    this.redirectAfterAuth();
                } else if (this._previousUser && !user) {
                    this.redirectAfterUnAuth();
                }

                this.user$.next(user);
            });
    }

    public login (): void {
        this._af.auth.login();
    }

    public logout (): void {
        this._af.auth.logout();
    }

    private redirectAfterAuth (): void {
        this._router.navigate([REDIRECT_AUTH_ROUTE]);
    }

    private redirectAfterUnAuth (): void {
        this._router.navigate([REDIRECT_UN_AUTH_ROUTE]);
    }
}
