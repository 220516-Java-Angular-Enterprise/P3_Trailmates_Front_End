import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchAllComponent implements OnInit {

  constructor() { }

  query: string ='';

  ngOnInit(): void {
  }

  search(){
    console.log(this.query);
  }

}
