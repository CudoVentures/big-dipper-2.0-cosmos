import { Categories } from '../types';

class MsgDeleteAddress {
    public category: Categories;
    public type: string;
    public json: any;
    public creator: string;
    public network: string;
    public label: string;
    public value: string;

    constructor(payload: any) {
      this.category = 'addressbook';
      this.type = payload.type;
      this.json = payload.json;
      this.creator = payload.creator;
      this.network = payload.network;
      this.label = payload.label;
    }

    static fromJson(json: any) {
      return new MsgDeleteAddress({
        json,
        type: json['@type'],
        label: json.label,
        creator: json.creator,
        network: json.network,
      });
    }
}

export default MsgDeleteAddress;
