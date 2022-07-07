import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.scss']
})
export class SearchAllComponent implements OnInit {

  constructor() { }

  query: string ='';
  pizza: string = 'pizza';

  ngOnInit(): void {
  }

  search(){
    console.log(this.query);
  }

}
