import React from 'react';
import CompContainer from '../../global/comp-container';
import Generator from '../../rich-text-component';
import { TravelDiary } from './components';

const HeadFont = "type-headline-h2-large";
const SubheadFont = "type-slug-1";
const CopyFont = "type-copy-caslon-deck";
const BannerCtaFont = "type-cta-1";
const GridCtaFont = "type-headline-mmk-2";

const getText = (slot, text, slug) => {
  const texts = {
    classprop: slot.classprop || "wpText",
    text: "",
    fontfamily: "",
    link: slot.link || "",
    tabindex: slot.tabindex || -1,
    aria_hidden: slot.ariahidden || true,
    aria_label: slot.arialabel || "",
    data_icid: slot.data_icid || "",
    padding: {
      top: slot.padding && slot.padding.top || "",
      bottom: slot.padding && slot.padding.bottom || "int-padding-30"
    },
    color: slot.color || "#0a0a0a"
  };
  if (text === "headline") {
    texts.classprop = "wpHeadline";
    texts.text = slot.headline || "";
    texts.fontfamily = HeadFont;
  }
  if (text === "subheadline" || slug) {
    texts.text = slug !== undefined ? slug : slot.subheadline;
    texts.fontfamily = SubheadFont;
  }
  if (text === "copy") {
    texts.text = slot.copy || "";
    texts.fontfamily = CopyFont;
  }
  return texts;
};
const getGlobalOptions = (globalOpt, compId) => {
  const globalOptions = {
    data_linkcontainer: globalOpt.data_linkcontainer || "",
    personalization: globalOpt.personalization || "",
    collapsed: globalOpt.collapsed || false,
    fullbleed: globalOpt.fullbleed || false,
    padding: {
       top: globalOpt.padding && globalOpt.padding.bottom || "",
       bottom: globalOpt.padding && globalOpt.padding.top || "ext-padding-100"
    },
    background: {
       image: {
          src: globalOpt.image.src || "",
          repeat: globalOpt.image.repeat || "none",
          position: globalOpt.image.position || "",
          size: globalOpt.image.size || "cover"
       },
       color: (globalOpt.prod_grid_only && compId === "grid" || globalOpt.first_only && compId === "banner" || globalOpt.second_only && compId === "banner4by5" || globalOpt.third_only && compId === "evenLeft")
              && globalOpt.color ? globalOpt.color : ""
    },
    hide_mobile: globalOpt.hide_mobile || false,
    hide_desktop: globalOpt.hide_mobile || false,
    hide_tablet: globalOpt.hide_mobile || false
 };
  return globalOptions;
};
const getImageOptions = (slot) => {
  const imageOptions = {
    analyticsId: slot.analyticsId || "",
    imgSrc: {
      mobile: slot.images && slot.images.oneByOne || "",
      tablet: slot.images && slot.images.fourByFive || "",
      desktop: slot.images && slot.images.sixteenByNine || "",
      alt: slot.alt || ""
    },
    imgInfo: {
      link_url: slot.link || "",
      data_icid: slot.data_icid || "",
      tabindex: slot.tabindex || "-1",
      aria: {
        hidden: slot.ariahidden || "false",
        label: slot.arialabel || ""
      }
    }
  };
  return imageOptions;
};
const getTextOptions = (slot, compId, slug) => {
  const textOptions = {
    type_wrapper: {
      padding: {
        top: slot.padding && slot.padding.top || "int-padding-30",
        bottom: slot.padding && slot.padding.bottom || compId === "banner" ? "" : "int-padding-30"
      },
      caption_width_desktop: slot.caption_width_desktop || "100%",
      caption_width_mobile: slot.caption_width_mobile || "100%",
      text_align: slot.text_align || compId === "banner" ? "center" : "left",
      left_to_center: slot.left_to_center || false,
      color: slot.color || "#00000"
    },
    typedivider: slot.typedivider || false,
    texts: []
  };
  if ((slot.subheadline) || slug) {
    textOptions.texts.push(getText(slot, "subheadline", slug));
  }
  if (compId === "banner" && slot.headline) {
    textOptions.texts.push(getText(slot, "headline"));
  }
  if (compId === "banner" && slot.copy) {
    textOptions.texts.push(getText(slot, "copy"));
  }
  if (slot.cta) {
    const ctaDefault = {
      ctas: [
        {
          text: slot.cta || "",
          link: slot.link || "",
          data_icid: slot.data_icid || "",
          aria_label: slot.arialabel || "",
          padding: {
            top: slot.padding && slot.padding.top || "",
            bottom: slot.padding && slot.padding.bottom || compId === "banner" ? "" : "int-padding-40"
          }
        }
      ],
      font_family: slot.font_family || compId === "banner" ? BannerCtaFont : GridCtaFont,
      isEU: slot.isEU || false
    };
    textOptions.ctaDefault = ctaDefault;
  }
  return textOptions;
};
const renderComponent = (section) => {
  if (!section.slots) { return []; }
  const slots = section.slots;
  const components = [];
  const banner = {
    componentId: "banner16by9",
    globalOptions: getGlobalOptions(section.background, "banner")
  };
  const banner4by5 = {
    componentId: "banner4by5",
    globalOptions: getGlobalOptions(section.background, "banner4by5")
  };
  const bannerEvenLeft = {
    componentId: "resize",
    globalOptions: getGlobalOptions(section.background, "evenLeft"),
    columnsTheme: "evenLeft",
    onResize: "columns",
    gridDisplayButtonName: section.view_more && section.view_more.btn_text || "",
    imageOptions: []
  };
  const grids = {
    componentId: "resize",
    onDesktop: "grid",
    gridRows: 3,
    gridColumns: 3,
    gridDisplayButtonName: section.view_more && section.view_more.btn_text || "",
    globalOptions: getGlobalOptions(section.background, "grid"),
    imageOptions: [],
    ariaLabel: section.view_more.aria_label
  };
  slots.forEach((slot, index) => {
    const imageOption = {};
    const { analyticsId, imgSrc, imgInfo } = getImageOptions(slot);
    imageOption.analyticsId = analyticsId;
    imageOption.imgSrc = imgSrc;
    imageOption.imgInfo = imgInfo;
    if (index === 0) {
      banner.imageOptions = imageOption;
      banner.textOptions = getTextOptions(slot, "banner", section.slug);
      components.push(banner);
    } else if (index === 1) {
      banner4by5.imageOptions = imageOption;
      banner4by5.textOptions = getTextOptions(slot, "banner");
      components.push(banner4by5);
    } else if (index === 2) {
      bannerEvenLeft.imageOptions[0] = Object.assign({}, imageOption);
      imageOption.textInfo = getTextOptions(slot, "banner");
      bannerEvenLeft.imageOptions[1] = imageOption;
      components.push(bannerEvenLeft);
    } else {
      imageOption.textInfo = getTextOptions(slot);
      grids.imageOptions.push(imageOption);
    }
  });
  if ((grids.imageOptions).length > 0) {
    components.push(grids);
  }
  return components;
};
const getComponent = (data, generator) => {
  const sections = data.sections || [];
  const component = [];
  sections.forEach((section, index) => {
    let html;
    if (section.componentId) {
      html = <TravelDiary key={index}>{generator.renderJSONComponents([section])}</TravelDiary>;
      component.push(html);
    } else {
      const compSections = renderComponent(section);
      compSections.forEach((comp, idx) => {
        const regOneUpRight = comp.componentId === "resize" && comp.columnsTheme === "evenLeft" ? "regOneUpRight" : "";
        html = <TravelDiary key={`section_${idx}`} className={`${comp.componentId === "banner16by9" || comp.componentId === "banner4by5" ? comp.componentId : ""}${regOneUpRight}`}>{generator.renderJSONComponents([comp])}</TravelDiary>;
        component.push(html);
      });
    }
  });
  return component;
};
class MwTravelDiaries extends React.Component {
  constructor(props) {
    super(props);
    this.generator = new Generator;
  }
  render() {
    if (!this.props.data) { return null; }
    const { data } = this.props;
    const html = getComponent(data, this.generator);
    return (
      <CompContainer infos={data}>
        {html}
      </CompContainer>
    );
  }
}

export default MwTravelDiaries;
