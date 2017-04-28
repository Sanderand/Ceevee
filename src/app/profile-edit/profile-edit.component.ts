import { Component, ViewEncapsulation, HostBinding } from '@angular/core';

@Component({
    selector: 'cv-profile-edit',
    templateUrl: 'profile-edit.component.html',
    styleUrls: ['profile-edit.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileEditComponent {
    @HostBinding('class.profile-edit') true;
}
