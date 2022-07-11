import { CalendarModalComponent } from './calendar-modal/calendar-modal.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TrailComponent } from './trail-page/trail/trail.component';
import { CreateAccComponent } from './auth/create-acc/create-acc.component';
import { ProfileComponent } from './profile-page/profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagingComponent } from './messaging-page/messaging/messaging.component';
import { AuthGuard } from './auth.guard';
import { LandingComponent } from './auth/landing/landing.component';

// Routes paths to componenets in Router Outlet
const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    // profile/:user
    path: 'profile/:username',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: CreateAccComponent
  },  
  {
    path: 'trailpage',
    component: TrailComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'flag/:id',
      component: CalendarModalComponent,
    canActivate: [AuthGuard]},
  ]
  },
  {
    //messaging/:userid
    path: 'messaging/:id',
    component: MessagingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,

  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
