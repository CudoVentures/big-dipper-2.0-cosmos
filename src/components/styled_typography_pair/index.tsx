import {
  Typography,
  Box,
} from '@material-ui/core';
import { holder } from './styles';

const StyledTypographyPair = ({
  text,
  content,
}: {
    text: string,
    content: string
}) => {
  return (
    <Box style={holder}>
      <Typography style={{ fontWeight: 900 }}>
        {text}
      </Typography>
      <Typography>
        {content}
      </Typography>
    </Box>
  );
};

export default StyledTypographyPair;
