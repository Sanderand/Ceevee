import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
    selector: 'cv-auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
    constructor (
        public af: AngularFire
    ) {}

    public ngOnInit (): void {
        this.af.auth
            .subscribe(res => {
                console.log(res);
            });
    }

    public login() {
        this.af.auth.login();
    }

    public logout() {
        this.af.auth.logout();
    }
}