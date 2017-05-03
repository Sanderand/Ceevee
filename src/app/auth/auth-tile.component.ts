import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'
import { PHOTO_PLACEHOLDER_URL } from '../shared/constants/constants';
import { DropdownComponent } from '../shared/components/dropdown/dropdown.component';

@Component({
    selector: 'cv-auth-tile',
    templateUrl: './auth-tile.component.html',
    styleUrls: ['./auth-tile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AuthTileComponent implements OnInit {
    @ViewChild('dropdown') public dropdown: DropdownComponent;

    public PHOTO_PLACEHOLDER_URL = PHOTO_PLACEHOLDER_URL;
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

    public openDropdown ($event): void {
        $event.stopPropagation();
        this.dropdown.open = true;
    }
}
