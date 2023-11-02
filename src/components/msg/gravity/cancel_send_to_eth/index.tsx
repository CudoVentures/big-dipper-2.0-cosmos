import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import {
  useProfileRecoil,
} from '@recoil/profiles';
import MsgCancelSendToEth from '@src/models/msg/gravity/msg_cancel_send_to_eth';

const CancelSendToEth = (props: {
  message: MsgCancelSendToEth;
}) => {
  const { message } = props;

  const sender = useProfileRecoil(message.sender);
  const senderMoniker = sender ? sender?.name : message.sender;

  const { transactionID } = message;

  return (
    <>
      <Typography>
        <Trans
          i18nKey="message_contents:MsgCancelSendToEth"
          components={[
            (
              <Name
                address={message.sender}
                name={senderMoniker}
              />
            ),
            <b />,
          ]}
          values={{
            id: transactionID,
          }}
        />
      </Typography>
    </>
  );
};

export default CancelSendToEth;
