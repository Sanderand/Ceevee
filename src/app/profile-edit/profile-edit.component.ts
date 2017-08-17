import * as firebase from 'firebase';

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'app-profile-edit',
	templateUrl: './profile-edit.component.html',
	styleUrls: ['./profile-edit.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ProfileEditComponent implements OnInit, OnDestroy {
	public user: any;
	public newPhoto: any;

	private _fileInput: HTMLInputElement = document.createElement('input');
	private _destroyed$: Subject<any> = new Subject<any>();

	constructor (
		private _authService: AuthService,
		private _db: AngularFireDatabase
	) {}

	public ngOnInit (): void {
		this._authService.user$
			.takeUntil(this._destroyed$)
			.subscribe(user => this.user = Object.assign({}, user));

		this._fileInput.type = 'file';
		this._fileInput.addEventListener('change', () => this.uploadFile());
	}

	public ngOnDestroy (): void {
		this._destroyed$.next();
	}

	public changePhoto (): void {
		this._fileInput.click();
	}

	public changeName ($event): void {
		const newName = $event.target.value;

		if (!newName || !newName.length) {
			// todo validation
			return;
		}

		this._db.object(`/users/${ this.user.uid }`).update({
			name: newName,
			_updated: firebase.database.ServerValue.TIMESTAMP
		}).then(() => {
			// todo notification
		});
	}

	public onSubmit ($event): void {
		$event.preventDefault();
		$event.target.blur();
	}

	private uploadFile(): void {
		const file = this._fileInput.files[0];
		const reader = new FileReader();

		reader.addEventListener('load', (event: any) => {
			const img = new Image();
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');

			img.addEventListener('load', () => {
				canvas.width = 200 * 4;
				canvas.height = 200 * 4;

				if (img.width > img.height) {
					const scale = img.height / canvas.height;
					const offsetX = ((img.width / scale) - canvas.width) / -2;
					context.drawImage(img, offsetX, 0, img.width / scale, canvas.height);
				} else {
					const scale = img.width / canvas.width;
					const offsetY = ((img.height / scale) - canvas.height) / -2;
					context.drawImage(img, 0, offsetY, canvas.width, img.height / scale);
				}

				// bi-linear interpolation: step 1 - resize to 50%
				const oc = document.createElement('canvas');
				const octx = oc.getContext('2d');

				oc.width = canvas.width * 0.5;
				oc.height = canvas.height * 0.5;
				octx.drawImage(canvas, 0, 0, oc.width, oc.height);

				// bi-linear interpolation: step 2 - resize 50% of step 1
				octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

				// bi-linear interpolation: step 3, resize to final size
				context.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5, 0, 0, canvas.width, canvas.height);

				this.saveNewPhoto(canvas.toDataURL('image/jpeg'));
			});

			img.src = event.target.result;
		}, false);

		if (file) {
			reader.readAsDataURL(file);
		}
	}

	private saveNewPhoto (dataUrl): void {
		this.newPhoto = dataUrl;

		this._db.object(`/users/${ this.user.uid }`).update({
			photo: dataUrl,
			_updated: firebase.database.ServerValue.TIMESTAMP
		}).then(() => {
			// todo notification
		});
	}
}
