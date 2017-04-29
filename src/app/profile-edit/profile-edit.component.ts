import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'cv-profile-edit',
    templateUrl: 'profile-edit.component.html',
    styleUrls: ['profile-edit.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileEditComponent implements OnInit {
  public user: Observable<any>;

  constructor (
    private _authService: AuthService
  ) { }

  public ngOnInit (): void {
    this.user = this._authService.user$;
  }
}
