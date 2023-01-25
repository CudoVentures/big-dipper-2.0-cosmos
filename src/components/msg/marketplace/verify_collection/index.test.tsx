import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import { MsgVerifyCollection } from '@models';
import VerifyCollection from '.';

jest.mock('@components', () => ({
  Name: (props) => <div id="Name" {...props} />,
}));

jest.mock('next-translate/Trans', () => (
  (props) => <div id={props.i18nKey} {...props} />
));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/MsgVerifyCollection', () => {
  it('matches snapshot', () => {
    const message = new MsgVerifyCollection({
      category: 'marketplace',
      type: 'MsgVerifyCollection',
      creator: 'Creator',
      collectionId: 'collectionId',
      admin: 'admin',
    });
    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <VerifyCollection
            message={message}
          />
        </MockTheme>
      </RecoilRoot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(component.root.findByProps({ id: 'message_contents:txVerifyCollection' }).props.i18nKey).toEqual('message_contents:txVerifyCollection');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
