const LEGACY_PROPOSAL_TYPE = '/cosmos.gov.v1.MsgExecLegacyContent';

const OmitFields = {
  description: 'description',
  title: 'title',
  authority: 'authority',
};

type OmitKeys = keyof typeof OmitFields;

const omitKeys = <T extends Record<string, unknown>>(obj: T, keys: OmitKeys[]): Omit<T, OmitKeys> => {
  const res = { ...obj };
  keys.forEach((key) => {
    delete res[key as keyof T];
  });
  return res as Omit<T, OmitKeys>;
};

export const getProposalType = (proposalType: string) => {
  let type = proposalType;
  if (proposalType === '/cosmos.gov.v1beta1.TextProposal') {
    type = 'textProposal';
  }

  if (proposalType === '/ibc.core.client.v1.UpgradeProposal') {
    type = 'IbcUpgradeProposal';
  }

  if (proposalType === '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal') {
    type = 'communityPoolSpendProposal';
  }

  if (proposalType === '/ibc.core.client.v1.ClientUpdateProposal') {
    type = 'IbcClientUpdateProposal';
  }

  if (proposalType === '/cosmos.params.v1beta1.ParameterChangeProposal') {
    type = 'parameterChangeProposal';
  }

  if (proposalType === '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal') {
    type = 'softwareUpgradeProposal';
  }

  if (proposalType === '/cosmos.upgrade.v1beta1.CommunityPoolSpendProposal') {
    type = 'communityPoolSpendProposal';
  }

  return type;
};

export const shouldShowData = (status: string) => (
  [
    'PROPOSAL_STATUS_VOTING_PERIOD',
    'PROPOSAL_STATUS_PASSED',
    'PROPOSAL_STATUS_REJECTED',
    'PROPOSAL_STATUS_FAILED',
  ].includes(status)
);

const isLegacyProposal = (content: any): boolean => {
  const contentType: string = content['@type'];
  if (contentType) {
    return contentType === LEGACY_PROPOSAL_TYPE;
  }
  return false;
};

export const getProposalContentString = (content: any): string | null => {
  if (!content.length) {
    return null;
  }

  let contentObject = content;
  if (isLegacyProposal(contentObject[0])) {
    contentObject = omitKeys(contentObject[0].content, Object.keys(OmitFields) as OmitKeys[]);
  }

  return JSON.stringify(contentObject, null, 2);
};
