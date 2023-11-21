import React from 'react';
import { MsgUnknown } from '@models';
import JSONPretty from 'react-json-pretty';
import { useGetStyles } from './styles';

const JSONPrettyMon = require('react-json-pretty/dist/monikai');

const Unknown = (props: {
  message: MsgUnknown;
}) => {
  const { message } = props;

  const { classes } = useGetStyles();
  return (
    <pre className={classes.root}>
      <code>
        <JSONPretty
          id="json-pretty"
          data={JSON.stringify(message.json)}
          theme={JSONPrettyMon}
        />
      </code>
    </pre>
  );
};

export default Unknown;
