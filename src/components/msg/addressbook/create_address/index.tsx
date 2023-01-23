import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import {
  Name,
  AddressBookDetails,
} from '@components';
import { MsgCreateAddress } from '@models';

const CreateAddress = (props: {
  message: MsgCreateAddress;
}) => {
  const { message } = props;
  const { creator } = message;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txCreateAddress"
        components={[
          (
            <Name
              address={creator}
              name={creator}
            />
          ),
          (
            <AddressBookDetails
              content={{
                network: message.network,
                label: message.label,
                value: message.value,
              }}
            />
          ),
        ]}
      />
    </Typography>
  );
};

export default CreateAddress;
