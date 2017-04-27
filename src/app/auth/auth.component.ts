import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
    selector: 'cv-auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
    public user: Observable<any>;

    constructor (
        private _authService: AuthService
    ) {}

    public ngOnInit (): void {
        this.user = this._authService.user$;
    }

    public login() {
        this._authService.login();
    }

    public logout() {
        this._authService.logout();
    }
}
