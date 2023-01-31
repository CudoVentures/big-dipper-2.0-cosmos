import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import { MsgUpdatePrice } from '@models';
import { formatToken } from '@src/utils/format_token';
import UpdatePrice from '.';

jest.mock('@components', () => ({
  Name: (props) => <div id="Name" {...props} />,
}));

jest.mock('next-translate/Trans', () => (
  (props) => <div id={props.i18nKey} {...props} />
));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/MsgUpdatePrice', () => {
  it('matches snapshot', () => {
    const message = new MsgUpdatePrice({
      category: 'marketplace',
      type: 'MsgUpdatePrice',
      creator: 'creator',
      id: 'id',
      price: formatToken('1', 'acudos'),
    });

    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <UpdatePrice
            message={message}
          />
        </MockTheme>
      </RecoilRoot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(component.root.findByProps({ id: 'message_contents:txUpdatePrice' }).props.i18nKey).toEqual('message_contents:txUpdatePrice');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
