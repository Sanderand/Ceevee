import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
    selector: 'textarea'
})
export class TextAreaDirective implements AfterViewInit {
    constructor (
        private _elementRef: ElementRef
    ) {}

    public ngAfterViewInit (): void {
        const elem = this._elementRef.nativeElement;

        elem.addEventListener('change', this.resize);
        elem.addEventListener('cut', this.delayedResize);
        elem.addEventListener('paste', this.delayedResize);
        elem.addEventListener('drop', this.delayedResize);
        elem.addEventListener('keydown', this.delayedResize);

        elem.focus();
        elem.select();
        this.delayedResize();
    }

    private resize = () => {
        const elem = this._elementRef.nativeElement;
        elem.style.height = 'auto';
        elem.style.height = elem.scrollHeight + 'px';
    };

    private delayedResize = () => {
        setTimeout(this.resize, 0);
    };
}