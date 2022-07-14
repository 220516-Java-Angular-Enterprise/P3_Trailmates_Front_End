import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Trail } from '../models/trail';

@Injectable({
  providedIn: 'root'
})
export class UserReviewService {

  constructor(private http: HttpClient) { }

  url: string = 'http://trailmates-env.us-east-1.elasticbeanstalk.com/TrailMates/trailreview/'


}
