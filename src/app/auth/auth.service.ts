import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

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
                }

                user = this.reformatUser(user);
                this.user$.next(user);
                console.log('user', user);
            });
    }

    public login (): void {
        this._af.auth.login();
    }

    public logout (): void {
        this._af.auth.logout();
    }

    public isLoggedIn (): Observable<boolean> {
        return this._af.auth.map(user => !!user);
    }

    private reformatUser (user: any): any {
        if (!user) {
            return null;
        }

        return {
            uid: user.uid,
            fullName: user.google.displayName,
            firstName: user.google.displayName.split(' ')[0],
            photoUrl: user.google.photoUrl
        };
    }
}
