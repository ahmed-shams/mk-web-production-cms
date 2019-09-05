import React, { Component } from 'react';
import CompContainer from 'components/basic/edx/global/comp-container';
import { DkNavContainer, DkCategory } from './components';
import Text from 'components/basic/edx/global/text';
import Image16x9 from 'components/basic/edx/global/image/plain';
const getLogo = (logo) => {
  return (
    <div className="nav-logo">
      <Image16x9 info={logo} />
    </div>
  );
};
const getCategories = (categories) => {
  const categoryHtml = [];
  categories.forEach((category, index) => {
    const activeFlag = category.active ? "active" : "";
    const html = (
      <DkCategory key={index} className={activeFlag} borderColor={category.type_wrapper.underline ? category.type_wrapper.underline : ""}>
        <Text info={category} />
      </DkCategory>
    );
    categoryHtml.push(html);
  });
  return (
    <div className="nav-category">
      <nav ref="category">
        {categoryHtml}
      </nav>
    </div>
  );
};
const getScrollOption = (data) => {
  let scrollClass = '';
  if (typeof data.categoryOptions !== "undefined") {
    const categoryOptions = data.categoryOptions;
    Object.keys(categoryOptions).forEach(key => {
      scrollClass += " " + (categoryOptions[key] === 'scroll' ? "scroll" + key : "");
    });
  }
  return scrollClass;
};
const getScrollY = () => {
  return (typeof window.scrollY === "undefined" ? window.pageYOffset : window.scrollY);
};
const getHeaderHeight = () => {
  return (typeof document !== 'undefined' ? document.querySelector('.mk-web .header-container').offsetHeight : "");
};

class DkNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navWidth: "auto"
    };
    this.setContainerWidth = this.setContainerWidth.bind(this);
    this.setTransition = this.setTransition.bind(this);
  }
  componentDidMount() {
    this.setTransition();
    this.setContainerWidth();
    window.addEventListener('resize', this.setContainerWidth);
    window.addEventListener('scroll', this.setTransition);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.setContainerWidth);
    window.removeEventListener('scroll', this.setTransition);
  }
  setContainerWidth() {
    const animate = typeof this.props.data.animate ? this.props.data.animate : {};
    if (this.refs.category && animate.width && animate.width === 'flexible') {
      let catWidth = 0;
      const categories = Array.from(this.refs.category.children);
      categories.forEach(category => {
        catWidth += category.getBoundingClientRect().width;
      });
      catWidth = catWidth / window.innerWidth * 100 + 1;
      this.setState({navWidth: catWidth < 100 ? 'auto' : catWidth + '%'});
    }
  }
  setTransition() {
    if (this.refs.category) {
      const headerHeight = getHeaderHeight();
      const scrollY = getScrollY();
      const categoryNavTop = this.refs.category.getBoundingClientRect().top + this.refs.category.getBoundingClientRect().height + scrollY - headerHeight;
      if (this.refs.category.classList.contains("viewport-visible") && categoryNavTop <= scrollY) {
        this.refs.category.classList.remove('viewport-visible');
      } else {
        this.refs.category.classList.add('viewport-visible');
      }
    }
  }
  renderHtml(data) {
    const categories = (typeof data.categories === "undefined") ? false : data.categories;
    return (
      <DkNavContainer className={`componentDKNavgation ${categories ? "categoryExpanded" : ""} ${getScrollOption(data)}`} navWidth={this.state.navWidth}>
        {getLogo(data.logo)}
        {categories && getCategories(categories)}
      </DkNavContainer>
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

export default DkNavigation;
