import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import {
  Name,
  RoyaltiesDetails,
} from '@components';
import { MsgUpdateRoyalties } from '@models';

const UpdateRoyalties = (props: {
  message: MsgUpdateRoyalties;
}) => {
  const { message } = props;
  const { creator } = message;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txUpdateRoyalties"
        components={[
          (
            <Name
              address={creator}
              name={creator}
            />
          ),
          (
            <RoyaltiesDetails
              type="Mint"
              royalties={message.mintRoyalties}
            />
          ),
          (
            <RoyaltiesDetails
              type="Resale"
              royalties={message.resaleRoyalties}
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

export default UpdateRoyalties;
