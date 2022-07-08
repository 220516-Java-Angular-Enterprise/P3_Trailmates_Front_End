import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MessagingComponent } from './messaging-page/messaging/messaging.component';
import { ProfileComponent } from './profile-page/profile/profile.component';
import { TrailComponent } from './trail-page/trail/trail.component';
import { LandingComponent } from './auth/landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateAccComponent } from './auth/create-acc/create-acc.component';
import { NotifiationsComponent } from './header/notifications/notifications.component';
import { SearchAllComponent } from './header/search-all/search-all.component';
import { SearchTrailsComponent } from './header/search-trails/search-trails.component';
import { UserMenuComponent } from './header/user-menu/user-menu.component';
import { NotificationItemComponent } from './header/notifications/notification-item/notification-item.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClickOutsideDirective } from './animations/click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MessagingComponent,
    ProfileComponent,
    TrailComponent,
    LandingComponent,
    LoginComponent,
    CreateAccComponent,
    NotifiationsComponent,
    SearchAllComponent,
    SearchTrailsComponent,
    UserMenuComponent,
    NotificationItemComponent,
    NotFoundComponent,
    ClickOutsideDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
