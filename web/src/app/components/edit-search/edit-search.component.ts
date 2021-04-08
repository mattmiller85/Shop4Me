import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

import { SaveSearchRequest } from './../../../../../core/models';


@Component({
  selector: 'app-edit-search',
  templateUrl: './edit-search.component.html',
  styleUrls: ['./edit-search.component.scss']
})
export class EditSearchComponent implements OnInit {

  editSearchForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<EditSearchComponent>, @Inject(MAT_DIALOG_DATA) public data: SaveSearchRequest, private fb: FormBuilder, private apiService: ApiService ) {}

  ngOnInit(){
    this.editSearchForm = this.fb.group(this.data);
  }

  save() {
    this.dialogRef.close(this.editSearchForm.value);
  }

}

