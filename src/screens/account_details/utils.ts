import axios from 'axios';
import * as R from 'ramda';
import { toValidatorAddress } from '@utils/prefix_convert';
import {
  AccountCommissionDocument,
  AccountWithdrawalAddressDocument,
  AccountBalancesDocument,
  AccountDelegationBalanceDocument,
  AccountUnbondingBalanceDocument,
  AccountDelegationRewardsDocument,
} from '@graphql/account_actions';

import {
  CosmWasmInstantiateDocument,
} from '@graphql/cosmwasm';

export const fetchCommission = async (address: string) => {
  const defaultReturnValue = {
    commission: {
      coins: null,
    },
  };
  try {
    const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      variables: {
        validatorAddress: toValidatorAddress(address),
      },
      query: AccountCommissionDocument,
    });
    return R.pathOr(defaultReturnValue, ['data'], data);
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchAccountWithdrawalAddress = async (address: string) => {
  const defaultReturnValue = {
    withdrawalAddress: {
      address,
    },
  };
  try {
    const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      variables: {
        address,
      },
      query: AccountWithdrawalAddressDocument,
    });
    return R.pathOr(defaultReturnValue, ['data'], data);
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchAvailableBalances = async (address: string) => {
  const defaultReturnValue = {
    accountBalances: {
      coins: [],
    },
  };
  try {
    const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      variables: {
        address,
      },
      query: AccountBalancesDocument,
    });
    return R.pathOr(defaultReturnValue, ['data'], data);
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchDelegationBalance = async (address: string) => {
  const defaultReturnValue = {
    delegationBalance: {
      coins: [],
    },
  };
  try {
    const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      variables: {
        address,
      },
      query: AccountDelegationBalanceDocument,
    });
    return R.pathOr(defaultReturnValue, ['data'], data);
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchUnbondingBalance = async (address: string) => {
  const defaultReturnValue = {
    unbondingBalance: {
      coins: [],
    },
  };
  try {
    const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      variables: {
        address,
      },
      query: AccountUnbondingBalanceDocument,
    });
    return R.pathOr(defaultReturnValue, ['data'], data);
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchRewards = async (address: string) => {
  const defaultReturnValue = {
    delegationRewards: [],
  };
  try {
    const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      variables: {
        address,
      },
      query: AccountDelegationRewardsDocument,
    });
    return R.pathOr(defaultReturnValue, ['data'], data);
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchCosmWasmInstantiation = async (address: string) => {
  const defaultReturnValue = {
    admin: '',
    code_id: '',
    label: '',
    result_contract_address: '',
    sender: '',
    success: true,
  };
  try {
    const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      variables: {
        address,
      },
      query: CosmWasmInstantiateDocument,
    });
    return R.pathOr(defaultReturnValue, ['data', 'cosmwasm_instantiate', 0], data);
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchContractSchemasByAddress = async (address: string) => {
  const schemasTypes = ['query', 'execute'];

  let fetchedSourcesSchemas = [];
  
  try {
    for (let i = 0; i < schemasTypes.length; i++) {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_CONTRACTS_URL}/schema?type=${schemasTypes[i]}&address=${address}`);
      fetchedSourcesSchemas.push({ funcName: schemasTypes[i], data: data });
    }

    return fetchedSourcesSchemas;
  } catch (error) {
    return fetchedSourcesSchemas;
  }
};
