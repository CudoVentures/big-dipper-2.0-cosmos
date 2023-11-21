import { Categories } from '../types';

class MsgRemoveNft {
  public category: Categories;
  public type: string;
  public json: any;
  public creator: string;
  public id: string;

  constructor(payload: any) {
    this.category = 'marketplace';
    this.type = payload.type;
    this.json = payload.json;
    this.creator = payload.creator;
    this.id = payload.id;
  }

  static fromJson(json: any) {
    return new MsgRemoveNft({
      json,
      type: json['@type'],
      creator: json.creator,
      id: json.id,
    });
  }
}

export default MsgRemoveNft;
