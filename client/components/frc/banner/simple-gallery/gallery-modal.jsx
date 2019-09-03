import React, {Component} from 'react';
import AriaModal from 'react-aria-modal';
import { ModalSubWwrapper } from './components';
import Text from '../../global/text';
import Slug from '../../global/text/text-content/slug';

class SimpleGalleryModal extends Component {
  constructor(props) {
    super(props);
    this.state = { modalActive: true };
    this.deactivateModal = this.deactivateModal.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }
  /* Close Modal */
  deactivateModal() {
    this.props.onExit();
  }
  renderSlideContent() {
    const slider = this.props.selectedPayload;
    const textInfo = slider ? slider.textInfo : {};
    let textObj = {};
    if (textInfo) textObj = Object.assign({}, {type_wrapper: textInfo.type_wrapper}, {texts: textInfo.texts});
    return (
      <ModalSubWwrapper sliderInfo={slider && slider.sliderInfo} className="mkwpdev modal-wrapper">
        <div className="close-btn-wrapper"><button type="button" aria-label="close overlay" id="quickViewCloseBtn" className="closeButton" onClick={this.deactivateModal}></button></div>
        <div className="modal-content-wrapper">
          <div className="sticky-header">
            <h2 className="modal-headline">{textInfo && <Slug data={textInfo.slug} />}</h2>
          </div>
          <div className="modal-description-wrapper">
            <div className="modal-description-sub-wrapper">
              <div className="modal-description">{textInfo && <Text info={textObj} />}</div>
            </div>
          </div>
        </div>
      </ModalSubWwrapper>
    );
  }

  /* Return Modal Content */
  renderModal() {
    return (
      <AriaModal
        mounted={this.props.mounted}
        titleId="simple-gallery-modal"
        dialogClass="simple-gallery-modal"
        onExit={this.deactivateModal}
        dialogStyle={{
          height: '100%'
        }}
        underlayClickExits={false}>
        {this.renderSlideContent()}
      </AriaModal>
      );
  }

  /* Render Modal */
  render() {
    return <React.Fragment>{this.renderModal()}</React.Fragment>;
  }
}

export default SimpleGalleryModal;
