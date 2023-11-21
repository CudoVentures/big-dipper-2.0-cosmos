import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import {
  Name,
  NftDetails,
} from '@components';
import { MsgMintNft } from '@models';

const MintNft = (props: {
  message: MsgMintNft;
}) => {
  const { message } = props;
  const {
    creator, recipient, mintedNftData,
  } = message;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txMintNft"
        components={[
          (
            <Name
              address={creator}
              name={creator}
            />
          ),
          (
            <Name
              address={recipient}
              name={recipient}
            />
          ),
          (
            <NftDetails
              content={mintedNftData}
            />
          ),
        ]}
      />
    </Typography>
  );
};

export default MintNft;
