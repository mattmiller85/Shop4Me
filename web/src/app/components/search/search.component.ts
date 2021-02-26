import { SearchResponse } from './../../../../../core/models';
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

  model: SearchRequest = {
    searchTerms: '',
    saveSearch: false
  };

  results = new Observable<SearchResponse>();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  search(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.results = this.apiService.search(this.model);
  }
}
