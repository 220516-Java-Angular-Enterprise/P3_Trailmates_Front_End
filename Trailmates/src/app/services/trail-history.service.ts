import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TrailHistoryService {
  private URL="http://localhost:8080/TrailMates/history";

  constructor(private http:HttpClient, private route:Router) { }
}
