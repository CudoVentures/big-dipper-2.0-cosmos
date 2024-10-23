import React from 'react';
import classnames from 'classnames';
import {
  Drawer,
  AppBar,
} from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { readTheme } from '@recoil/settings/selectors';
import BigDipperLogoWhite from '@assets/big-dipper-white.svg';
import BigDipperLogoRed from '@assets/big-dipper-red.svg';
import { useStyles } from './styles';
import { useDesktop } from './hooks';
import {
  MenuItems,
  TitleBar,
} from '..';
import { ActionBar } from './components';

const Desktop: React.FC<{
  className?: string;
  title: string;
}> = ({
  className, title,
}) => {
  const classes = useStyles();
  const theme = useRecoilValue(readTheme);
  const {
    isMenu,
    toggleMenu,
    toggleNetwork,
    isNetwork,
  } = useDesktop();
  return (
    <div className={classnames(className, classes.root)}>
      <AppBar
        position="fixed"
        className={classnames(classes.appBar, {
          open: isMenu,
        })}
      >
        <div className={classnames(classes.mergeNotice)}>
          CUDOS has merged with ASI Alliance, and the CUDOS blockchain has shut down.
          All accounts and balances have moved to the
          <a href="https://www.mintscan.io/fetchai">ASI blockchain</a>.
          The last state of the CUDOS blockchain is preserved here for historical reference.
        </div>
        <ActionBar
          toggleNetwork={toggleNetwork}
          isNetwork={isNetwork}
        />
        <TitleBar title={title} />
      </AppBar>
      <Drawer
        variant="permanent"
        className={classnames(classes.drawer, {
          open: isMenu,
          closed: !isMenu,
          [classes.drawerOpen]: isMenu,
          [classes.drawerClose]: !isMenu,
        })}
        classes={{
          paper: classnames({
            open: isMenu,
            closed: !isMenu,
            [classes.drawerOpen]: isMenu,
            [classes.drawerClose]: !isMenu,
          }),
        }}
      >
        {theme === 'light' ? (
          <BigDipperLogoRed
            className={classes.logo}
            onClick={toggleMenu}
            role="button"
          />
        ) : (
          <BigDipperLogoWhite
            className={classes.logo}
            onClick={toggleMenu}
            role="button"
          />
        )}
        <MenuItems />
      </Drawer>
    </div>
  );
};

export default Desktop;
