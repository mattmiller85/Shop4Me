import { DynamoDB } from 'aws-sdk';
import { SaveSearchRequest } from './../core/models';

export default class Repository {
  ddb: DynamoDB.DocumentClient;

  constructor(private userId: string) {
    this.ddb = new DynamoDB.DocumentClient({apiVersion: '2012-08-10', region: 'us-east-1' });
  }

  async saveSearch(request: SaveSearchRequest) {

    const sk = new Date().getTime();
    request.timestamp = sk;
    const pk = `SEARCH#${this.userId}`;
    const skValue = `ADDED#${sk}`;
    request.pk = pk;
    request.sk = skValue;
    const params = {
      TableName: 'shop4me.shopData',
      Item: request
    };

    await this.ddb.put(params).promise();
  }

  async updateSearch(request: SaveSearchRequest) {

    const ts = new Date().getTime();
    request.timestamp = ts;
    const pk = `SEARCH#${this.userId}`;
    const skValue = `ADDED#${request.sk}`;
    request.pk = pk;
    request.sk = skValue;
    const params = {
      TableName: 'shop4me.shopData',
      Item: request
    };

    await this.ddb.put(params).promise();
  }

  async deleteSearch(request: { sk: string, pk: string }) {
    const params = {
      TableName: 'shop4me.shopData',
      Key: {
        'pk': request.pk, 'sk': request.sk
      }
    };

    await this.ddb.delete(params).promise();
  }

  async getSearches(): Promise<SaveSearchRequest[]> {

    const pk = `SEARCH#${this.userId}`;

    var results = await this.ddb.query({
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
        ':pk': pk
      },
      TableName: 'shop4me.shopData',
      ScanIndexForward: false
    }).promise();
    return results.Items as SaveSearchRequest[];
  }

}