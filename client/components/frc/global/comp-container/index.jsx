import React, { Component } from 'react';
import { MwkpDev, GlobalMKWPWrapper, PromoContainer } from './components';

class CompContainer extends Component {
  render() {
    const data = this.props.infos || {};
    const info = data.globalOptions || {};
    const { componentId } = this.props.infos || '';
    return (
      <MwkpDev className="mkwpdev" id={info.personalization} mobilehide={info.hide_mobile} tablethide={info.hide_tablet} desktophide={info.hide_desktop} bgcolor={info.background !== undefined ? info.background.color : undefined } bgimg={info.background !== undefined ? info.background.image : undefined} >
        <GlobalMKWPWrapper gutters={info.gutters} fullbleed={info.fullbleed} bgcolor={info.background !== undefined ? info.background.inner_color : undefined} paddingtop={info.padding !== undefined ? info.padding.top : undefined } paddingbottom={info.padding !== undefined ? info.padding.bottom : undefined } >
          <PromoContainer data-linkcontainer={info.data_linkcontainer} styleFix={componentId} >
            {this.props.children}
          </PromoContainer>
        </GlobalMKWPWrapper>
      </MwkpDev>
    );
  }
}

export default CompContainer;
