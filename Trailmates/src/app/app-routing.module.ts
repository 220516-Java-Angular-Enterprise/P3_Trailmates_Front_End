import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './auth/landing/landing.component';
import { TraildescriptionComponent } from './trail-page/traildescription/traildescription.component';
const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'traildescription',
    component: TraildescriptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
