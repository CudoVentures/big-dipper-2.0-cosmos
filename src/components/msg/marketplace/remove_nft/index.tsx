import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgRemoveNft } from '@models';

const RemoveNft = (props: {
  message: MsgRemoveNft;
}) => {
  const { message } = props;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txRemoveNft"
        components={[
          (
            <Name
              address={message.creator}
              name={message.creator}
            />
          ),
        ]}
        values={{
          id: message.id,
        }}
      />
    </Typography>
  );
};

export default RemoveNft;
