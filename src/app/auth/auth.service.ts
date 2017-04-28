import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const HOME_ROUTE = '/';

@Injectable()
export class AuthService {
    public user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor (
        private _af: AngularFire,
        private _router: Router
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
        debugger;
        this._router.navigate([HOME_ROUTE]).then(a => console.log(a));
        console.warn('todo navigate back. make this work ^^^');
    }
}
