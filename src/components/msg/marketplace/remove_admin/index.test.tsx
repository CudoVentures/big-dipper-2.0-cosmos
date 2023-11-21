import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import { MsgRemoveAdmin } from '@models';
import RemoveAdmin from '.';

jest.mock('@components', () => ({
  Name: (props) => <div id="Name" {...props} />,
}));

jest.mock('next-translate/Trans', () => (
  (props) => <div id={props.i18nKey} {...props} />
));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/MsgRemoveAdmin', () => {
  it('matches snapshot', () => {
    const message = new MsgRemoveAdmin({
      category: 'marketplace',
      type: 'MsgRemoveAdmin',
      creator: 'creator',
      address: 'address',
    });
    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <RemoveAdmin
            message={message}
          />
        </MockTheme>
      </RecoilRoot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(component.root.findByProps({ id: 'message_contents:txRemoveAdmin' }).props.i18nKey).toEqual('message_contents:txRemoveAdmin');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
