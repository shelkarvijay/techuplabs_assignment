import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer, Pin } from '../../interfaces/interfaces';
import { FileUploader } from 'ng2-file-upload';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit, AfterViewInit {
  pinForm!: FormGroup;
  customersList: Customer[] = [];
  uploader!: FileUploader;
  hasBaseDropZoneOver!: boolean;
  localImageUrl: any;
  @Output('onSubmitPin') onSubmitPin: EventEmitter<any> = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true,
      formatDataFunctionIsAsync: true,
      queueLimit: 1,
      formatDataFunction: async (item: any) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });
    this.hasBaseDropZoneOver = false;
    this.uploader.onAfterAddingFile = (fileItem) => {
      this.saveFile(fileItem._file);
    }
  }
  saveFile(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.localImageUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }
  ngOnInit(): void {
    this.customersList = JSON.parse(localStorage.getItem('customers') || '[]').map((item: Customer) => item.title);
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges(); 
  }

  createForm() {
    this.pinForm = this.formBuilder.group({
      title: [''],
      collab: [''],
      privacy: ['']
    });
  }

  get f() { return this.pinForm.controls; }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  onSubmit() {
    let pinObj = {} as Pin;
    let pinList: Pin[] = localStorage.getItem('pins') ? JSON.parse(localStorage.getItem('pins') || '[]') : [];
    let id = 1;
    if(pinList && pinList.length > 0) {
      id = pinList.length + 1;
    }
    pinObj = {...this.pinForm.value, id: id, file: this.localImageUrl};
    pinList.push(pinObj);
    localStorage.setItem('pins', JSON.stringify(pinList));
    this.onSubmitPin.emit();
  }
}
