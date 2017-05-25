import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {}

    canActivate() {
        if (this._authService.isLoggedIn$.getValue()) {
            return true;
        }

        this._router.navigate(['/']);
        return false;
    }
}
