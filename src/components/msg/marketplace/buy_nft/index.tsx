import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgBuyNft } from '@models';

const BuyNft = (props: {
  message: MsgBuyNft;
}) => {
  const { message } = props;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txBuyNft"
        components={[
          (
            <Name
              address={message.buyer}
              name={message.buyer}
            />
          ),
          (
            <Name
              address={message.seller}
              name={message.seller}
            />
          ),
        ]}
        values={{
          price: `${message.price.value} ${message.price.displayDenom}`,
          id: message.id,
        }}
      />
    </Typography>
  );
};

export default BuyNft;
