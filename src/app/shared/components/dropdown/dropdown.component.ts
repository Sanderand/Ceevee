import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'cv-dropdown',
    template: '<ng-content></ng-content>',
    styleUrls: ['./dropdown.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnChanges {
    @HostBinding('class.open')
    @Input() public open: boolean = false;
    @Input() public remainOnInnerClick: boolean = false;
    @Input() public closeOnScroll: boolean = false;

    constructor (
      private _elementRef: ElementRef
    ) {}


    public ngOnChanges (changes: SimpleChanges): void {
        let { closeOnScroll } = changes;

        if (closeOnScroll && closeOnScroll.currentValue && closeOnScroll.isFirstChange()) {
            this.addScrollListener();
        }
    }

    @HostListener('body:click', ['$event'])
    public onClick ($event): void {
        if (this.remainOnInnerClick && this._elementRef.nativeElement.contains($event.target)) {
            return;
        }

        this.close();
    }

    private addScrollListener (): void {
        let main = document.getElementsByTagName('main');

        Observable
            .fromEvent(main, 'scroll')
            .subscribe(e => this.close());
    }

    private close (): void {
        if (this.open) {
            this.open = false;
        }
    }
}
