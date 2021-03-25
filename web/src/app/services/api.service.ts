import { SearchRequest, SearchResponse, SaveSearchResponse, SaveSearchRequest } from './../../../../core/models';
import { Injectable } from '@angular/core';

import Amplify, { API } from 'aws-amplify';
import { Observable, from, pipe } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() {}

  public search(searchRequest: SearchRequest): Observable<SearchResponse> {
    return from(API.post('api', '/search', { body: searchRequest }));
  }

  public save(searchRequest: SaveSearchRequest): Observable<SaveSearchResponse> {
    return from(API.post('api', '/save', { body: searchRequest }));
  }
}
