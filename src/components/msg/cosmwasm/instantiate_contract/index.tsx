import React, {
  useEffect,
  useState,
} from 'react';
import numeral from 'numeral';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgInstantiateContract } from '@models';
import { useProfileRecoil } from '@recoil/profiles';
import { fetchCW20TokenInfo } from '@src/screens/token_details/utils';

const InstantiateContract = (props: {
  message: MsgInstantiateContract;
}) => {
  const { message } = props;
  const [isCW20, setIsCW20] = useState<boolean>(false);
  const sender = useProfileRecoil(message.sender);
  const senderMoniker = sender ? sender?.name : message.sender;

  useEffect(() => {
    const setCW20 = async (address: string) => {
      const result = await fetchCW20TokenInfo(address);
      if (result.address === address) {
        setIsCW20(true);
        return;
      }
      setIsCW20(false);
    };

    if (message.contractAddress) {
      setCW20(message.contractAddress);
    }
  }, []);

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txInstantiateContract"
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
              address={message.contractAddress}
              name={message.contractAddress}
            />
          ),
          <b />,
        ]}
        values={{
          contractType: isCW20 ? 'CW20 Token ' : '',
          codeId: numeral(message.codeId).format('0,0'),
        }}
      />
    </Typography>
  );
};

export default InstantiateContract;
