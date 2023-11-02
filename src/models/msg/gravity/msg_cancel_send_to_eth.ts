import { Categories } from '../types';

class MsgCancelSendToEth {
  public category: Categories;
  public sender: string;
  public transactionID: string;
  public type: string;
  public json: JSON;

  constructor(payload: any) {
    this.category = 'gravity';
    this.sender = payload.sender;
    this.transactionID = payload.transactionID;
    this.type = payload.type;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgCancelSendToEth({
      sender: json.sender,
      transactionID: json.transaction_id,
      type: json['@type'],
      json,
    });
  }
}

export default MsgCancelSendToEth;

