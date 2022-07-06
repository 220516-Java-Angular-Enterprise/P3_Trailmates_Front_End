import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagingComponent } from './messaging-page/messaging/messaging.component';
import { LandingComponent } from './auth/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
   //{path:'/messaging', component: MessagingComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
