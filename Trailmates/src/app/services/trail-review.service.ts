import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrailRating } from '../models/trail-rating';
import { TrailReview } from '../models/trailReview';

@Injectable({
  providedIn: 'root'
})
export class TrailReviewService {

  constructor(private http: HttpClient) { }
  url: string = 'https://revature.trailmates.net/TrailMates/trailreview/'

  // create new review
  postTrailReviews(id: string, trailReviewReq: any): Observable<TrailReview> {
    console.log(this.url + id)
    return this.http.post<any>(this.url + id, trailReviewReq);
  }

  // Gets all trails from backend with GET request
  getAllTrailsReviews(id: string): Observable<TrailRating> {
    return this.http.get<TrailRating>(this.url + 'avg/' + id)
  }

  //Get trail by id input with GET request
  getById(id: string): Observable<TrailReview[]> {
    return this.http.get<TrailReview[]>(this.url + "all/" + id);
  }

}