import { Categories } from '../types';

class MsgVerifyCollection {
  public category: Categories;
  public type: string;
  public json: any;
  public creator: string;
  public admin: string;
  public collectionId: string;

  constructor(payload: any) {
    this.category = 'marketplace';
    this.type = payload.type;
    this.json = payload.json;
    this.creator = payload.creator;
    this.admin = payload.admin;
    this.collectionId = payload.collectionId;
  }

  static getAdminFromLog(log: any) {
    return log
      .events.find((event: { type: string; }) => event.type === 'message')
      .attributes.find((attribute: { key: string; }) => attribute.key === 'sender')
      .value || undefined;
  }

  static fromJson(json: any, log?: any) {
    return new MsgVerifyCollection({
      json,
      type: json['@type'],
      creator: json.creator,
      admin: this.getAdminFromLog(log),
      collectionId: json.id,
    });
  }
}

export default MsgVerifyCollection;
