import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer, CustomerData } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('myModal') myModal: any;
  @ViewChild('success') success!: TemplateRef<any>;
  enableCustomerTemplate: boolean = false;
  enablePineTemplate: boolean = false;
  dashboardData: CustomerData[] = [];
  customersList: Customer[] = [];
  constructor(
    private modalService: NgbModal) { }

  ngOnInit() {
    this.customersList = JSON.parse(localStorage.getItem('customers') || '[]');
    console.log(this.customersList)
    this.fetchData();
  }

  fetchData() {
    this.dashboardData = JSON.parse(localStorage.getItem('pins') || '[]');
  }

  showTemplate(content: TemplateRef<any>, type: string) {
    this.enableCustomerTemplate = type === 'customer';
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });  
    // setTimeout(() => {
    //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });      
    // });
  }

  onSubmitCustomer(event?: any) {
    this.customersList = JSON.parse(localStorage.getItem('customers') || '[]');
    this.modalService.dismissAll();
  }

  onSubmitPin(event?: any) {
    this.fetchData();
    this.modalService.dismissAll();
  }
}
