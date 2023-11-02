import chainConfigTestnet from './chain_config.testnet.json';
import chainConfigMainnet from './chain_config.mainnet.json';
import chainConfigTemp from './chain_config_temp.json';
import generalConfig from './general_config.json';

/**
 * Helper function to return different configs based on the same chain
 * @returns config
 */
const getChainConfig = () => {
  if (!isTestnet()) {
    return chainConfigMainnet;
  }
  return chainConfigTestnet;
};

const isTestnet = (): boolean => {
  return getChainType() !== 'mainnet'
}

const getChainType = (): string => {
  return process.env.NEXT_PUBLIC_CHAIN_TYPE || process.env.NEXT_PUBLIC_CHAIN_STATUS;
}

enum AddressType {
  ETH = 'eth',
  CUDOS = 'cudos'
}

const chainConfig = getChainConfig();

export {
  chainConfig,
  generalConfig,
  chainConfigTemp,
  isTestnet,
  AddressType
};
