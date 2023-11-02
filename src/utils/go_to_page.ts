import {
  AddressType, chainConfig, isTestnet,
} from '@configs';

export const HOME = '/';
export const BLOCKS = '/blocks';
export const BLOCK_DETAILS = (slot: string | number): string => `/blocks/${slot}`;
export const VALIDATOR_DETAILS = (address: string): string => `/validators/${address}`;
export const VALIDATORS = '/validators';
export const TRANSACTIONS = '/transactions';
export const TRANSACTION_DETAILS = (tx: string): string => `/transactions/${tx}`;
export const PROPOSALS = '/proposals';
export const PROPOSAL_DETAILS = (id: string | number): string => `/proposals/${id}`;
export const ACCOUNT_DETAILS = (address: string, addressType?: AddressType): string => {
  if (addressType && addressType === AddressType.ETH) {
    if (isTestnet()) {
      return `https://sepolia.etherscan.io/address/${address}`;
    }
    return `https://etherscan.io/address/${address}`;
  }
  return `/accounts/${address}`;
};
export const TOKEN_DETAILS = (address: string): string => `/token/${address}`;
export const PARAMS = '/params';
export const PROFILE_DETAILS = (dtag: string): string => `/${dtag}`;

/**
 * Helper to determine if we are routing to validator details or account details
 * @param address
 * @returns
 */
export const ADDRESS_DETAILS = (address: string, addressType?: AddressType) => (address.includes(chainConfig.prefix.validator)
  ? VALIDATOR_DETAILS(address) : ACCOUNT_DETAILS(address, addressType));
