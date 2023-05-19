/* eslint-disable max-len */
import * as R from 'ramda';
import numeral from 'numeral';
import {
  useRecoilState,
  SetterOrUpdater,
} from 'recoil';
import {
  useMarketDataQuery,
  MarketDataQuery,
} from '@graphql/types';
import { chainConfig } from '@configs';
import {
  writeMarket,
} from '@recoil/market';
import { AtomState } from '@recoil/market/types';
import { formatToken } from '@utils/format_token';
import Big from 'big.js';

export const useMarketRecoil = () => {
  const [market, setMarket] = useRecoilState(writeMarket) as [AtomState, SetterOrUpdater<AtomState>];

  useMarketDataQuery(
    {
      variables: {
        denom: chainConfig?.tokenUnits[chainConfig.primaryTokenUnit]?.display.toLowerCase(),
      },
      onCompleted: (data) => {
        if (data) {
          setMarket(formatUseChainIdQuery(data));
        }
      },
    },
  );

  const formatUseChainIdQuery = (data: MarketDataQuery): AtomState => {
    let {
      communityPool, price,
    } = market;

    if (data?.tokenPrice?.length) {
      price = numeral(numeral(data?.tokenPrice[0]?.price).format('0.[00]', Math.floor)).value();
    }

    const [communityPoolCoin] = R.pathOr([], ['communityPool', 0, 'coins'], data).filter((x) => x.denom === chainConfig.primaryTokenUnit);
    const inflation = R.pathOr(0, ['inflation', 0, 'value'], data);
    const apr = R.pathOr(0, ['apr', 0, 'value'], data);

    const rawSupplyAmount = R.pathOr(0, ['adjustedSupply', 0, 'value'], data);

    const supply = formatToken(
      rawSupplyAmount,
      chainConfig.primaryTokenUnit,
    );

    if (communityPoolCoin) {
      communityPool = formatToken(communityPoolCoin.amount, communityPoolCoin.denom);
    }

    let adjustedMarketCap = 0;
    if (
      data?.tokenPrice[0]?.price
      && rawSupplyAmount
      && supply.exponent
    ) {
      adjustedMarketCap = Big(rawSupplyAmount)
        .div(new Big(10).pow(supply.exponent))
        .times(data?.tokenPrice[0]?.price)
        .toNumber();
    }

    return ({
      price,
      supply,
      marketCap: adjustedMarketCap,
      inflation,
      communityPool,
      apr,
    });
  };
};
