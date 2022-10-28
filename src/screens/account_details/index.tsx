import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  Layout,
  LoadAndExist,
  DesmosProfile,
  ContractOverview,
  ContractMessages,
  TabPanel,
} from '@components';
import { NextSeo } from 'next-seo';
import {
  Tabs,
} from './components/staking/components';
import { useStyles } from './styles';
import {
  Overview,
  Balance,
  Staking,
  Transactions,
  OtherTokens,
  SimpleBalance,
  SmartContractInteraction,
} from './components';
import { useAccountDetails } from './hooks';

const AccountDetails = () => {
  const { t } = useTranslation('accounts');
  const classes = useStyles();
  const {
    state,
    handleTabChange,
  } = useAccountDetails();

  const isSmartContract = state.cosmwasm.result_contract_address === state.overview.address;

  let tabs = [
    {
      id: 0,
      key: 'transactions',
      component: (
        <Transactions
          className={classes.transactions}
          collateralTransactions={false}
        />
      ),
    },
    {
      id: 1,
      key: 'collateralTransactions',
      component: (
        <Transactions
          className={classes.transactions}
          collateralTransactions
        />
      ),
    },
  ];

  if (isSmartContract) {
    let querySchema = ''; let
      executeSchema = '';

    if (state.contractSchemas && state.contractSchemas.length > 0) {
      for (const schema of state.contractSchemas) {
        if (schema.funcName == 'query') {
          querySchema = schema.data;
        } else if (schema.funcName == 'execute') {
          executeSchema = schema.data;
        }
      }
    }

    tabs = [
      {
        id: 0,
        key: 'smartContractMessages',
        component: (
          <ContractMessages className={classes.transactions} address={state.cosmwasm.result_contract_address} />
        ),
      },
      {
        id: 1,
        key: 'smartContractInteraction',
        component: (
          <SmartContractInteraction
            address={state.cosmwasm.result_contract_address}
            querySchema={querySchema}
            executeSchema={executeSchema}
            rpcUrl={process.env.NEXT_PUBLIC_RPC_URL}
            chainID={process.env.NEXT_PUBLIC_CHAIN_ID}
            gasPrice={process.env.NEXT_PUBLIC_GAS_PRICE}
          />
        ),
      },
    ];
  }

  return (
    <>
      <NextSeo
        title={isSmartContract ? t('smartContractDetails') : t('accountDetails')}
        openGraph={{
          title: isSmartContract ? t('smartContractDetails') : t('accountDetails'),
        }}
      />
      <Layout navTitle={isSmartContract ? t('smartContractDetails') : t('accountDetails')}>
        <LoadAndExist
          loading={state.loading}
          exists={state.exists}
        >
          <span className={classes.root}>
            {!!state.desmosProfile && (
            <DesmosProfile
              dtag={state.desmosProfile.dtag}
              nickname={state.desmosProfile.nickname}
              imageUrl={state.desmosProfile.imageUrl}
              bio={state.desmosProfile.bio}
              connections={state.desmosProfile.connections}
              coverUrl={state.desmosProfile.coverUrl}
            />
            )}
            {isSmartContract
              ? (
                <ContractOverview
                  className={classes.overview}
                  address={state.cosmwasm.result_contract_address}
                  deployerAddress={state.cosmwasm.sender}
                  label={state.cosmwasm.label}
                  codeId={state.cosmwasm.code_id}
                  block={state.cosmwasm.transaction.block.height}
                />
              )
              : (
                <Overview
                  className={classes.overview}
                  withdrawalAddress={state.overview.withdrawalAddress}
                  address={state.overview.address}
                />
              )}
            {isSmartContract
              ? <SimpleBalance total={state.balance.total} />
              : (
                <Balance
                  className={classes.balance}
                  available={state.balance.available}
                  delegate={state.balance.delegate}
                  unbonding={state.balance.unbonding}
                  reward={state.balance.reward}
                  commission={state.balance.commission}
                  total={state.balance.total}
                />
              )}
            <OtherTokens
              className={classes.otherTokens}
              otherTokens={state.otherTokens}
            />
            {!isSmartContract
              && (
              <Staking
                className={classes.staking}
                rewards={state.rewards}
              />
              )}
            <>
              <Tabs
                tab={state.tab}
                handleTabChange={handleTabChange}
                tabs={tabs}
              />
              {tabs.map((x) => {
                return (
                  <TabPanel
                    key={x.id}
                    index={x.id}
                    value={state.tab}
                  >
                    {x.component}
                  </TabPanel>
                );
              })}
            </>
          </span>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default AccountDetails;
