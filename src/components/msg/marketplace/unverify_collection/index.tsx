import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import {
  Name,
} from '@components';
import { MsgUnverifyCollection } from '@models';

const UnverifyCollection = (props: {
  message: MsgUnverifyCollection;
}) => {
  const { message } = props;
  const {
    creator, admin,
  } = message;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txUnverifyCollection"
        components={[
          (
            <Name
              address={creator}
              name={creator}
            />
          ),
          (
            <Name
              address={admin}
              name={admin}
            />
          ),
        ]}
        values={{
          collectionId: message.collectionId,
        }}
      />
    </Typography>
  );
};

export default UnverifyCollection;
