import { formatToken } from '@src/utils/format_token';
import {
  Categories, MintedNft,
} from '../types';

class MsgMintNft {
  public category: Categories;
  public type: string;
  public json: any;
  public mintedNftData: MintedNft;
  public creator: string;
  public recipient: string;

  constructor(payload: any) {
    this.category = 'marketplace';
    this.type = payload.type;
    this.json = payload.json;
    this.creator = payload.creator;
    this.recipient = payload.recipient;
    this.mintedNftData = payload.mintedNftData;
  }

  static fromJson(json: any) {
    return new MsgMintNft({
      json,
      type: json['@type'],
      creator: json.creator,
      recipient: json.recipient,
      mintedNftData: {
        denomId: json.denomId,
        uid: json.uid,
        uri: json.uri,
        data: json.data,
        name: json.name,
        price: formatToken(json.price.amount, json.price.denom),
      },
    });
  }
}

export default MsgMintNft;
