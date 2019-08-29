import React from 'react';
import TextLine from '../../components/text-line';

const GlobalText = ({data}) => {
  return (
    <React.Fragment>
      {data.map((tData, i) => (
        <TextLine key={i} data={tData} />
      ))}
    </React.Fragment>
  );
};

export default GlobalText;
