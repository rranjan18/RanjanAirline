import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { SearchService } from '../service/search-service.service';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss']
})
export class SearchFlightComponent implements OnInit {
  authForm: FormGroup;
  isSubmitted: boolean;
  options: string[] = ['Mumbai', 'Delhi', 'Chennai', 'Bangalore'];
  options1: string[] = ['Mumbai', 'Delhi', 'Chennai', 'Bangalore'];
  
  panelOpenState = false;
  countValue = 0;
  childCountValue = 0;
  infantCountValue = 0;
   displayedColumns: string[] = ['id', 'sortBy', 'depart', 'arrive' ,'duration','amount'];
   dataSource  =[
    {
       "id":"1",
       "sortBy":"Go-AIR",
       "depart":"06:10",
       "arrive":"9:10",
       "duration":"03:00",
       "amount":"4500"
    
 },
    {
       "id":2,
       "sortBy":"Indigo",
       "depart":"06:10",
       "arrive":"9:10",
       "duration":"03:00",
       "amount":4500
    
 },
    {
       "id":3,
       "sortBy":"Air-Aisa",
       "depart":"06:10",
       "arrive":"9:10",
       "duration":"03:00",
       "amount":4500
    
 }
 ]
//  displayedColumns: string[] = ['id', 'sortBy', 'depart', 'arrive'];
myControl = new FormControl();
filteredOptions: Observable<string[]>;

myGoingControl = new FormControl();
filteredGoingOptions: Observable<string[]>;

  constructor(private formBuilder: FormBuilder,
              private searchService: SearchService
              ) { }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
    });

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredGoingOptions = this.myGoingControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter1(value))
    );

    this.isSubmitted=false;
}

submit() {
  this.isSubmitted=true;
  this.searchService.getDetails().subscribe((data) => {
    console.log(data);
  });
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.options.filter(option => option.toLowerCase().includes(filterValue));
}

private _filter1(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.options1.filter(option1 => option1.toLowerCase().includes(filterValue));
}

}
