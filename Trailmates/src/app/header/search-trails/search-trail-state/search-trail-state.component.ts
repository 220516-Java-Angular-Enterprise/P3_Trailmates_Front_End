import { Trail } from 'src/app/models/trail';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TrailService } from 'src/app/services/trail.service';

@Component({
  selector: 'app-search-trail-state',
  templateUrl: './search-trail-state.component.html',
  styleUrls: ['./search-trail-state.component.scss']
})
export class SearchTrailStateComponent implements OnInit {

  constructor(private _trailService: TrailService) { }

  trails$!: Observable<Trail[]>;
  query: string =''
  error: boolean = false;
  ngOnInit(): void {
  }

  filterSearchByState(){
    this.trails$ = this._trailService.getByState(this.query);
  }

  matchStateRegex(){
    let stateRegex = /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/
    if(this.query.match(stateRegex)){
      console.log(this.error)
      this.error = false;
    } else {
    console.log(this.error)
    this.error = true;
    }
  }

  

}
