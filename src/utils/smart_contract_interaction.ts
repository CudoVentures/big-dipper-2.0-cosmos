import {
  SigningCosmWasmClient, CosmWasmClient,
} from 'cudosjs';
import { GasPrice } from '@cosmjs/stargate';

export const connectWasmQueryClient = async (rpcUrl: string) => {
  return CosmWasmClient.connect(rpcUrl);
};

export const connectWasmSigningClient = async (chainID: string,
  rpcUrl: string, gasPrice: string) => {
  await (window as any).keplr.enable(chainID);

  const offlineSigner = (window as any).getOfflineSigner(chainID);

  return SigningCosmWasmClient.connectWithSigner(rpcUrl, offlineSigner, {
    gasPrice: GasPrice.fromString(gasPrice),
  });
};

export const getAccount = async (chainID: string) => {
  const offlineSigner = (window as any).getOfflineSigner(chainID);
  return (await offlineSigner.getAccounts())[0];
};

export const getQueryFunc = (client: CosmWasmClient, address: string) => {
  return (query: string) => {
    return new Promise<string>((resolve, reject) => {
      client.queryContractSmart(address, JSON.parse(query)).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  };
};

export const getExecuteFunc = (client: SigningCosmWasmClient, address: string) => {
  return (senderAddress: string, msg: string) => {
    return new Promise<string>((resolve, reject) => {
      client.execute(senderAddress, address, JSON.parse(msg), 'auto', 'Sent with CUDOS Explorer').then((result) => {
        resolve(JSON.stringify(result));
      }).catch((error) => {
        reject(error);
      });
    });
  };
};
