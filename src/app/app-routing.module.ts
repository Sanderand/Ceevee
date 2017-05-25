import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { CVComponent } from './cv/cv.component';
import { HomeComponent } from './home/home.component';
import { ModalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

const appRoutes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: HomeComponent
}, {
    canActivate: [AuthGuard],
    path: 'me',
    component: ProfileEditComponent
}, {
    canActivate: [AuthGuard],
    path: 'cv/:id',
    component: CVComponent
}, {
    outlet: 'modal',
    path: 'data',
    component: ModalComponent
}, {
    path: '**',
    component: NotFoundComponent
}];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard
    ]
})
export class AppRoutingModule {}
