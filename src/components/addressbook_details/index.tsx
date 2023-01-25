import React from 'react';
import { AddressBookDetailsValue } from '@src/models/msg/types';
import StyledTypographyPair from '../styled_typography_pair';

const AddressBookDetails = ({ content }: { content: AddressBookDetailsValue }) => {
  return (
    <>
      {content.network ? <StyledTypographyPair text="Network:" content={content.network} /> : null}
      {content.label ? <StyledTypographyPair text="Label:" content={content.label} /> : null}
      {content.value ? <StyledTypographyPair text="Value:" content={content.value} /> : null}
    </>
  );
};

export default AddressBookDetails;
