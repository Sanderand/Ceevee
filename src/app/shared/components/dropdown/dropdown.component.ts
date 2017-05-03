import { Component, ElementRef, HostBinding, HostListener, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'cv-dropdown',
    template: '<ng-content></ng-content>',
    styleUrls: ['./dropdown.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DropdownComponent {
    @HostBinding('class.open')
    @Input() public open: boolean = false;
    @Input() public remainOnInnerClick: boolean = false;

    constructor (
      private _elementRef: ElementRef
    ) {}

    @HostListener('body:click', ['$event'])
    public onClick ($event): void {
        if (this.remainOnInnerClick && this._elementRef.nativeElement.contains($event.target)) {
            return;
        }

        if (this.open) {
            this.open = false;
        }
    }
}
