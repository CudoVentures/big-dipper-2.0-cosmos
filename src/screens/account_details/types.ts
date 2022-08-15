export type OverviewType = {
  address: string;
  withdrawalAddress: string;
}

export type BalanceType = {
  available: TokenUnit;
  delegate: TokenUnit;
  unbonding: TokenUnit;
  reward: TokenUnit;
  commission?: TokenUnit;
  total: TokenUnit;
}

export type OtherTokenType = {
  denom: string;
  available: TokenUnit;
  reward: TokenUnit;
  commission: TokenUnit;
}

export type RewardsType = {
  [value:string]: TokenUnit[];
}

export type CosmwasmType = {
  admin: string;
  code_id: string,
  label: string,
  result_contract_address: string,
  sender: string,
  success: boolean,
  transaction: any
}

export type AccountDetailState = {
  loading: boolean;
  exists: boolean;
  desmosProfile: DesmosProfile | null;
  overview: OverviewType;
  balance: BalanceType;
  otherTokens: {
    data: OtherTokenType[];
    count: number;
  };
  rewards: RewardsType;
  cosmwasm: CosmwasmType;
  tab: number;
  contractSchemas: any[],
}
