import { SearchRequest, SearchResponse } from './../../../../core/models';
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
    return from(API.post('api', '/search', searchRequest));
  }
}
