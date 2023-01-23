import { Categories } from '../types';

class MsgCreateAddress {
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
      this.value = payload.value;
    }

    static fromJson(json: any) {
      return new MsgCreateAddress({
        json,
        type: json['@type'],
        label: json.label,
        creator: json.creator,
        network: json.network,
        value: json.value,
      });
    }
}

export default MsgCreateAddress;
