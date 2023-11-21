import { Categories } from '../types';

class MsgAddAdmin {
  public category: Categories;
  public type: string;
  public json: any;
  public creator: string;
  public address: string;

  constructor(payload: any) {
    this.category = 'marketplace';
    this.type = payload.type;
    this.json = payload.json;
    this.creator = payload.creator;
    this.address = payload.address;
  }

  static fromJson(json: any) {
    return new MsgAddAdmin({
      json,
      type: json['@type'],
      creator: json.creator,
      address: json.address,
    });
  }
}

export default MsgAddAdmin;
