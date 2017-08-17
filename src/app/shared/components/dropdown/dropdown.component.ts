import {
	Component,
	ElementRef,
	HostBinding,
	HostListener,
	Input,
	OnChanges,
	OnDestroy,
	SimpleChanges,
	ViewEncapsulation,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/Observable/fromEvent';

@Component({
	selector: 'app-dropdown',
	template: '<ng-content></ng-content>',
	styleUrls: ['./dropdown.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnChanges, OnDestroy {
	@HostBinding('class.open')

	@Input() public open: boolean = false;
	@Input() public remainOnInnerClick: boolean = false;
	@Input() public closeOnScroll: boolean = false;

	private _destroyed$: Subject<any> = new Subject<any>();

	constructor (
		private _elementRef: ElementRef
	) {}

	public ngOnChanges (changes: SimpleChanges): void {
		const { closeOnScroll } = changes;

		if (closeOnScroll && closeOnScroll.currentValue && closeOnScroll.isFirstChange()) {
			this.addScrollListener();
		}
	}

	public ngOnDestroy (): void {
		this._destroyed$.next();
	}

	@HostListener('body:click', ['$event'])
	public onClick ($event): void {
		if (this.remainOnInnerClick && this._elementRef.nativeElement.contains($event.target)) {
			return;
		}

		this.close();
	}

	private addScrollListener (): void {
		const scrollableSiteWrapper = document.getElementsByTagName('main'); // todo selector

		Observable
			.fromEvent(scrollableSiteWrapper, 'scroll')
			.takeUntil(this._destroyed$)
			.subscribe(e => this.close());
	}

	private close (): void {
		if (this.open) {
			this.open = false;
		}
	}
}
