import React from 'react';
import CompContainer from '../../global/comp-container';
import Generator from '../../rich-text-component';
import { Section } from './components';
const getComponent = (data, generator) => {
  const sections = data.sections || [];
  const component = [];
  sections.forEach((section, index) => {
    const html = <Section key={index}>{generator.renderJSONComponents([section])}</Section>;
    component.push(html);
  });
  return component;
};

class LookBook extends React.Component {
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

export default LookBook;
