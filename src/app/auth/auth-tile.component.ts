import { Component, OnInit, ViewEncapsulation, HostBinding, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const PHOTO_PLACEHOLDER_URL = 'assets/photo-placeholder.png';
const HOME_ROUTE = '/';

@Component({
    selector: 'cv-auth-tile',
    templateUrl: 'auth-tile.component.html',
    styleUrls: ['auth-tile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AuthTileComponent implements OnInit {
    @HostBinding('class.auth-tile') true;

    public photoUrl: string = PHOTO_PLACEHOLDER_URL;
    public dropdownOpen: boolean = false;
    public user: Observable<any>;

    constructor (
        private _authService: AuthService,
        private _router: Router
    ) {}

    public ngOnInit (): void {
        this.user = this._authService.user$;

        this.user
            .filter(user => !!user)
            .map(user => user.google.photoUrl)
            .subscribe(photoUrl => {
                // todo: fix 403 thing with actual photoUrl;
                this.photoUrl = PHOTO_PLACEHOLDER_URL;
            });
    }

    public login() {
        this._authService.login();
    }

    public logout() {
        this._router.navigate([HOME_ROUTE])
            .then(res => this._authService.logout());
    }

    @HostListener('body:click', ['$event'])
    public onClick ($event): void {
        const { trigger } = $event.target.dataset;

        if (this.dropdownOpen || !this.dropdownOpen && trigger) {
            this.dropdownOpen = !this.dropdownOpen;
        }
    }
}
