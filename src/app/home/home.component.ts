import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { CVService } from '../cv/cv.service';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'cv-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
    public user: Observable<any>;

    constructor (
        private _authService: AuthService,
        private _cvService: CVService
    ) {}

    public ngOnInit (): void {
        this.user = this._authService.user$;

        this._cvService
            .getCVList()
            .subscribe(cvs => {
                console.log(cvs);
            });
    }
}
