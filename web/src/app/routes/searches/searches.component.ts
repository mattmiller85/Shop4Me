import { SaveSearchesResponse, SaveSearchRequest, SaveSearchResponse } from './../../../../../core/models';
import { Observable } from 'rxjs';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditSearchComponent } from 'src/app/components/edit-search/edit-search.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { ConfirmDialogComponent } from 'src/app/components/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styleUrls: ['./searches.component.scss']
})
export class SearchesComponent implements OnInit {

  model = new Observable<SaveSearchesResponse>();

  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSearches();
  }

  getSearches(): void {
    this.model = this.apiService.getSavedSearches();
  }

  saveSearch(searchRequest: SaveSearchRequest): void {
    this.apiService.save(searchRequest).subscribe();
  }

  openDialog(item: SaveSearchRequest): void {

    const dialogRef = this.dialog.open(EditSearchComponent, {
      closeOnNavigation: true,
      width: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe(
        data => {
          if (data !== undefined && data !== '') {
            this.apiService.save(data).subscribe();
          }
        }
    );
  }

  deleteSearch(search: SaveSearchRequest): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      closeOnNavigation: true,
      width: '400px',
      data: {
        message: "Do you wish to delete " + search.searchName + "?",
        title: "Delete " + search.searchName + " Search",
        button_acceptance: "Delete " + search.searchName,
        button_disregard: "Cancel"
      }
    });

    dialogRef.afterClosed().subscribe(
        data => {
          if (data !== undefined && data !== '') {
            this.apiService.delete(search).subscribe(d => this.model = this.apiService.getSavedSearches());
          }
        }
    );
    
  }
}
