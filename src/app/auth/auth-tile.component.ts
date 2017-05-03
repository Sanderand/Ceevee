import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const PHOTO_PLACEHOLDER_URL = 'https://firebasestorage.googleapis.com/v0/b/ceevee-9a7a5.appspot.com/o/photo-placeholder.png?alt=media&token=69213439-53f7-4b70-9544-f484bbce9bba';

@Component({
    selector: 'cv-auth-tile',
    templateUrl: 'auth-tile.component.html',
    styleUrls: ['auth-tile.component.scss'],
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
