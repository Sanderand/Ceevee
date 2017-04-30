import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CVComponent } from './cv/cv.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ModalComponent } from './modal/modal.component';

const appRoutes: Routes = [{
    // todo: redirect if authenticated
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
}, {
    path: 'home',
    component: HomeComponent
}, {
    // todo: routeGuard
    path: 'me',
    component: DashboardComponent
}, {
    // todo: routeGuard
    path: 'me/edit',
    component: ProfileEditComponent
}, {
    // todo: routeGuard
    path: 'me/:id',
    component: CVComponent
}, {
    // todo: routeGuard
    path: 'data',
    component: ModalComponent,
    outlet: 'modal'
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
    ]
})
export class AppRoutingModule {}
