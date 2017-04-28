import { Component, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
    selector: 'cv-auth-tile',
    templateUrl: 'auth-tile.component.html',
    styleUrls: ['auth-tile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AuthTileComponent implements OnInit {
    @HostBinding('class.auth-tile') true;

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
