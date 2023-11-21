import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import { MsgRemoveNft } from '@models';
import RemoveNft from '.';

jest.mock('@components', () => ({
  Name: (props) => <div id="Name" {...props} />,
}));

jest.mock('next-translate/Trans', () => (
  (props) => <div id={props.i18nKey} {...props} />
));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/MsgRemoveNft', () => {
  it('matches snapshot', () => {
    const message = new MsgRemoveNft({
      category: 'marketplace',
      type: 'MsgRemoveNft',
      creator: 'creator',
      id: 'id',
    });

    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <RemoveNft
            message={message}
          />
        </MockTheme>
      </RecoilRoot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(component.root.findByProps({ id: 'message_contents:txRemoveNft' }).props.i18nKey).toEqual('message_contents:txRemoveNft');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
