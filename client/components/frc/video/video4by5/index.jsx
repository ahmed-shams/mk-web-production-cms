import React from 'react';
import CompContainer from '../../global/comp-container';
import Image16x9 from '../../global/image/plain';
import Component from '../../rich-text-component';
import { CompVideo4by5 } from './components';
const getImage = (imageOptions) => {
  const imageHtml = (
    <div className="small-12 medium-12 imageContent">
      <Image16x9 info={imageOptions} />
    </div>
  );
  return imageHtml;
};
class Video4by5 extends React.Component {
  constructor(props) {
    super(props);
    this.component = new Component;
    this.renderHtml = this.renderHtml.bind(this);
  }
  getVideo(videoSection) {
    const videoHtml = (
      <div className="small-12 medium-4 videoContent">
        {this.component.renderJSONComponents([videoSection])}
      </div>
    );
    return videoHtml;
  }
  renderHtml(data) {
    const { videoAlignment, imageOptions, videoSection } = data;
    return (
      <CompVideo4by5 className="componentVideo4by5">
        <div className={`row column-gutter ${videoAlignment && videoAlignment.tablet ? "video-tablet-" + videoAlignment.tablet : ""} ${videoAlignment && videoAlignment.mobile ? "video-mobile-" + videoAlignment.mobile : ""}`}>
          {imageOptions && getImage(imageOptions)}
          {videoSection && this.getVideo(videoSection)}
        </div>
      </CompVideo4by5>
    );
  }
  render() {
    if (!this.props.data) {
      return null;
    }
    const { data } = this.props;
    return (
      <CompContainer infos={data}>
        {this.renderHtml(data)}
      </CompContainer>
    );
  }
}

export default Video4by5;
