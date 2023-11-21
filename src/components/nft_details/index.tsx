import React from 'react';
import { MintedNft } from '@src/models/msg/types';
import { Typography } from '@material-ui/core';
import StyledTypographyPair from '../styled_typography_pair';
import { title } from '../styled_typography_pair/styles';

const NftDetails = ({ content }: { content: MintedNft }) => {
  return (
    <>
      <Typography style={title}>NFT DETAILS</Typography>
      {content.denomId ? <StyledTypographyPair text="Collection:" content={content.denomId} /> : null}
      {content.name ? <StyledTypographyPair text="Name:" content={content.name} /> : null}
      {content.price.value ? <StyledTypographyPair text="Price:" content={`${content.price.value} ${content.price.displayDenom}`} /> : null}
      {content.uid ? <StyledTypographyPair text="Uid:" content={content.uid} /> : null}
      {content.uri ? <StyledTypographyPair text="Uri:" content={content.uri} /> : null}
      {content.data ? <StyledTypographyPair text="Data:" content={content.data} /> : null}
    </>
  );
};

export default NftDetails;
