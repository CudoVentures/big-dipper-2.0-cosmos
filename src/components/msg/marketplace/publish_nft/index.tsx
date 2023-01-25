import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgPublishNft } from '@models';

const MintNft = (props: {
  message: MsgPublishNft;
}) => {
  const { message } = props;
  const {
    creator, price, denomId, tokenId,
  } = message;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txPublishNft"
        components={[
          (
            <Name
              address={creator}
              name={creator}
            />
          ),
        ]}
        values={{
          price: `${price.value} ${price.displayDenom}`,
          denomId,
          tokenId,
        }}
      />
    </Typography>
  );
};

export default MintNft;
