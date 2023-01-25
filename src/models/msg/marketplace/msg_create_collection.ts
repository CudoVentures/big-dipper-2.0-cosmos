import {
  Royalties, Categories,
} from '@src/models/msg/types';

class MsgCreateCollection {
  public category: Categories;
  public type: string;
  public json: any;
  public creator: string;
  public collectionId: string;
  public mintRoyalties: Royalties[];
  public resaleRoyalties: Royalties[];

  constructor(payload: any) {
    this.category = 'marketplace';
    this.type = payload.type;
    this.json = payload.json;
    this.creator = payload.creator;
    this.collectionId = payload.collectionId;
    this.mintRoyalties = payload.mintRoyalties;
    this.resaleRoyalties = payload.resaleRoyalties;
  }

  static fromJson(json: any) {
    return new MsgCreateCollection({
      json,
      type: json['@type'],
      creator: json.creator,
      collectionId: json.id,
      mintRoyalties: json.mintRoyalties,
      resaleRoyalties: json.resaleRoyalties,
    });
  }
}

export default MsgCreateCollection;