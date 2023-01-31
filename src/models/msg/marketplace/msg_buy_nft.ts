import { formatToken } from '@src/utils/format_token';
import { Categories } from '../types';

class MsgBuyNft {
  public category: Categories;
  public type: string;
  public json: any;
  public seller: string;
  public buyer: string;
  public id: string;
  public price: TokenUnit;

  constructor(payload: any) {
    this.category = 'marketplace';
    this.type = payload.type;
    this.json = payload.json;
    this.seller = payload.seller;
    this.buyer = payload.buyer;
    this.id = payload.id;
    this.price = payload.price;
  }

  static getPriceFromSaleEvents(events: any): TokenUnit {
    const salePrice = events
      .attributes.find((attribute: { key: string; }) => attribute.key === 'price')
      .value || undefined;
    const splitPrice = salePrice.split(/(\d+)/);
    return formatToken(splitPrice[1], splitPrice[2]);
  }

  static getSellerFromSaleEvents(events: any) {
    return events
      .attributes.find((attribute: { key: string; }) => attribute.key === 'owner')
      .value || undefined;
  }

  static getSaleEventsFromLog(log: any) {
    return log.events.find((event: { type: string; }) => event.type === 'buy_nft');
  }

  static fromJson(json: any, log?: any) {
    const saleEvents = this.getSaleEventsFromLog(log);
    return new MsgBuyNft({
      json,
      type: json['@type'],
      seller: this.getSellerFromSaleEvents(saleEvents),
      buyer: json.creator,
      id: json.id,
      price: this.getPriceFromSaleEvents(saleEvents),
    });
  }
}

export default MsgBuyNft;
