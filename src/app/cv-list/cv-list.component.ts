import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { CVService } from '../cv/cv.service';

@Component({
    selector: 'cv-list',
    templateUrl: 'cv-list.component.html',
    styleUrls: ['cv-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CVListComponent implements OnInit {
    public cvs: FirebaseListObservable<any>;

    constructor (
        private _cvService: CVService
    ) { }

    public ngOnInit (): void {
        this._cvService
            .getCVList()
            .subscribe(cvs => {
                this.cvs = cvs;
                this.cvs.subscribe(c => console.log(c));
            });
    }
}
