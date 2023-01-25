export type BaseCategories = 'bank' | 'crisis' | 'distribution' | 'governance' | 'slashing' | 'staking' | 'profiles' | 'ibc' | 'ibc-transfer' | 'authz' | 'feegrant' | 'vesting' | 'others'
export type CustomCategories = 'cosmwasm' | 'gravity' | 'addressbook' | 'marketplace'; // custom modules
export type Categories = BaseCategories | CustomCategories
export interface MintedNft {
  denomId: string;
  uid: string;
  uri: string;
  data: string;
  name: string;
  price: TokenUnit;
}
export interface AddressBookDetailsValue {
  network: string;
  label: string;
  value: string;
}
export interface Royalties {
  address: string;
  percent: string;
}
