import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import { MsgBuyNft } from '@models';
import { formatToken } from '@src/utils/format_token';
import BuyNft from '.';

jest.mock('@components', () => ({
  Name: (props) => <div id="Name" {...props} />,
}));

jest.mock('next-translate/Trans', () => (
  (props) => <div id={props.i18nKey} {...props} />
));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/MsgBuyNft', () => {
  it('matches snapshot', () => {
    const message = new MsgBuyNft({
      category: 'marketplace',
      type: 'MsgBuyNft',
      seller: 'seller',
      buyer: 'buyer',
      id: 'id',
      price: formatToken('1', 'acudos'),
    });

    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <BuyNft
            message={message}
          />
        </MockTheme>
      </RecoilRoot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(component.root.findByProps({ id: 'message_contents:txBuyNft' }).props.i18nKey).toEqual('message_contents:txBuyNft');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
