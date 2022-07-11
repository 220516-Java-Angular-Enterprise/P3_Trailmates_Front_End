import { SearchAllComponent } from './header/search-users/search-users.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile-page/profile/profile.component';
import { TrailComponent } from './trail-page/trail/trail.component';
import { LandingComponent } from './auth/landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateAccComponent } from './auth/create-acc/create-acc.component';
import { NotificationsComponent } from './header/notifications/notifications.component';
import { SearchTrailsComponent } from './header/search-trails/search-trails.component';
import { UserMenuComponent } from './header/user-menu/user-menu.component';
import { NotificationItemComponent } from './header/notifications/notification-item/notification-item.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthService } from './services/auth.service';
import { TrailHistoryComponent } from './profile-page/trail-history/trail-history.component';
import { TrailCommentsComponent } from './profile-page/trail-comments/trail-comments.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClickOutsideDirective } from './animations/click-outside.directive';
import { SearchTrailStateComponent } from './header/search-trails/search-trail-state/search-trail-state.component';
import { SearchTrailParkComponent } from './header/search-trails/search-trail-park/search-trail-park.component';
import { DynamicSearchComponent } from './header/search-trails/dynamic-search/dynamic-search.component';
import { MessagingComponent } from './messaging-page/messaging/messaging.component';
import { MessagesService } from './services/messages.service';

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
    NotificationsComponent,
    SearchAllComponent,
    SearchTrailsComponent,
    UserMenuComponent,
    NotificationItemComponent,
    NotFoundComponent,
    TrailHistoryComponent,
    TrailCommentsComponent,
    ClickOutsideDirective,
    SearchTrailStateComponent,
    SearchTrailParkComponent,
    DynamicSearchComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService,
    MessagesService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
