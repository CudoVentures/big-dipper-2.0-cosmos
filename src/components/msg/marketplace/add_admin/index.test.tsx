import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import { MsgAddAdmin } from '@models';
import AddAdmin from '.';

jest.mock('@components', () => ({
  Name: (props) => <div id="Name" {...props} />,
}));

jest.mock('next-translate/Trans', () => (
  (props) => <div id={props.i18nKey} {...props} />
));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/MsgAddAdmin', () => {
  it('matches snapshot', () => {
    const message = new MsgAddAdmin({
      category: 'marketplace',
      type: 'MsgAddAdmin',
      creator: 'creator',
      address: 'address',
    });
    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <AddAdmin
            message={message}
          />
        </MockTheme>
      </RecoilRoot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(component.root.findByProps({ id: 'message_contents:txAddAdmin' }).props.i18nKey).toEqual('message_contents:txAddAdmin');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
