import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Value } from './value.module';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {
  values: Value[];
  constructor(private http: HttpClient) {
 
   }

  ngOnInit() {
    this.getValues();
  }
getValues(){
  this.http.get('https://localhost:5001/api/values').subscribe((response) => {
      this.values = response as Value[];
      console.log( this.values);
  }, error => {
    console.log(error);
  });
}
}
