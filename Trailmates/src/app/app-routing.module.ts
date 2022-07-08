import { NotFoundComponent } from './not-found/not-found.component';
import { TrailComponent } from './trail-page/trail/trail.component';
import { CreateAccComponent } from './auth/create-acc/create-acc.component';
import { ProfileComponent } from './profile-page/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { MessagingComponent } from './messaging-page/messaging/messaging.component';
=======
import { AuthGuard } from './auth.guard';
>>>>>>> 099c4dc77562edb5e3d66b08651cb4968718da5b
import { LandingComponent } from './auth/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    // profile/:user
    path: 'profile',
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
    canActivate: [AuthGuard]
  },
  {
    //messaging/:user/:chat_id
    path: 'messaging',
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
