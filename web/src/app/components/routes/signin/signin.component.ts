import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  formFields: any;

  constructor() {
    this.formFields = [
      {
        type: 'username'
      },
      {
        type: 'password'
      },
      {
        type: 'email'
      },
      {
        type: 'name',
        label: 'Your Name *',
        placeholder: 'Enter you prefered name here',
        required: true
      }
    ];
  }

  ngOnInit(): void {
  }

}
