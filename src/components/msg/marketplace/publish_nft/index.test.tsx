import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import { MsgPublishNft } from '@models';
import { formatToken } from '@src/utils/format_token';
import PublishNft from '.';

jest.mock('@components', () => ({
  Name: (props) => <div id="Name" {...props} />,
}));

jest.mock('next-translate/Trans', () => (
  (props) => <div id={props.i18nKey} {...props} />
));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/MsgPublishNft', () => {
  it('matches snapshot', () => {
    const message = new MsgPublishNft({
      category: 'marketplace',
      type: 'MsgPublishNft',
      creator: 'creator',
      denomId: 'denomId',
      tokenId: 'tokenId',
      price: formatToken('1', 'acudos'),
    });

    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <PublishNft
            message={message}
          />
        </MockTheme>
      </RecoilRoot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(component.root.findByProps({ id: 'message_contents:txPublishNft' }).props.i18nKey).toEqual('message_contents:txPublishNft');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
