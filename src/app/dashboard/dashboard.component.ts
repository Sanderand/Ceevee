import { Component, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { CVService } from '../cv/cv.service';

const CV_TITLE_MIN_LENGTH = 3;

@Component({
    selector: 'cv-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
    @HostBinding('class.dashboard') true;

    public userName: string = null;
    public newTitle: string = null;
    public error: string = null;

    constructor (
        private _authService: AuthService,
        private _cvService: CVService
    ) {}

    public ngOnInit (): void {
        this._authService.user$
            .filter(user => !!user)
            .subscribe(user => {
                // todo get first name from users object
                this.userName = user.google.displayName.split(' ')[0];
            });
    }

    public onFormSubmit ($event: Event): void {
        $event.preventDefault();
        this.clearError();

        if (!this.newTitle || this.newTitle.length <= CV_TITLE_MIN_LENGTH) {
            this.error = `Please enter a longer title!`;
            return;
        }

        this._cvService.addCV(this.newTitle);
        this.newTitle = null;
    }

    public clearError (): void {
        this.error = null;
    }
}
