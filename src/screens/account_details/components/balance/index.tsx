import React from 'react';
import classnames from 'classnames';
import Big from 'big.js';
import numeral from 'numeral';
import * as R from 'ramda';
import {
  Typography,
  Divider,
} from '@material-ui/core';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import useTranslation from 'next-translate/useTranslation';
import { Box } from '@components';
import { chainConfig } from '@configs';
import { formatNumber } from '@utils/format_token';
import { useDataBlocks } from '@src/screens/home/components/data_blocks/hooks';
import { Tooltip } from '@mui/material';
import { useStyles } from './styles';
import { formatBalanceData } from './utils';

const Balance: React.FC<{
  className?: string;
  available: TokenUnit;
  delegate: TokenUnit;
  unbonding: TokenUnit;
  reward: TokenUnit;
  commission?: TokenUnit;
  total: TokenUnit;
}> = (props) => {
  const { t } = useTranslation('accounts');
  const {
    classes, theme,
  } = useStyles();
  const { state } = useDataBlocks();
  const marketPrice = state.price;
  const formattedChartData = formatBalanceData(props);

  const empty = {
    key: 'empty',
    value: 2400,
    background: theme.palette.custom.charts.zero,
    display: '',
  };

  const backgrounds = [
    theme.palette.custom.charts.one,
    theme.palette.custom.charts.two,
    theme.palette.custom.charts.three,
    theme.palette.custom.charts.four,
    theme.palette.custom.charts.five,
  ];

  const formatData = formattedChartData.map((x, i) => ({
    ...x,
    value: numeral(x.value).value(),
    background: backgrounds[i],
  }));

  const notEmpty = formatData.some((x) => Big(x.value).gt(0));

  const dataCount = formatData.filter((x) => Big(x.value).gt(0)).length;
  const data = notEmpty ? formatData : [...formatData, empty];
  const rawTotalAmount = Big(marketPrice || 0).times(props.total.value).toPrecision();
  const formatedTotalAmount = `$${numeral(rawTotalAmount).format('0,0.00')}`;

  // format
  const totalDisplay = formatNumber(props.total.value, props.total.exponent);

  return (
    <Box className={classnames(props.className, classes.root)}>
      <Typography variant="h2">
        {t('balance')}
      </Typography>
      <div className={classes.chartWrapper}>
        <div className={classes.chart}>
          <ResponsiveContainer width="99%">
            <PieChart>
              <Pie
                dataKey="value"
                data={data}
                isAnimationActive={false}
                innerRadius="90%"
                outerRadius="100%"
                cornerRadius={40}
                paddingAngle={dataCount > 1 ? 5 : 0}
                fill="#82ca9d"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.background}
                    stroke={entry.background}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className={classes.legends}>
          {data.map((x) => {
            if (x.key.toLowerCase() === 'empty') {
              return null;
            }

            return (
              <div key={x.key} className="legends__single--container">
                <div className="single__label--container">
                  <div className="legend-color" style={{ background: x.background }} />
                  <Typography variant="body1">
                    {t(x.key)}
                  </Typography>
                </div>
                <Typography variant="body1">
                  {x.display}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <Divider className={classes.divider} />
        <div className={classes.total}>
          <div className="total__single--container">
            <Typography variant="h3" className="label">
              {t('total', {
                unit: props.total.displayDenom.toUpperCase(),
              })}
            </Typography>
            <Typography variant="h3">
              {totalDisplay}
            </Typography>
          </div>
          <div className="total__secondary--container total__single--container">
            <Typography variant="body1" className="label">
              $
              {marketPrice}
              {' '}
              /
              {' '}
              {R.pathOr('', ['tokenUnits', chainConfig.primaryTokenUnit, 'display'], chainConfig).toUpperCase()}
            </Typography>
            <Tooltip title={`$${rawTotalAmount}`}>
              <Typography variant="body1">
                {formatedTotalAmount}
              </Typography>
            </Tooltip>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Balance;
