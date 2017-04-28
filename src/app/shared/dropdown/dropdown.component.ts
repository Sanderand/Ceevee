import { Component, ViewEncapsulation, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'cv-dropdown',
    template: '<ng-content></ng-content>',
    styleUrls: ['dropdown.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DropdownComponent {
    @HostBinding('class.dropdown') true;

    @HostBinding('class.open')
    @Input() public open: boolean = false;
}
