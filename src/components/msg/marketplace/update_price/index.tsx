import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgUpdatePrice } from '@models';

const UpdatePrice = (props: {
  message: MsgUpdatePrice;
}) => {
  const { message } = props;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txUpdatePrice"
        components={[
          (
            <Name
              address={message.creator}
              name={message.creator}
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

export default UpdatePrice;
