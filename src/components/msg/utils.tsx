import * as MODELS from '@models';
import * as R from 'ramda';
import {
  Tag,
} from '@components';
import * as COMPONENTS from '@msg';

// eslint-disable-next-line no-shadow
export enum GroupMsgs {
  MsgCreateGroup = 'MsgCreateGroup',
  MsgUpdateGroupMembers = 'MsgUpdateGroupMembers',
  MsgUpdateGroupAdmin = 'MsgUpdateGroupAdmin',
  MsgUpdateGroupMetadata = 'MsgUpdateGroupMetadata',
  MsgCreateGroupPolicy = 'MsgCreateGroupPolicy',
  MsgCreateGroupWithPolicy = 'MsgCreateGroupWithPolicy',
  MsgUpdateGroupPolicyAdmin = 'MsgUpdateGroupPolicyAdmin',
  MsgUpdateGroupPolicyDecisionPolicy = 'MsgUpdateGroupPolicyDecisionPolicy',
  MsgUpdateGroupPolicyMetadata = 'MsgUpdateGroupPolicyMetadata',
  MsgSubmitProposal = 'MsgSubmitProposal',
  MsgWithdrawProposal = 'MsgWithdrawProposal',
  MsgVote = 'MsgVote',
  MsgExec = 'MsgExec',
  MsgLeaveGroup = 'MsgLeaveGroup'
}

