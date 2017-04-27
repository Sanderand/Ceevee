import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'cv-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
    public user: Observable<any>;

    constructor (
        private _authService: AuthService
    ) {}

    public ngOnInit (): void {
        this.user = this._authService.user$;
    }
}
