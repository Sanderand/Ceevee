import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

const DASHBOARD_ROUTE = '/me';

@Component({
    selector: 'cv-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
    constructor (
        private _authService: AuthService,
        private _router: Router
    ) {}

    public login (): void {
        this._authService.login();
    }
}
