import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import { MsgDeleteAddress } from '@models';
import CreateAddress from '.';

// ==================================
// mocks
// ==================================

jest.mock('@components', () => ({
  Name: (props) => <div id="Name" {...props} />,
}));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/MsgDeleteAddress', () => {
  it('matches snapshot', () => {
    const message = new MsgDeleteAddress({
      category: 'addressbook',
      type: 'MsgDeleteAddress',
      creator: 'creatorAddress',
      network: 'testNetwork',
      label: 'testLabel',
      value: 'testValue',
    });
    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <CreateAddress
            message={message}
          />
        </MockTheme>
      </RecoilRoot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
