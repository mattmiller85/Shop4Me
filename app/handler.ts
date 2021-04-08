import { SearchRequest, SearchResponse, SaveSearchResponse, SaveSearchRequest, SaveSearchesResponse } from './../core/models';
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import Repository from './repository';


const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Credentials': true,
}
export const search: APIGatewayProxyHandler = async (event, _context) => {
  const searchRequest = JSON.parse(event.body || "{}") || {} as SearchRequest;
  return {
    statusCode: 200,
    headers: {
      ...corsHeaders
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
  
  const userId = event.requestContext?.authorizer?.claims['cognito:username'] || 'local';

  const repo = new Repository(userId);

  // check for the free tier limit
  var searches = await repo.getSearches();
  if (searches.length >=3 ) {
    return {
      statusCode: 200,
      headers: {
        ...corsHeaders
      },
      body: JSON.stringify(<SaveSearchResponse>{
        message: 'You have reached the free tier limit of 3 saved searches',
        success: false,
        search: searchRequest,
      }, null, 2),
    };
  }

  const exists = searches.findIndex(s => s.pk === searchRequest.pk && s.sk === searchRequest.sk) > -1;
  if (exists) {
    await repo.updateSearch(searchRequest);
  } else {
    await repo.saveSearch(searchRequest);
  }

  return {
    statusCode: 200,
    headers: {
      ...corsHeaders
    },
    body: JSON.stringify(<SaveSearchResponse>{
      message: 'Search saved!',
      success: true,
      search: searchRequest,
    }, null, 2),
  };
}

export const getSearches: APIGatewayProxyHandler = async (event, _context) => {
  console.log(event);
  console.log(event.requestContext?.authorizer);
  
  const userId = event.requestContext?.authorizer?.claims['cognito:username'] || 'local';

  const repo = new Repository(userId);
  const results = await repo.getSearches();

  return {
    statusCode: 200,
    headers: {
      ...corsHeaders
    },
    body: JSON.stringify(<SaveSearchesResponse>{
      message: 'Search saved!',
      success: true,
      searches: results,
    }, null, 2),
  };
}

export const deleteSearch: APIGatewayProxyHandler = async (event, _context) => {
  const deleteRequest = (JSON.parse(event.body || '{}') || {}) as SaveSearchRequest;
  console.log(event);
  console.log(event.requestContext?.authorizer);
  
  const userId = event.requestContext?.authorizer?.claims['cognito:username'] || 'local';

  const repo = new Repository(userId);
  await repo.deleteSearch(deleteRequest);

  return {
    statusCode: 200,
    headers: {
      ...corsHeaders
    },
    body: JSON.stringify(<SaveSearchesResponse>{
      message: 'Search removed!',
      success: true
    }, null, 2),
  };
}