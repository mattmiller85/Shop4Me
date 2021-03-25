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

}