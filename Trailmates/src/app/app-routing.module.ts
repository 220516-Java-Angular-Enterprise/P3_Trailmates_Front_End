import { NotFoundComponent } from './not-found/not-found.component';
import { MessagingComponent } from './messaging-page/messaging/messaging.component';
import { TrailComponent } from './trail-page/trail/trail.component';
import { ProfileComponent } from './profile-page/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccComponent } from './auth/create-acc/create-acc.component';
import { LandingComponent } from './auth/landing/landing.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {

    // profile/:user
    path: 'profile',
    component: ProfileComponent
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
    component: TrailComponent
  },
  {
    //messaging/:user/:chat_id
    path: 'messaging',
    component: MessagingComponent
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
