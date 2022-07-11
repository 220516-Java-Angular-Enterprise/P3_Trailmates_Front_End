import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TrailHistoryService {
  private URL="http://trailmates-env.us-east-1.elasticbeanstalk.com/TrailMates/history";

  constructor(private http:HttpClient, private route:Router) { }
}
