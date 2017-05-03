import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'cv-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
    public isLoggedIn$: Observable<boolean>;

    constructor (
        private _authService: AuthService
    ) {}

    public ngOnInit (): void {
        this.isLoggedIn$ = this._authService.isLoggedIn();
    }
}
