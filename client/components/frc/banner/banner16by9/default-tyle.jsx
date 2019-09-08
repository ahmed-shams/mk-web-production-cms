import React from 'react';
import Image16x9 from '../../global/image/plain/index';
import Text from '../../global/text/index';

const DefaultTyle = ({data}) => {
  const { imageOptions, textOptions} = data;
  return (
    <React.Fragment>
      {imageOptions && <Image16x9 info={imageOptions} />}
      {textOptions && <Text info={textOptions} />}
    </React.Fragment>
  );
};

export default DefaultTyle;
