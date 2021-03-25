import { search } from './../app/handler';
export interface SearchRequest {
  searchTerms: string;
  saveSearch: boolean;
}

export interface SearchResponse {
  message: string;
  searchTerms: string;
  numResults: number;
  results: Array<
    { 
      name: string;
      price: string;
      url: string;
      description: string;
    }
  >
}

export interface SaveSearchRequest {
  pk: string;
  sk: string;
  timestamp: number;
  searchTerms: string;
  searchName: string;
  product: string;
  color?: string;
  brand?: string;
}

export interface SaveSearchResponse {
  message: string;
  search: SaveSearchRequest;
  success: boolean;
}
