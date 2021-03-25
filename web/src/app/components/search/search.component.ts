import { map, first } from 'rxjs/operators';
import { SearchResponse, SaveSearchRequest } from './../../../../../core/models';
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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
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
    this.apiService.save(this.saveModel).subscribe((r) => {
      this.model.messages.push({ type: r.success ? 'success' : 'danger', message: r.message });
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
    this.model.messages = [];
    this.model.showSaveDetails = false;
    this.model.searchTerms = '';
    this.results = new Subject();
  }
}
