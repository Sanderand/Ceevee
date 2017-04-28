import { Component, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

const DASHBOARD_ROUTE = '/me';

@Component({
    selector: 'cv-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
    @HostBinding('class.dashboard') true;

    constructor (
        private _authService: AuthService,
        private _router: Router
    ) {}

    public ngOnInit (): void {
        this._authService.user$
            .filter(user => !!user)
            .subscribe(user => {
                this._router.navigate([DASHBOARD_ROUTE]);
            });
    }
}
