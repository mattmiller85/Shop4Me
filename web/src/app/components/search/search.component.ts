import { map, first } from 'rxjs/operators';
import { SearchResponse, SaveSearchRequest, SaveSearchesResponse } from './../../../../../core/models';
import { SaveSearchResponse } from './../../../../../core/models';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { SearchRequest } from '../../../../../core/models';

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

  constructor(private apiService: ApiService) { }

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
  }

  canSearch(evt: Event): void {
    this.model.canSearch = (this.model.searchTerms !== undefined && this.model.searchTerms.trim() !== '');
  }

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

  saveSearchDetails(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.model.showSaveDetails = !this.model.showSaveDetails;
  }

  clearSearch(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.model.canSearch = false;
    this.model.messages = this.model.messages.filter(m => m.message === 'You have reached the maximum of 3 searches.');
    this.model.showSaveDetails = false;
    this.model.searchTerms = '';
    this.results = new Subject();
  }
}