const getDataByType = (type: string) => {
  // =====================================
  // DO NOT UPDATE IF THIS IS A FORK.
  // ONLY COSMOS SDK DEFAULT MESSAGES HERE.
  // Please use `customTypeToModel` below for custom message types
  // =====================================
  const defaultTypeToModel = {
    // ========================
    // staking
    // ========================
    '/cosmos.staking.v1beta1.MsgDelegate': {
      model: MODELS.MsgDelegate,
      content: COMPONENTS.Delegate,
      tagTheme: 'one',
      tagDisplay: 'txDelegateLabel',
    },
    '/cosmos.staking.v1beta1.MsgBeginRedelegate': {
      model: MODELS.MsgRedelegate,
      content: COMPONENTS.Redelegate,
      tagTheme: 'one',
      tagDisplay: 'txRedelegateLabel',
    },
    '/cosmos.staking.v1beta1.MsgUndelegate': {
      model: MODELS.MsgUndelegate,
      content: COMPONENTS.Undelegate,
      tagTheme: 'one',
      tagDisplay: 'txUndelegateLabel',
    },
    '/cosmos.staking.v1beta1.MsgCreateValidator': {
      model: MODELS.MsgCreateValidator,
      content: COMPONENTS.CreateValidator,
      tagTheme: 'one',
      tagDisplay: 'txCreateValidatorLabel',
    },
    '/cosmos.staking.v1beta1.MsgEditValidator': {
      model: MODELS.MsgEditValidator,
      content: COMPONENTS.EditValidator,
      tagTheme: 'one',
      tagDisplay: 'txEditValidatorLabel',
    },
    // ========================
    // bank
    // ========================
    '/cosmos.bank.v1beta1.MsgSend': {
      model: MODELS.MsgSend,
      content: COMPONENTS.Send,
      tagTheme: 'two',
      tagDisplay: 'txSendLabel',
    },
    '/cosmos.bank.v1beta1.MsgMultiSend': {
      model: MODELS.MsgMultiSend,
      content: COMPONENTS.Multisend,
      tagTheme: 'two',
      tagDisplay: 'txMultisendLabel',
    },
    // ========================
    // crisis
    // ========================
    '/cosmos.crisis.v1beta1.MsgVerifyInvariant': {
      model: MODELS.MsgVerifyInvariant,
      content: COMPONENTS.VerifyInvariant,
      tagTheme: 'three',
      tagDisplay: 'txVerifyInvariantLabel',
    },
    // ========================
    // slashing
    // ========================
    '/cosmos.slashing.v1beta1.MsgUnjail': {
      model: MODELS.MsgUnjail,
      content: COMPONENTS.Unjail,
      tagTheme: 'five',
      tagDisplay: 'txUnjailLabel',
    },
    // ========================
    // distribution
    // ========================
    '/cosmos.distribution.v1beta1.MsgFundCommunityPool': {
      model: MODELS.MsgFundCommunityPool,
      content: COMPONENTS.Fund,
      tagTheme: 'six',
      tagDisplay: 'txFundLabel',
    },
    '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress': {
      model: MODELS.MsgSetWithdrawAddress,
      content: COMPONENTS.SetWithdrawalAddress,
      tagTheme: 'six',
      tagDisplay: 'txsetRewardAddressLabel',
    },
    '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward': {
      model: MODELS.MsgWithdrawDelegatorReward,
      content: COMPONENTS.WithdrawReward,
      tagTheme: 'six',
      tagDisplay: 'txWithdrawRewardLabel',
    },
    '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission': {
      model: MODELS.MsgWithdrawValidatorCommission,
      content: COMPONENTS.WithdrawCommission,
      tagTheme: 'six',
      tagDisplay: 'txWithdrawCommissionLabel',
    },
    // ========================
    // governance
    // ========================
    '/cosmos.gov.v1beta1.MsgDeposit': {
      model: MODELS.MsgDeposit,
      content: COMPONENTS.DepositProposal,
      tagTheme: 'seven',
      tagDisplay: 'txDepositLabel',
    },
    '/cosmos.gov.v1beta1.MsgVote': {
      model: MODELS.MsgVote,
      content: COMPONENTS.Vote,
      tagTheme: 'seven',
      tagDisplay: 'txVoteLabel',
    },
    '/cosmos.gov.v1beta1.MsgSubmitProposal': {
      model: MODELS.MsgSubmitProposal,
      content: COMPONENTS.SubmitProposal,
      tagTheme: 'seven',
      tagDisplay: 'txSubmitProposalLabel',
    },
    // ========================
    // ibc client
    // ========================
    '/ibc.core.client.v1.MsgCreateClient': {
      model: MODELS.MsgCreateClient,
      content: COMPONENTS.CreateClient,
      tagTheme: 'nine',
      tagDisplay: 'txCreateClientLabel',
    },
    '/ibc.core.client.v1.MsgUpdateClient': {
      model: MODELS.MsgUpdateClient,
      content: COMPONENTS.UpdateClient,
      tagTheme: 'nine',
      tagDisplay: 'txUpdateClientLabel',
    },
    '/ibc.core.client.v1.MsgUpgradeClient': {
      model: MODELS.MsgUpgradeClient,
      content: COMPONENTS.UpgradeClient,
      tagTheme: 'nine',
      tagDisplay: 'txUpgradeClientLabel',
    },
    '/ibc.core.client.v1.MsgSubmitMisbehaviour': {
      model: MODELS.MsgSubmitMisbehaviour,
      content: COMPONENTS.SubmitMisbehaviour,
      tagTheme: 'nine',
      tagDisplay: 'txSubmitMisbehaviourLabel',
    },
    '/ibc.core.client.v1.Height': {
      model: MODELS.MsgHeight,
      content: COMPONENTS.Height,
      tagTheme: 'nine',
      tagDisplay: 'txHeightLabel',
    },
    // ========================
    // ibc channel
    // ========================
    '/ibc.core.channel.v1.MsgRecvPacket': {
      model: MODELS.MsgReceivePacket,
      content: COMPONENTS.ReceivePacket,
      tagTheme: 'nine',
      tagDisplay: 'txRecvPacketLabel',
    },
    '/ibc.core.channel.v1.Channel': {
      model: MODELS.MsgChannel,
      content: COMPONENTS.Channel,
      tagTheme: 'nine',
      tagDisplay: 'txChannelLabel',
    },
    '/ibc.core.channel.v1.Counterparty': {
      model: MODELS.MsgCounterpartyChannel,
      content: COMPONENTS.CounterpartyChannel,
      tagTheme: 'nine',
      tagDisplay: 'txCounterpartyLabel',
    },
    '/ibc.core.channel.v1.Packet': {
      model: MODELS.MsgPacket,
      content: COMPONENTS.Packet,
      tagTheme: 'nine',
      tagDisplay: 'txPacketLabel',
    },
    '/ibc.core.channel.v1.MsgAcknowledgement': {
      model: MODELS.MsgAcknowledgement,
      content: COMPONENTS.Acknowledgement,
      tagTheme: 'nine',
      tagDisplay: 'txAcknowledgementLabel',
    },
    '/ibc.core.channel.v1.MsgChannelCloseConfirm': {
      model: MODELS.MsgChannelCloseConfirm,
      content: COMPONENTS.ChannelCloseConfirm,
      tagTheme: 'nine',
      tagDisplay: 'txChannelCloseConfirmLabel',
    },
    '/ibc.core.channel.v1.MsgChannelCloseInit': {
      model: MODELS.MsgChannelCloseInit,
      content: COMPONENTS.ChannelCloseInit,
      tagTheme: 'nine',
      tagDisplay: 'txChannelCloseInitLabel',
    },
    '/ibc.core.channel.v1.MsgChannelOpenAck': {
      model: MODELS.MsgChannelOpenAck,
      content: COMPONENTS.ChannelOpenAck,
      tagTheme: 'nine',
      tagDisplay: 'txChannelOpenAckLabel',
    },
    '/ibc.core.channel.v1.MsgChannelOpenConfirm': {
      model: MODELS.MsgChannelOpenConfirm,
      content: COMPONENTS.ChannelOpenConfirm,
      tagTheme: 'nine',
      tagDisplay: 'txChannelOpenConfirmLabel',
    },
    '/ibc.core.channel.v1.MsgChannelOpenInit': {
      model: MODELS.MsgChannelOpenInit,
      content: COMPONENTS.ChannelOpenInit,
      tagTheme: 'nine',
      tagDisplay: 'txChannelOpenInitLabel',
    },
    '/ibc.core.channel.v1.MsgChannelOpenTry': {
      model: MODELS.MsgChannelOpenTry,
      content: COMPONENTS.ChannelOpenTry,
      tagTheme: 'nine',
      tagDisplay: 'txChannelOpenTryLabel',
    },
    '/ibc.core.channel.v1.MsgTimeout': {
      model: MODELS.MsgTimeout,
      content: COMPONENTS.Timeout,
      tagTheme: 'nine',
      tagDisplay: 'txTimeoutLabel',
    },
    '/ibc.core.channel.v1.MsgTimeoutOnClose': {
      model: MODELS.MsgTimeoutOnClose,
      content: COMPONENTS.TimeoutOnClose,
      tagTheme: 'nine',
      tagDisplay: 'txTimeoutOnCloseLabel',
    },
    // ========================
    // ibc connection
    // ========================
    '/ibc.core.connection.v1.MsgConnectionOpenAck': {
      model: MODELS.MsgConnectionOpenAck,
      content: COMPONENTS.ConnectionOpenAck,
      tagTheme: 'nine',
      tagDisplay: 'txConnectionOpenAckLabel',
    },
    '/ibc.core.connection.v1.MsgConnectionOpenConfirm': {
      model: MODELS.MsgConnectionOpenConfirm,
      content: COMPONENTS.ConnectionOpenConfirm,
      tagTheme: 'nine',
      tagDisplay: 'txConnectionOpenConfirmLabel',
    },
    '/ibc.core.connection.v1.MsgConnectionOpenInit': {
      model: MODELS.MsgConnectionOpenInit,
      content: COMPONENTS.ConnectionOpenInit,
      tagTheme: 'nine',
      tagDisplay: 'txConnectionOpenInitLabel',
    },
    '/ibc.core.connection.v1.MsgConnectionOpenTry': {
      model: MODELS.MsgConnectionOpenTry,
      content: COMPONENTS.ConnectionOpenTry,
      tagTheme: 'nine',
      tagDisplay: 'txConnectionOpenTryLabel',
    },
    '/ibc.core.connection.v1.ConnectionEnd': {
      model: MODELS.MsgConnectionEnd,
      content: COMPONENTS.ConnectionEnd,
      tagTheme: 'nine',
      tagDisplay: 'txConnectionEndLabel',
    },
    '/ibc.core.connection.v1.Counterparty': {
      model: MODELS.MsgCounterpartyConnection,
      content: COMPONENTS.CounterpartyConnection,
      tagTheme: 'nine',
      tagDisplay: 'txCounterpartyLabel',
    },
    '/ibc.core.connection.v1.Version': {
      model: MODELS.MsgVersion,
      content: COMPONENTS.Version,
      tagTheme: 'nine',
      tagDisplay: 'txVersionLabel',
    },
    // ========================
    // ibc transfer
    // ========================
    '/ibc.applications.transfer.v1.MsgTransfer': {
      model: MODELS.MsgTransfer,
      content: COMPONENTS.Transfer,
      tagTheme: 'ten',
      tagDisplay: 'txTransferLabel',
    },
    // ========================
    // authz
    // ========================
    '/cosmos.authz.v1beta1.MsgGrant': {
      model: MODELS.MsgGrant,
      content: COMPONENTS.Grant,
      tagTheme: 'thirteen',
      tagDisplay: 'MsgGrant',
    },
    '/cosmos.authz.v1beta1.MsgRevoke': {
      model: MODELS.MsgRevoke,
      content: COMPONENTS.Revoke,
      tagTheme: 'thirteen',
      tagDisplay: 'MsgRevoke',
    },
    // ========================
    // feegrant
    // ========================
    '/cosmos.feegrant.v1beta1.MsgGrantAllowance': {
      model: MODELS.MsgGrantAllowance,
      content: COMPONENTS.GrantAllowance,
      tagTheme: 'fourteen',
      tagDisplay: 'MsgGrantAllowance',
    },
    '/cosmos.feegrant.v1beta1.MsgRevokeAllowance': {
      model: MODELS.MsgRevokeAllowance,
      content: COMPONENTS.RevokeAllowance,
      tagTheme: 'fourteen',
      tagDisplay: 'MsgRevokeAllowance',
    },
    // ========================
    // vesting
    // ========================
    '/cosmos.vesting.v1beta1.MsgCreateVestingAccount': {
      model: MODELS.MsgCreateVestingAccount,
      content: COMPONENTS.CreateVestingAccount,
      tagTheme: 'fifteen',
      tagDisplay: 'MsgCreateVestingAccount',
    },
    '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount': {
      model: MODELS.MsgCreatePeriodicVestingAccount,
      content: COMPONENTS.CreatePeriodicVestingAccount,
      tagTheme: 'fifteen',
      tagDisplay: 'MsgCreatePeriodicVestingAccount',
    },
  };

  // =====================================
  // Update your chain's message types here
  // =====================================
  const customTypeToModel = {
    // ========================
    // profiles
    // ========================
    '/desmos.profiles.v1beta1.MsgSaveProfile': {
      model: MODELS.MsgSaveProfile,
      content: COMPONENTS.SaveProfile,
      tagTheme: 'four',
      tagDisplay: 'txSaveProfileLabel',
    },
    '/desmos.profiles.v1beta1.MsgDeleteProfile': {
      model: MODELS.MsgDeleteProfile,
      content: COMPONENTS.DeleteProfile,
      tagTheme: 'four',
      tagDisplay: 'txDeleteProfileLabel',
    },
    '/desmos.profiles.v1beta1.MsgCreateRelationship': {
      model: MODELS.MsgCreateRelationship,
      content: COMPONENTS.CreateRelationship,
      tagTheme: 'four',
      tagDisplay: 'txCreateRelationshipLabel',
    },
    '/desmos.profiles.v1beta1.MsgRequestDTagTransfer': {
      model: MODELS.MsgDtagTransferRequest,
      content: COMPONENTS.DtagTransferRequest,
      tagTheme: 'four',
      tagDisplay: 'txRequestDTagTransferLabel',
    },
    '/desmos.profiles.v1beta1.MsgAcceptDTagTransfer': {
      model: MODELS.MsgDtagAcceptTransfer,
      content: COMPONENTS.DtagAcceptTransfer,
      tagTheme: 'four',
      tagDisplay: 'txAcceptDTagTransferLabel',
    },
    '/desmos.profiles.v1beta1.MsgCancelDTagTransfer': {
      model: MODELS.MsgDtagCancelTransfer,
      content: COMPONENTS.DtagCancelTransfer,
      tagTheme: 'four',
      tagDisplay: 'txCancelDTagTransferLabel',
    },
    '/desmos.profiles.v1beta1.MsgRefuseDTagTransfer': {
      model: MODELS.MsgDtagRefuseTransfer,
      content: COMPONENTS.DtagRefuseTransfer,
      tagTheme: 'four',
      tagDisplay: 'txRefuseDTagTransferLabel',
    },
    '/desmos.profiles.v1beta1.MsgBlockUser': {
      model: MODELS.MsgBlockUser,
      content: COMPONENTS.BlockUser,
      tagTheme: 'four',
      tagDisplay: 'txBlockUserLabel',
    },
    '/desmos.profiles.v1beta1.MsgUnblockUser': {
      model: MODELS.MsgUnblockUser,
      content: COMPONENTS.UnBlockUser,
      tagTheme: 'four',
      tagDisplay: 'txUnblockUserLabel',
    },
    // ========================
    // CosmWasm
    // ========================
    '/cosmwasm.wasm.v1.MsgStoreCode': {
      model: MODELS.MsgStoreCode,
      content: COMPONENTS.StoreCode,
      tagTheme: 'eleven',
      tagDisplay: 'txStoreCode',
    },
    '/cosmwasm.wasm.v1.MsgInstantiateContract': {
      model: MODELS.MsgInstantiateContract,
      content: COMPONENTS.InstantiateContract,
      tagTheme: 'eleven',
      tagDisplay: 'txInstantiateContract',
    },
    '/cosmwasm.wasm.v1.MsgExecuteContract': {
      model: MODELS.MsgExecuteContract,
      content: COMPONENTS.ExecuteContract,
      tagTheme: 'eleven',
      tagDisplay: 'txExecuteContract',
    },
    '/cosmwasm.wasm.v1.MsgMigrateContract': {
      model: MODELS.MsgMigrateContract,
      content: COMPONENTS.MigrateContract,
      tagTheme: 'eleven',
      tagDisplay: 'txMigrateContract',
    },
    '/cosmwasm.wasm.v1.MsgUpdateAdmin': {
      model: MODELS.MsgUpdateContractAdmin,
      content: COMPONENTS.UpdateContractAdmin,
      tagTheme: 'eleven',
      tagDisplay: 'txUpdateContractAdmin',
    },
    '/cosmwasm.wasm.v1.MsgClearAdmin': {
      model: MODELS.MsgClearContractAdmin,
      content: COMPONENTS.ClearContractAdmin,
      tagTheme: 'eleven',
      tagDisplay: 'txClearContractAdmin',
    },
    // ========================
    // Gravity
    // ========================
    '/gravity.v1.MsgSetMinFeeTransferToEth': {
      model: MODELS.MsgUnknown,
      content: COMPONENTS.Unknown,
      tagTheme: 'four',
      tagDisplay: 'txMsgSetMinFeeTransferToEth',
    },
    '/gravity.v1.MsgSendToCosmosClaim': {
      model: MODELS.MsgSendToCosmosClaim,
      content: COMPONENTS.SendToCosmos,
      tagTheme: 'four',
      tagDisplay: 'MsgSendToCosmosClaim',
    },
    '/gravity.v1.MsgSendToEth': {
      model: MODELS.MsgSendToEth,
      content: COMPONENTS.SendToEth,
      tagTheme: 'four',
      tagDisplay: 'MsgSendToEth',
    },
    '/gravity.v1.MsgCancelSendToEth': {
      model: MODELS.MsgCancelSendToEth,
      content: COMPONENTS.CancelSendToEth,
      tagTheme: 'four',
      tagDisplay: 'MsgCancelSendToEth',
    },
    // ========================
    // Addressbook
    // ========================
    '/cudoventures.cudosnode.addressbook.MsgCreateAddress': {
      model: MODELS.MsgCreateAddress,
      content: COMPONENTS.CreateAddress,
      tagTheme: 'twentyOne',
      tagDisplay: 'txCreateAddress',
    },
    '/cudoventures.cudosnode.addressbook.MsgUpdateAddress': {
      model: MODELS.MsgUpdateAddress,
      content: COMPONENTS.UpdateAddress,
      tagTheme: 'twentyOne',
      tagDisplay: 'txUpdateAddress',
    },
    '/cudoventures.cudosnode.addressbook.MsgDeleteAddress': {
      model: MODELS.MsgDeleteAddress,
      content: COMPONENTS.DeleteAddress,
      tagTheme: 'twentyOne',
      tagDisplay: 'txCreateCollection',
    },
    // ========================
    // Marketplace
    // ========================
    '/cudoventures.cudosnode.marketplace.MsgCreateCollection': {
      model: MODELS.MsgCreateCollection,
      content: COMPONENTS.CreateCollection,
      tagTheme: 'twentyTwo',
      tagDisplay: 'txCreateCollection',
    },
    '/cudoventures.cudosnode.marketplace.MsgPublishCollection': {
      model: MODELS.MsgPublishCollection,
      content: COMPONENTS.PublishCollection,
      tagTheme: 'twentyTwo',
      tagDisplay: 'txPublishCollection',
    },
    '/cudoventures.cudosnode.marketplace.MsgVerifyCollection': {
      model: MODELS.MsgVerifyCollection,
      content: COMPONENTS.VerifyCollection,
      tagTheme: 'twentyTwo',
      tagDisplay: 'txPublishCollection',
    },
    '/cudoventures.cudosnode.marketplace.MsgUnverifyCollection': {
      model: MODELS.MsgUnverifyCollection,
      content: COMPONENTS.UnverifyCollection,
      tagTheme: 'twentyTwo',
      tagDisplay: 'txUnverifyCollection',
    },
    '/cudoventures.cudosnode.marketplace.MsgAddAdmin': {
      model: MODELS.MsgAddAdmin,
      content: COMPONENTS.AddAdmin,
      tagTheme: 'twentyTwo',
      tagDisplay: 'txAddAdmin',
    },
    '/cudoventures.cudosnode.marketplace.MsgMintNft': {
      model: MODELS.MsgMintNft,
      content: COMPONENTS.MintNft,
      tagTheme: 'twentyTwo',
      tagDisplay: 'txMintNft',
    },
    '/cudoventures.cudosnode.marketplace.MsgPublishNft': {
      model: MODELS.MsgPublishNft,
      content: COMPONENTS.PublishNft,
      tagTheme: 'twentyTwo',
      tagDisplay: 'txPublishNft',
    },
    '/cudoventures.cudosnode.marketplace.MsgRemoveNft': {
      model: MODELS.MsgRemoveNft,
      content: COMPONENTS.RemoveNft,
      tagTheme: 'twentyTwo',
      tagDisplay: 'txRemoveNft',
    },
    '/cudoventures.cudosnode.marketplace.MsgUpdatePrice': {
      model: MODELS.MsgUpdatePrice,
      content: COMPONENTS.UpdatePrice,
      tagTheme: 'twentyTwo',
      tagDisplay: 'txUpdatePrice',
    },
    '/cudoventures.cudosnode.marketplace.MsgUpdateRoyalties': {
      model: MODELS.MsgUpdateRoyalties,
      content: COMPONENTS.UpdateRoyalties,
      tagTheme: 'twentyTwo',
      tagDisplay: 'txUpdateRoyalties',
    },
    '/cudoventures.cudosnode.marketplace.MsgBuyNft': {
      model: MODELS.MsgBuyNft,
      content: COMPONENTS.BuyNft,
      tagTheme: 'twentyTwo',
      tagDisplay: 'txBuyNft',
    },
    '/cudoventures.cudosnode.marketplace.MsgRemoveAdmin': {
      model: MODELS.MsgRemoveAdmin,
      content: COMPONENTS.RemoveAdmin,
      tagTheme: 'twentyTwo',
      tagDisplay: 'txRemoveAdmin',
    },
    // ========================
    // Group
    // ========================
    ...getGoupType(GroupMsgs.MsgCreateGroup, 'MsgCreateGroup'),
    ...getGoupType(GroupMsgs.MsgCreateGroupPolicy, 'MsgCreateGroup'),
    ...getGoupType(GroupMsgs.MsgCreateGroupWithPolicy, 'MsgCreateGroupWithPolicy'),
    ...getGoupType(GroupMsgs.MsgExec, 'MsgCreateGroupWithPolicy'),
    ...getGoupType(GroupMsgs.MsgLeaveGroup, 'MsgLeaveGroup'),
    ...getGoupType(GroupMsgs.MsgSubmitProposal, 'MsgSubmitProposal'),
    ...getGoupType(GroupMsgs.MsgUpdateGroupAdmin, 'MsgUpdateGroupAdmin'),
    ...getGoupType(GroupMsgs.MsgUpdateGroupMembers, 'MsgUpdateGroupMembers'),
    ...getGoupType(GroupMsgs.MsgUpdateGroupMetadata, 'MsgUpdateGroupMetadata'),
    ...getGoupType(GroupMsgs.MsgUpdateGroupPolicyAdmin, 'MsgUpdateGroupPolicyAdmin'),
    ...getGoupType(GroupMsgs.MsgUpdateGroupPolicyDecisionPolicy, 'MsgUpdateGroupPolicyDecisionPolicy'),
    ...getGoupType(GroupMsgs.MsgUpdateGroupPolicyMetadata, 'MsgUpdateGroupPolicyMetadata'),
    ...getGoupType(GroupMsgs.MsgVote, 'MsgVote'),
    ...getGoupType(GroupMsgs.MsgWithdrawProposal, 'MsgWithdrawProposal'),
  };

  if (defaultTypeToModel[type]) return defaultTypeToModel[type];
  if (customTypeToModel[type]) return customTypeToModel[type];
  return null;
};

