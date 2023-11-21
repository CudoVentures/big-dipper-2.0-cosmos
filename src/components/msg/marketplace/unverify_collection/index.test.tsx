import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import { MsgUnverifyCollection } from '@models';
import UnverifyCollection from '.';

jest.mock('@components', () => ({
  Name: (props) => <div id="Name" {...props} />,
}));

jest.mock('next-translate/Trans', () => (
  (props) => <div id={props.i18nKey} {...props} />
));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/MsgUnverifyCollection', () => {
  it('matches snapshot', () => {
    const message = new MsgUnverifyCollection({
      category: 'marketplace',
      type: 'MsgUnverifyCollection',
      creator: 'Creator',
      collectionId: 'collectionId',
      admin: 'admin',
    });
    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <UnverifyCollection
            message={message}
          />
        </MockTheme>
      </RecoilRoot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(component.root.findByProps({ id: 'message_contents:txUnverifyCollection' }).props.i18nKey).toEqual('message_contents:txUnverifyCollection');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
