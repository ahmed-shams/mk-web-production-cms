import React, { Component } from 'react';
import CompContainer from '../../comp-container';
import DefaultComp from './default-tyle';

class Image16x9 extends Component {
  render() {
    const { info } = this.props;
    if (!this.props.contained) return <DefaultComp info={info} />;
    return (
      <CompContainer infos={info} >
        <DefaultComp info={info} />
      </CompContainer>
    );
  }
}

export default Image16x9;
