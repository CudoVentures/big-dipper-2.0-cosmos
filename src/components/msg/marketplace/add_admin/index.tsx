import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import {
  Name,
} from '@components';
import { MsgAddAdmin } from '@models';

const AddAdmin = (props: {
  message: MsgAddAdmin;
}) => {
  const { message } = props;
  const {
    creator, address,
  } = message;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txAddAdmin"
        components={[
          (
            <Name
              address={creator}
              name={creator}
            />
          ),
          (
            <Name
              address={address}
              name={address}
            />
          ),
        ]}
      />
    </Typography>
  );
};

export default AddAdmin;
