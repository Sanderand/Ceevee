import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-list',
	templateUrl: './cv-list.component.html',
	styleUrls: ['./cv-list.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CVListComponent {
	@Input() public cvs: Array<any>;
}
