import { Categories } from '../types';

class MsgSendToEth {
  public category: Categories;
  public sender: string;
  public amount: string;
  public ethDest: string;
  public type: string;
  public json: JSON;

  constructor(payload: any) {
    this.category = 'gravity';
    this.sender = payload.sender;
    this.amount = payload.amount;
    this.ethDest = payload.ethDest;
    this.type = payload.type;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgSendToEth({
      sender: json.sender,
      amount: json.amount.amount,
      ethDest: json.eth_dest,
      type: json['@type'],
      json,
    });
  }
}

export default MsgSendToEth;
