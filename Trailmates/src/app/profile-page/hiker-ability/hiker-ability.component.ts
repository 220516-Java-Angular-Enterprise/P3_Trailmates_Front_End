import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Level } from 'src/app/models/hiker-enum';
import { TrailHistory } from 'src/app/models/trailHistory';
import { TrailHistoryService } from 'src/app/services/trail-history.service';
import { TrailService } from 'src/app/services/trail.service';

@Component({
  selector: 'hiker-ability',
  templateUrl: './hiker-ability.component.html',
  styleUrls: ['./hiker-ability.component.scss']
})
export class HikerAbilityComponent implements OnInit {

  public level!: string;

  private _experience!: number;
  private _expSubject = new BehaviorSubject<number>(0);
  private _trackedExp$ = this._expSubject.asObservable();

  constructor(private _trailHistoryService: TrailHistoryService, private _trailService: TrailService) { }

  ngOnInit(): void {
    //keep track of experience
    this._trackedExp$.subscribe((exp) => {

    //set current experience when recorded
      this._experience = exp;
      console.log('experience updated to', this._experience);

    //determine hiker level based on total experience
      this.level = Level[Math.floor(this._experience / 60.0)];
      console.log('level set to', this.level, 'using',
        Math.floor(this._experience/60.0));
    })

    //Get the trails from each of the posts on this page
    //  to determine Hiker level
    this._trailHistoryService.getHistoryAsc().subscribe((hist) => {
      for(var trail of hist)
        this.updateExperience(trail);
    });
  }

  private updateExperience(pastTrail: TrailHistory): void {
    
    //find the exact trail by name
    firstValueFrom(this._trailService.getByName(pastTrail.trailName as string))
      .then((t) => {
        for(let i = 0; i < t.length; i++) {

          if(t[i].name == pastTrail.trailName) {

    //parse its duration into numbers
            let expGain = this.parseAvgDuration(t[i].duration as string);

    //update the listened experience tracker with current experience plus
    //  experience gained
            console.log('Trying to update experience', this._experience, 'with', expGain);
            this._expSubject.next(this._experience + expGain);
            break;
          }
        }          
      })
  }
  
  private parseAvgDuration(duration: string): number {
    //Trails without a duration are assumed to be 1 Hour long
    if(duration == "") return 60;
    else {

      //All durations are in form #-# Units
      //Retrieve units of the duration
      let inHours = duration.includes('Hours');
      
      //Split the string on -, Minutes, and Hours
      let range = duration.split(RegExp("[-|(Hours)|(Minutes)| ]"), 2);

      //return average of the two resulting numbers
      return (inHours?60:1)*(Number.parseInt(range[1]));
    }
  }
}
