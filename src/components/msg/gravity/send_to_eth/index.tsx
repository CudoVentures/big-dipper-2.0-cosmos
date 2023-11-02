import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgSendToEth } from '@models';
import {
  useProfileRecoil,
} from '@recoil/profiles';
import {
  formatToken, formatNumber,
} from '@utils/format_token';
import { AddressType } from '@src/configs';

const SendToEth = (props: {
  message: MsgSendToEth;
}) => {
  const { message } = props;

  const sender = useProfileRecoil(message.sender);
  const senderMoniker = sender ? sender?.name : message.sender;

  const { ethDest } = message;

  const amount = formatToken(message.amount, 'acudos');
  const displayAmount = `${formatNumber(amount.value, amount.exponent)} ${amount.displayDenom.toUpperCase()}`;

  return (
    <>
      <Typography>
        <Trans
          i18nKey="message_contents:MsgSendToEth"
          components={[
            (
              <Name
                address={message.sender}
                name={senderMoniker}
              />
            ),
            <b />,
            (
              <Name
                address={ethDest}
                name={ethDest}
                addressType={AddressType.ETH}
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

export default SendToEth;
