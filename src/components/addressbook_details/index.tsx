import React from 'react';
import {
  Typography,
  Box,
} from '@material-ui/core';
import { addressBookDetails } from './styles';

interface AddressBookDetailsValue {
    network: string;
    label: string;
    value: string;
}

const StyledTypography = ({
  text,
  content,
}: {
  text: string,
  content: string
}) => {
  return (
    <Box style={addressBookDetails}>
      <Typography style={{ fontWeight: 900 }}>
        {text}
      </Typography>
      <Typography>
        {content}
      </Typography>
    </Box>
  );
};

const AddressBookDetails = ({ content }: { content: AddressBookDetailsValue }) => {
  return (
    <>
      {content.network ? <StyledTypography text="Network:" content={content.network} /> : null}
      {content.label ? <StyledTypography text="Label:" content={content.label} /> : null}
      {content.value ? <StyledTypography text="Value:" content={content.value} /> : null}
    </>
  );
};

export default AddressBookDetails;
