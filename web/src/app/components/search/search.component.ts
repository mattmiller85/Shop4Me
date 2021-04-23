import { map, first } from 'rxjs/operators';
import { SearchResponse, SaveSearchRequest, SaveSearchesResponse } from './../../../../../core/models';
import { SaveSearchResponse } from './../../../../../core/models';
import { async, Observable, Subject } from 'rxjs';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { SearchRequest } from '../../../../../core/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditSearchComponent } from '../shared/edit-search/edit-search.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  model = {
    searchTerms: '',
    saveSearch: false,
    showSaveDetails: false,
    canSearch: false,
    canSaveSearch: false,
    searchLimit: false,
    messages: new Array<{ type: string, message: string }>()
  };

  saveModel: SaveSearchRequest = {
    pk: '',
    sk: '',
    timestamp: 0,
    searchTerms: this.model.searchTerms,
    searchName: '',
    product: '',
    color: '',
    brand: ''
  };

  results = new Observable<SearchResponse>();
  saveResults = new Observable<SaveSearchResponse>();
  searches: SaveSearchesResponse | undefined;

  displayedColumns = ["Name", "Description", "Price"];

  dataSource!: MatTableDataSource<
    { 
      name: string;
      price: string;
      url: string;
      description: string;
    }
  >;

  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    await this.validateSearchLimit();
  }

  async validateSearchLimit(): Promise<void> {
    this.searches = await this.apiService.getSavedSearches().toPromise();
    if (this.searches.searches.length >= 3) {
      this.model.searchLimit = true;
      this.model.canSaveSearch = false;
      this.model.messages = this.model.messages || [];
      this.model.messages.push( { type: 'danger', message: 'You have reached the maximum of 3 searches.' } );
    } else {
      this.model.messages = this.model.messages.filter(m => m.message !== 'You have reached the maximum of 3 searches.');
      this.model.searchLimit = false;
      this.model.canSaveSearch = true;
    }
  }

  search(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.results = this.apiService.search(this.model);
    this.results.subscribe(things => {
      this.dataSource = new MatTableDataSource(things.results);
    });
  }

  canSearch(evt: Event): void {
    this.model.canSearch = (this.model.searchTerms !== undefined && this.model.searchTerms.trim() !== '');
  }
/*
  saveSearch(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.model.messages = [];
    if (this.saveModel.searchName === undefined || this.saveModel.searchName.trim() === '') {
      this.model.messages.push({ type: 'danger', message: 'Please enter a "Name" for the search.' });
    }
    if (this.saveModel.product === undefined || this.saveModel.product.trim() === '') {
      this.model.messages.push({ type: 'danger', message: 'Please enter a "Product" for the search.' });
    }

    if (this.model.messages.length) {
      return;
    }
    this.saveModel.searchTerms = this.model.searchTerms;
    this.apiService.save(this.saveModel).subscribe(async (r) => {
      this.model.messages.push({ type: r.success ? 'success' : 'danger', message: r.message });
      await this.validateSearchLimit();
    });
  }
*/
  saveSearchDetails(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.model.showSaveDetails = !this.model.showSaveDetails;
    // tslint:disable-next-line:forin
    this.saveModel.searchTerms = this.model.searchTerms;
    const dialogRef = this.dialog.open(EditSearchComponent, {
      closeOnNavigation: true,
      width: '400px',
      data: {
        title: "Create New Search",
        message: this.saveModel,
        button_acceptance: "Save",
        button_disregard: "Cancel"
      }
    });

    dialogRef.afterClosed().subscribe(
        data => {
          if (data !== undefined && data !== '') {
            this.model.messages = [];
            this.saveModel = data;
          
            if (this.saveModel.searchName === undefined || this.saveModel.searchName.trim() === '') {
              this.model.messages.push({ type: 'danger', message: 'Please enter a "Name" for the search.' });
            }
            if (this.saveModel.product === undefined || this.saveModel.product.trim() === '') {
              this.model.messages.push({ type: 'danger', message: 'Please enter a "Product" for the search.' });
            }

            if (this.model.messages.length) {
              return;
            }
            this.saveModel.searchTerms = this.model.searchTerms;
            this.apiService.save(this.saveModel).subscribe(async (r) => {
              this.model.messages.push({ type: r.success ? 'success' : 'danger', message: r.message });
              await this.validateSearchLimit();
            });

            //this.apiService.save(data).subscribe();
          }
        }
    );
  }

  clearSearch(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.model.canSearch = false;
    this.model.messages = this.model.messages.filter(m => m.message === 'You have reached the maximum of 3 searches.');
    this.model.showSaveDetails = false;
    this.model.searchTerms = '';
    this.results = new Subject();
    this.saveModel = {
                      pk: '',
                      sk: '',
                      timestamp: 0,
                      searchTerms: this.model.searchTerms,
                      searchName: '',
                      product: '',
                      color: '',
                      brand: ''
                    };
  }
}
