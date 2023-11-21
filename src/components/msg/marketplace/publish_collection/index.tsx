import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import {
  Name,
  RoyaltiesDetails,
} from '@components';
import { MsgPublishCollection } from '@models';

const PublishCollection = (props: {
  message: MsgPublishCollection;
}) => {
  const { message } = props;
  const { creator } = message;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txPublishCollection"
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

export default PublishCollection;
