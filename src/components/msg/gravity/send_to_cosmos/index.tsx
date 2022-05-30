import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgSendToCosmosClaim } from '@models';
import {
  useProfileRecoil,
} from '@recoil/profiles';
import {
  formatToken, formatTokenByExponent,
} from '@utils/format_token';

const SendToCosmos = (props: {
    message: MsgSendToCosmosClaim;
}) => {
  const { message } = props;

  const receiver = useProfileRecoil(message.receiver);
  const receiverMoniker = receiver ? receiver?.name : message.receiver;

  const amount = formatToken(message.amount, 'acudos');
  const displayAmount = `${formatTokenByExponent(amount.value, 25)} ${amount.displayDenom.toUpperCase()}`;

  return (
    <>
      <Typography>
        <Trans
          i18nKey="message_contents:MsgSendToCosmosClaim"
          components={[
            <b />,
            <b />,
            (
              <Name
                address={message.receiver}
                name={receiverMoniker}
              />
            ),
          ]}
          values={{
            ethSender: message.ethSender,
            amount: displayAmount,
          }}
        />
      </Typography>
    </>
  );
};

export default SendToCosmos;
