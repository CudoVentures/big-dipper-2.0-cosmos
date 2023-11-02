import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { Typography } from '@material-ui/core';
import { ADDRESS_DETAILS } from '@utils/go_to_page';
import { AddressType } from '@src/configs';
import { useStyles } from './styles';

const Name: React.FC<{
  className?: string;
  address: string;
  name: string;
  addressType?: AddressType;
}> = ({
  className, address, name, addressType,
}) => {
  const classes = useStyles();
  const href = ADDRESS_DETAILS(address, addressType);
  return (
    <Link href={href} passHref>
      <Typography variant="body1" className={classnames(className, classes.root)} component="a">
        {name}
      </Typography>
    </Link>
  );
};

export default Name;
