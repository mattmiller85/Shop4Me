import { SearchResponse, SaveSearchRequest } from './../../../../../core/models';
import { SaveSearchResponse } from './../../../../../core/models';
import { Observable } from 'rxjs';
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
    canSearch: false
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
    this.saveModel.searchTerms = this.model.searchTerms;
    this.saveResults = this.apiService.save(this.saveModel);
  }

  saveSearchDetails(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.model.showSaveDetails = !this.model.showSaveDetails;
  }
}
