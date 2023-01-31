import { formatToken } from '@src/utils/format_token';
import { Categories } from '../types';

class MsgPublishNft {
  public category: Categories;
  public type: string;
  public json: any;
  public creator: string;
  public denomId: string;
  public tokenId: string;
  public price: TokenUnit

  constructor(payload: any) {
    this.category = 'marketplace';
    this.type = payload.type;
    this.json = payload.json;
    this.creator = payload.creator;
    this.denomId = payload.denomId;
    this.tokenId = payload.tokenId;
    this.price = payload.price;
  }

  static fromJson(json: any) {
    return new MsgPublishNft({
      json,
      type: json['@type'],
      creator: json.creator,
      denomId: json.denomId,
      tokenId: json.tokenId,
      price: formatToken(json.price.amount, json.price.denom),
    });
  }
}

export default MsgPublishNft;
