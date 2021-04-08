import { SearchRequest, SearchResponse, SaveSearchResponse, SaveSearchRequest, SaveSearchesResponse } from './../../../../core/models';
import { Injectable } from '@angular/core';

import { API } from 'aws-amplify';
import { Observable, from, pipe } from 'rxjs';

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

  public delete(deleteRequest: { pk: string, sk: string }): Observable<SaveSearchResponse> {
    return from(API.del('api', '/delete', { body: deleteRequest }));
  }

  public getSavedSearches(): Observable<SaveSearchesResponse> {
    return from(API.get('api', '/searches', { }));
  }
}
