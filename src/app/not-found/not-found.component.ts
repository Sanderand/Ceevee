import { Component, ViewEncapsulation, HostBinding } from '@angular/core';

@Component({
    selector: 'cv-not-found',
    templateUrl: 'not-found.component.html',
    styleUrls: ['not-found.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NotFoundComponent {
    @HostBinding('class.not-found') true;
}
