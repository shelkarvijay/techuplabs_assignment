import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinComponent } from './components/pin/pin.component';
import { CustomerComponent } from './components/customer/customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSelectModule } from 'ngx-select-ex';
import { FileUploadModule } from 'ng2-file-upload';



@NgModule({
  declarations: [
    PinComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSelectModule,
    FileUploadModule
  ],
  exports: [
    PinComponent,
    CustomerComponent
  ]
})
export class SharedModule { }
