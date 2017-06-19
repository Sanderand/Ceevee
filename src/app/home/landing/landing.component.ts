import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
	selector: 'cv-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class LandingComponent {
	constructor (
		private _authService: AuthService
	) {}

	public login (): void {
		this._authService.login();
	}
}
