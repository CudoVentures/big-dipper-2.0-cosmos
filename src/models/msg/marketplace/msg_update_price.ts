import { formatToken } from '@src/utils/format_token';
import { Categories } from '../types';

class MsgUpdatePrice {
  public category: Categories;
  public type: string;
  public json: any;
  public creator: string;
  public id: string;
  public price: TokenUnit;

  constructor(payload: any) {
    this.category = 'marketplace';
    this.type = payload.type;
    this.json = payload.json;
    this.creator = payload.creator;
    this.id = payload.id;
    this.price = payload.price;
  }

  static fromJson(json: any) {
    return new MsgUpdatePrice({
      json,
      type: json['@type'],
      creator: json.creator,
      id: json.id,
      price: formatToken(json.price.amount, json.price.denom),
    });
  }
}

export default MsgUpdatePrice;
