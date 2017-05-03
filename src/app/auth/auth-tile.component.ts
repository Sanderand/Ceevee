import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'
import { PHOTO_PLACEHOLDER_URL } from '../shared/constants/constants';

@Component({
    selector: 'cv-auth-tile',
    templateUrl: './auth-tile.component.html',
    styleUrls: ['./auth-tile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AuthTileComponent implements OnInit {
    public PHOTO_PLACEHOLDER_URL = PHOTO_PLACEHOLDER_URL;
    public dropdownOpen: boolean = false;
    public user: Observable<any>;

    constructor (
        private _authService: AuthService
    ) {}

    public ngOnInit (): void {
        this.user = this._authService.user$;
    }

    public logout (): void {
        this._authService.logout();
    }

    @HostListener('body:click', ['$event'])
    public onClick ($event): void {
        const { trigger } = $event.target.dataset;

        if (this.dropdownOpen || !this.dropdownOpen && trigger) {
            this.dropdownOpen = !this.dropdownOpen;
        }
    }
}