/**
 * Helper function that helps get model by type
 * @param type Model type
 */
export const getMessageModelByType = (type: string) => {
  const data = getDataByType(type);
  if (data) {
    return data.model;
  }

  return MODELS.MsgUnknown;
};

/**
 * Helper function to correctly display the correct UI
 * @param type Model type
 */
export const getMessageByType = (message: any, viewRaw: boolean, t: any) => {
  const { type } = message;
  let results: {
    content: any;
    tagDisplay: string;
    tagTheme?: TagTheme;
    unknown?: boolean;
  } = {
    content: COMPONENTS.Unknown,
    tagDisplay: 'txUnknownLabel',
    tagTheme: 'zero',
  };

  const data = getDataByType(type);

  if (data) {
    results = {
      content: data?.content,
      tagDisplay: data.tagDisplay,
      tagTheme: data.tagTheme,
    };
  }

  // If user asks to view the raw data
  if (viewRaw || !results.content) {
    results.content = COMPONENTS.Unknown;
  }

  return {
    type: <Tag
      value={t(`message_labels:${results.tagDisplay}`)}
      theme={results.tagTheme}
    />,
    message: <results.content message={message as any} />,
  };
};

export const convertMsgsToModels = (transaction: any) => {
  const messages = R.pathOr([], ['messages'], transaction).map((msg, i) => {
    const model = getMessageModelByType(msg?.['@type']);
    if (model === MODELS.MsgWithdrawDelegatorReward
      || model === MODELS.MsgWithdrawValidatorCommission
      || model === MODELS.MsgInstantiateContract
      || model === MODELS.MsgVerifyCollection
      || model === MODELS.MsgUnverifyCollection
      || model === MODELS.MsgBuyNft) {
      const log = R.pathOr(null, ['logs', i], transaction);
      return model.fromJson(msg, log);
    }
    return model.fromJson(msg);
  });

  return messages;
};

export const getGoupType = (msgType: keyof typeof GroupMsgs, tagDisplay: string): {
  [key: string]: { model: any, content: any, tagTheme: string, tagDisplay: string }
} => {
  const typeUrl = `cosmos.group.v1.${msgType}`;
  const baseUrl = `/${typeUrl}`;
  console.log(baseUrl)
  return {
    [baseUrl]: {
      model: MODELS.MsgUnknown,
      content: COMPONENTS.Unknown,
      tagTheme: 'twentyThree',
      tagDisplay,
    },
  };
};
