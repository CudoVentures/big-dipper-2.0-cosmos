import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import { MsgCreateCollection } from '@models';
import CreateCollection from '.';

jest.mock('@components', () => ({
  Name: (props) => <div id="Name" {...props} />,
}));

jest.mock('next-translate/Trans', () => (
  (props) => <div id={props.i18nKey} {...props} />
));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/MsgCreateCollection', () => {
  it('matches snapshot', () => {
    const message = new MsgCreateCollection({
      category: 'marketplace',
      type: 'MsgCreateCollection',
      creator: 'Creator',
      collectionId: 'collectionId',
      mintRoyalties: [{
        address: 'address',
        percent: 'percent',
      }],
      resaleRoyalties: [{
        address: 'address',
        percent: 'percent',
      }],
    });
    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <CreateCollection
            message={message}
          />
        </MockTheme>
      </RecoilRoot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(component.root.findByProps({ id: 'message_contents:txCreateCollection' }).props.i18nKey).toEqual('message_contents:txCreateCollection');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
