import { OverlayModule } from '@angular/cdk/overlay';
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
import { SearchTrailsComponent } from './header/search-trails/search-trails.component';
import { UserMenuComponent } from './header/user-menu/user-menu.component';
import { MessagingComponent } from './messaging-page/messaging/messaging.component';
import { NotificationItemComponent } from './header/notifications/notification-item/notification-item.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthService } from './services/auth.service';
import { TrailHistoryComponent } from './profile-page/trail-history/trail-history.component';
import { TrailCommentsComponent } from './profile-page/trail-comments/trail-comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClickOutsideDirective } from './animations/click-outside.directive';
import { SearchTrailStateComponent } from './header/search-trails/search-trail-state/search-trail-state.component';
import { SearchTrailParkComponent } from './header/search-trails/search-trail-park/search-trail-park.component';
import { DynamicSearchComponent } from './header/search-trails/dynamic-search/dynamic-search.component';
import { CalendarModalComponent } from './calendar-modal/calendar-modal.component';
import { ChatRoomComponent } from './messaging-page/messaging/chat-room/chat-room.component';
import { ChatGroupsComponent } from './messaging-page/messaging/chat-groups/chat-groups.component';
import { PrivateMessageComponent } from './messaging-page/messaging/chat-room/private-message/private-message.component';
import { CreateGroupComponent } from './messaging-page/messaging/chat-groups/create-group/create-group.component';
import { HikerAbilityComponent } from './profile-page/hiker-ability/hiker-ability.component';
import { MessagesService } from './services/messages.service';
import { UpdateProfileComponent } from './profile-page/update-profile/update-profile/update-profile.component';
import { NotificationsComponent } from './header/notifications/notifications.component';


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
    DynamicSearchComponent,
    CalendarModalComponent,
    ChatRoomComponent,
    ChatGroupsComponent,
    PrivateMessageComponent,
    CreateGroupComponent,
    HikerAbilityComponent,
    UpdateProfileComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    OverlayModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,
    MessagesService,
    TrailHistoryComponent,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
