import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
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
import { AuthService } from './services/auth.service';
import { TrailHistoryComponent } from './profile-page/trail-history/trail-history.component';
import { TrailCommentsComponent } from './profile-page/trail-comments/trail-comments.component';
import { FormsModule } from '@angular/forms';
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
    NotifiationsComponent,
    SearchAllComponent,
    SearchTrailsComponent,
    UserMenuComponent,
    NotificationItemComponent,
    NotFoundComponent,
    TrailHistoryComponent,
    TrailCommentsComponent,
    SearchTrailStateComponent,
    SearchTrailParkComponent,
    DynamicSearchComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
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
export class AppModule { }
