import { SaveSearchesResponse } from './../../../../../core/models';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styleUrls: ['./searches.component.scss']
})
export class SearchesComponent implements OnInit {
  model: Observable<SaveSearchesResponse> | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getSearches();
  }

  getSearches(): void {
    this.model = this.apiService.getSavedSearches();
  }

}
