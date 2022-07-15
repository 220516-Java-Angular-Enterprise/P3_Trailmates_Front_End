import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }
  private url = 'https://revature.trailmates.net/TrailMates/notification/'
  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.url);
  }

  deleteNotification(id: string){
    return this.http.delete(this.url+id).subscribe((data:any)=>{
      console.log(data);
    })
  }

}
