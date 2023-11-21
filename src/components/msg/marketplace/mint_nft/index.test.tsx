import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import { MsgMintNft } from '@models';
import { formatToken } from '@src/utils/format_token';
import MintNft from '.';

jest.mock('@components', () => ({
  Name: (props) => <div id="Name" {...props} />,
}));

jest.mock('next-translate/Trans', () => (
  (props) => <div id={props.i18nKey} {...props} />
));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/MsgMintNft', () => {
  it('matches snapshot', () => {
    const message = new MsgMintNft({
      category: 'marketplace',
      type: 'MsgMintNft',
      creator: 'creator',
      recipient: 'recipient',
      mintedNftData: {
        denomId: 'denomId',
        uid: 'uid',
        uri: 'uri',
        data: 'data',
        name: 'name',
        price: formatToken('1', 'acudos'),
      },
    });
    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <MintNft
            message={message}
          />
        </MockTheme>
      </RecoilRoot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(component.root.findByProps({ id: 'message_contents:txMintNft' }).props.i18nKey).toEqual('message_contents:txMintNft');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
