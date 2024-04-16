import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../interfaces/interfaces';
import { ApiService } from '../../services/api.service';
import { INgxSelectOption } from 'ngx-select-ex';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnDestroy {
  customerForm!: FormGroup;
  regionsList: any[] = [];
  allRegionData: any[] = [];
  countriesList: any[] = [];
  @Output('onSubmitCustomer') onSubmitCustomer: EventEmitter<any> = new EventEmitter();
  subscription!: Subscription;
  
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.createForm();
    this.getCountries();
  }

  createForm() {
    this.customerForm = this.formBuilder.group({
      title: [''],
      email: ['', Validators.compose([Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      region: [''],
      coutry: [''],
    });
  }

  get f() { return this.customerForm.controls; }

  getCountries() {
    this.subscription = this.apiService.getCountries('countries').subscribe({
        next: (response) => {
          if(response && response.status.toUpperCase().includes('OK') && response['status-code'] === 200) {
            this.allRegionData = Object.keys(response.data).map((item) => response.data[item]);
            let regionList = this.allRegionData.map((item) => item.region);
            this.regionsList = [...new Set(regionList)];
          } else {
            /**
             * We can handle other than 200-Status(Success) code here
             */
          }
        },
        error: (error) => {
          /**
           * We can catch api error here.
           */
        }
      });
  }

  onSelectRegion(event: INgxSelectOption[]) {
    this.filterCountries(event[0].value.toString());
  }

  filterCountries(region: string) {
    this.countriesList = this.allRegionData.filter((obj) => obj.region === region).map((item) => item.country);
  }
  
  onSubmit() {
    let customerObj = {} as Customer;
    let customerList: Customer[] = localStorage.getItem('customers') ? JSON.parse(localStorage.getItem('customers') || '[]') : [];
    let id = 1;
    if(customerList && customerList.length > 0) {
      id = customerList.length + 1;
    }
    customerObj = {...this.customerForm.value, id: id};
    customerList.push(customerObj);
    localStorage.setItem('customers', JSON.stringify(customerList));
    this.onSubmitCustomer.emit('success');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
