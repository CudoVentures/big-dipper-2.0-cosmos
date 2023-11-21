import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgSendToCosmosClaim } from '@models';
import {
  useProfileRecoil,
} from '@recoil/profiles';
import {
  formatToken, formatNumber,
} from '@utils/format_token';
import { AddressType } from '@src/configs';

const SendToCosmos = (props: {
  message: MsgSendToCosmosClaim;
}) => {
  const { message } = props;

  const receiver = useProfileRecoil(message.receiver);
  const receiverMoniker = receiver ? receiver?.name : message.receiver;

  const { ethSender } = message;

  const amount = formatToken(message.amount, 'acudos');
  const displayAmount = `${formatNumber(amount.value, amount.exponent)} ${amount.displayDenom.toUpperCase()}`;

  return (
    <>
      <Typography>
        <Trans
          i18nKey="message_contents:MsgSendToCosmosClaim"
          components={[
            (
              <Name
                address={ethSender}
                name={ethSender}
                addressType={AddressType.ETH}
              />
            ),
            <b />,
            (
              <Name
                address={message.receiver}
                name={receiverMoniker}
              />
            ),
          ]}
          values={{
            amount: displayAmount,
          }}
        />
      </Typography>
    </>
  );
};

export default SendToCosmos;
