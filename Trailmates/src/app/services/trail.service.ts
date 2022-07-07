import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TrailService {

private URL="http://localhost:8080/TrailMates/history";

  constructor(private http:HttpClient,private route:Router) { }
}
