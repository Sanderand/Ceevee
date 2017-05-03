import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
    selector: 'cv-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileEditComponent implements OnInit {
  public user: any;
  private _fileInput: HTMLInputElement = document.createElement('input');

  constructor (
    private _authService: AuthService,
    private _af: AngularFire,
    private _router: Router
  ) {}

  public ngOnInit (): void {
    this._authService.user$
      .subscribe(user => {
        this.user = Object.assign({}, user);
      });

    this._fileInput.type = 'file';
    this._fileInput.addEventListener('change', () => {
      this.uploadFile();
    });
  }

  public chooseNewPhoto (): void {
    this._fileInput.click();
  }

  public submitChanges ($event): void {
    $event.preventDefault();

    if (this.user.name && this.user.name.length > 1) {
      this._af.database.object(`/users/${ this.user.uid }`).update({
        photo: this.user.photo,
        name: this.user.name
      }).then(() => {
        this._router.navigate(['/']);
      });
    }
  }

  private uploadFile(): void {
    let file = this._fileInput.files[0];
    let reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      let img = new Image();
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');

      img.addEventListener('load', () => {
          canvas.width = 200 * 4;
          canvas.height = 200 * 4;

          if (img.width > img.height) {
            let scale = img.height / canvas.height;
            let offsetX = ((img.width / scale) - canvas.width) / -2;
            context.drawImage(img, offsetX, 0, img.width / scale, canvas.height);
          } else {
            let scale = img.width / canvas.width;
            let offsetY = ((img.height / scale) - canvas.height) / -2;
            context.drawImage(img, 0, offsetY, canvas.width, img.height / scale);
          }

          // bi-linear interpolation: step 1 - resize to 50%
          let  oc = document.createElement('canvas');
          let octx = oc.getContext('2d');

          oc.width = canvas.width * 0.5;
          oc.height = canvas.height * 0.5;
          octx.drawImage(canvas, 0, 0, oc.width, oc.height);

          // bi-linear interpolation: step 2 - resize 50% of step 1
          octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

          // bi-linear interpolation: step 3, resize to final size
          context.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5, 0, 0, canvas.width, canvas.height);

          this.user.photo = canvas.toDataURL('image/jpeg');
      });

      img.src = event.target.result;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }
}
