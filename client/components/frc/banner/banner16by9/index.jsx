import React, { Component } from 'react';
import CompContainer from '../../global/comp-container/index';
import DefaultTyle from './default-tyle';

class DefaultBanner extends Component {
  render() {
    const { data } = this.props;
    if (!this.props.contained) return <DefaultTyle data={data} />;
    return (
      <CompContainer infos={data} >
        <DefaultTyle data={data} />
      </CompContainer>
    );
  }
}

export default DefaultBanner;
