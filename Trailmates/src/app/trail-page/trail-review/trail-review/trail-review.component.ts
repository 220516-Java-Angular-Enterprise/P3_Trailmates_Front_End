import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrailReview } from 'src/app/models/trailReview';
import { TrailReviewService } from 'src/app/services/trail-review.service';

@Component({
  selector: 'app-trail-review',
  templateUrl: './trail-review.component.html',
  styleUrls: ['./trail-review.component.scss']
})
export class TrailReviewComponent implements OnInit {

  constructor(private currRoute: ActivatedRoute, public router: Router, private trailReviewService: TrailReviewService) { }

  // private String comment;
  // private BigDecimal rating;

  trailReviewRequest = {
    "comment": '',
    "rating": 0
  }

  @Output() passSubmitStatus: EventEmitter<boolean> = new EventEmitter();
  displayFormSubmitError: boolean = false;
  submitted: boolean = false;
  time: string = '00:00'
  badDate: boolean = false;
  noUsers: boolean = false;

  trailFlagReq = {
    trail_id: '',
    user_id: '',
    date_int: 0,
  }

  // this.currRoute.firstChild?.snapshot.params['id']

  // grab trail id
  // get all reviews of that trail
  
  trailReviews: TrailReview[] = []
  currTrail: string = ''


  ngOnInit(): void {
    //Sets trail ID and user ID to trailFlagReq.
    this.currTrail = this.currRoute.firstChild?.snapshot.params['id'];
  }

  // get trailreviews by id and pushes to lis

  // getAllTrailReview(): void {
  //   this.trailReviews = this.trailReviewService.getById(this.currTrail)
  // }

}
