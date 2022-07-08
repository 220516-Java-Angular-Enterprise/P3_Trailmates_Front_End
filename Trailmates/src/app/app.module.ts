import { NgModule } from '@angular/core';
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
import { NotifiationsComponent } from './header/notifications/notifiations.component';
import { SearchAllComponent } from './header/search-all/search-all.component';
import { SearchTrailsComponent } from './header/search-trails/search-trails.component';
import { UserMenuComponent } from './header/user-menu/user-menu.component';
<<<<<<< HEAD
=======
import { FormsModule } from '@angular/forms';
import { MessagingComponent } from './messaging-page/messaging/messaging.component';
>>>>>>> 099c4dc77562edb5e3d66b08651cb4968718da5b
import { NotificationItemComponent } from './header/notifications/notification-item/notification-item.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthService } from './services/auth.service';
<<<<<<< HEAD
import { TrailHistoryComponent } from './profile-page/trail-history/trail-history.component';
import { TrailCommentsComponent } from './profile-page/trail-comments/trail-comments.component';
import { FormsModule } from '@angular/forms';

=======
import { MessagesService } from './services/messages.service';
>>>>>>> 099c4dc77562edb5e3d66b08651cb4968718da5b

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
<<<<<<< HEAD
    NotFoundComponent,
    TrailHistoryComponent,
    TrailCommentsComponent
=======
    NotFoundComponent

>>>>>>> 099c4dc77562edb5e3d66b08651cb4968718da5b
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
