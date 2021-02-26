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