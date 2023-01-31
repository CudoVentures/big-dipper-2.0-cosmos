import React from 'react';
import {
  Typography,
  Box,
} from '@material-ui/core';
import { Royalties } from '@src/models/msg/types';
import Name from '../name';
import {
  holder, title,
} from '../styled_typography_pair/styles';

const RoyaltiesDetails = ({
  type, royalties,
}: { type: 'Mint' | 'Resale', royalties: Royalties[] }) => {
  return !royalties.length ? null : (
    <>
      <Typography style={title}>{`${type} Royalties`}</Typography>
      {royalties.map((royaltie) => {
        return (
          <Box style={holder}>
            <Name address={royaltie.address} name={royaltie.address} />
            <Typography>
              {`${parseFloat(royaltie.percent)} %`}
            </Typography>
          </Box>
        );
      })}
    </>
  );
};

export default RoyaltiesDetails;
