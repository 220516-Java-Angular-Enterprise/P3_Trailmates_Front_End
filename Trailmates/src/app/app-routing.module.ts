import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './auth/landing/landing.component';
import { TrailComponent } from './trail-page/trail/trail.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'trailpage',
    component: TrailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
