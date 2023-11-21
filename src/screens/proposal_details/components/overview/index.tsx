import React from 'react';
import numeral from 'numeral';
import classnames from 'classnames';
import dayjs, { formatDayJs } from '@utils/dayjs';
import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';
import { readDate } from '@recoil/settings';
import JSONPretty from 'react-json-pretty';
import {
  Typography,
  Divider,
} from '@material-ui/core';
import {
  SingleProposal,
  Box,
  Markdown,
} from '@components';
import { useStyles } from './styles';
import { getProposalContentString } from '../../utils';

const JSONPrettyMon = require('react-json-pretty/dist/monikai');

const Overview: React.FC<{
  className?: string;
  title: string;
  id: number;
  description: string;
  status: string;
  submitTime: string;
  depositEndTime: string;
  votingStartTime: string | null;
  votingEndTime: string | null;
  content: string;
}> = ({
  className, ...props
}) => {
  const dateFormat = useRecoilValue(readDate);
  const classes = useStyles();
  const { t } = useTranslation('proposals');

  const contentString = getProposalContentString(props.content);

  return (
    <Box className={classnames(className, classes.root)}>
      <SingleProposal
        id={`#${numeral(props.id).format('0,0')}`}
        title={props.title}
        status={props.status}
      />
      <Divider />
      <div
        style={{
          flexDirection: 'column', display: 'flex',
        }}
        className={classes.content}
      >
        {contentString ? (
          <JSONPretty
            id="json-pretty"
            data={contentString}
            theme={JSONPrettyMon}
          />
        ) : null}
        <Typography variant="body1" className="label">
          {t('description')}
        </Typography>
        <Markdown markdown={props.description} />
      </div>
      <div className={classes.time}>
        {
            !!props.submitTime && (
              <div>
                <Typography variant="body1" className="label">
                  {t('submitTime')}
                </Typography>
                <Typography variant="body1" className="value">
                  {formatDayJs(dayjs.utc(props.submitTime), dateFormat)}
                </Typography>
              </div>
            )
          }
        {
            !!props.depositEndTime && (
              <div>
                <Typography variant="body1" className="label">
                  {t('depositEndTime')}
                </Typography>
                <Typography variant="body1" className="value">
                  {formatDayJs(dayjs.utc(props.depositEndTime), dateFormat)}
                </Typography>
              </div>
            )
          }
        {
            !!props.votingStartTime && (
              <div>
                <Typography variant="body1" className="label">
                  {t('votingStartTime')}
                </Typography>
                <Typography variant="body1" className="value">
                  {formatDayJs(dayjs.utc(props.votingStartTime), dateFormat)}
                </Typography>
              </div>
            )
          }
        {
            !!props.votingEndTime && (
              <div>
                <Typography variant="body1" className="label">
                  {t('votingEndTime')}
                </Typography>
                <Typography variant="body1" className="value">
                  {formatDayJs(dayjs.utc(props.votingEndTime), dateFormat)}
                </Typography>
              </div>
            )
          }
      </div>
    </Box>
  );
};

export default Overview;
