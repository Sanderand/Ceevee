import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
    public user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor (
        private _af: AngularFire
    ) {
        this._af.auth
            .subscribe(user => {
                this.user$.next(user);
            });
    }

    public login (): void {
        this._af.auth.login();
    }

    public logout (): void {
        this._af.auth.logout();
    }
}
