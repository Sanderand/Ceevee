import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { CVService } from '../../../cv/cv.service';

@Component({
    selector: 'cv-select',
    templateUrl: './cv-select.component.html',
    styleUrls: ['./cv-select.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CVSelectComponent implements OnInit {
    public cvs: FirebaseListObservable<any>;
    public activeCV: any;

    constructor (
        private _cvService: CVService
    ) { }

    public ngOnInit (): void {
        this._cvService
            .getCVList()
            .subscribe(cvs => {
                this.cvs = cvs;
            });

        this._cvService.cv$
            .filter(Boolean)
            .subscribe(cv => {
                this.activeCV = cv.$key;
                console.info(cv);
            });
    }

    public loadCV (): void {
        this._cvService.loadCV(this.activeCV);
    }
}
