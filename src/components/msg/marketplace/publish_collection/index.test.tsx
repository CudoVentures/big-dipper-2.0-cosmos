import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import { MsgPublishCollection } from '@models';
import PublishCollection from '.';

jest.mock('@components', () => ({
  Name: (props) => <div id="Name" {...props} />,
}));

jest.mock('next-translate/Trans', () => (
  (props) => <div id={props.i18nKey} {...props} />
));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/MsgPublishCollection', () => {
  it('matches snapshot', () => {
    const message = new MsgPublishCollection({
      category: 'marketplace',
      type: 'MsgPublishCollection',
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
          <PublishCollection
            message={message}
          />
        </MockTheme>
      </RecoilRoot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(component.root.findByProps({ id: 'message_contents:txPublishCollection' }).props.i18nKey).toEqual('message_contents:txPublishCollection');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
