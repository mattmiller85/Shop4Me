import { SearchRequest, SearchResponse, SaveSearchResponse, SaveSearchRequest } from './../core/models';
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import Repository from './repository';

export const search: APIGatewayProxyHandler = async (event, _context) => {
  const searchRequest = JSON.parse(event.body || "{}") || {} as SearchRequest;
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(<SearchResponse>{
      message: 'Search complete!',
      searchTerms: searchRequest.searchTerms,
      numResults: 1,
      results: [
        {
          name: 'Some weird thing',
          price: '$500.00',
          url: 'https://www.google.com',
          description: 'This is something that is hard to find'
        }
      ],
    }, null, 2),
  };
}

export const save: APIGatewayProxyHandler = async (event, _context) => {
  const searchRequest = (JSON.parse(event.body || '{}') || {}) as SaveSearchRequest;
  console.log(event.body);
  console.log(event);
  
  const userId = _context.identity?.cognitoIdentityId || 'local';

  const repo = new Repository(userId);
  await repo.saveSearch(searchRequest);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(<SaveSearchResponse>{
      message: 'Search saved!',
      success: true,
      search: searchRequest,
    }, null, 2),
  };
}
