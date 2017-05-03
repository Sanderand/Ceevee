import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'cv-list',
    templateUrl: './cv-list.component.html',
    styleUrls: ['./cv-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CVListComponent {
    @Input() public cvs: Array<any>;

    constructor (
        private _router: Router
    ) {}

    public navigateToCV (id): void {
        this._router
            .navigate([{ outlets: { modal: null }}])
            .then(() => this._router.navigate([`/cv/${ id }`]));
    }
}
