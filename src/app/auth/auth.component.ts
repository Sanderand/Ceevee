import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFire, AngularFireAuth } from 'angularfire2';

@Component({
    selector: 'cv-auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
    public auth: AngularFireAuth = null;

    constructor (
        private _af: AngularFire
    ) {}

    public ngOnInit (): void {
        this.auth = this._af.auth;
    }

    public login() {
        this._af.auth.login();
    }

    public logout() {
        this._af.auth.logout();
    }
}
