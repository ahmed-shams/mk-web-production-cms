import React from 'react';
import Components from 'components/basic/rich-text-component';
import Button from 'components/basic/edx/global/button';
import Grid from 'components/basic/edx/global/grid';
import ExportMockData from '__test__/mock-data/__export';
import Styled from 'styled-components';

const Debug = true;
const BaseDirectoryName = 'test-mock-data-base-directory';

const paths = (data, dicts) => {
  if (data.path) {
    const dict = {
      name: `${data.name}`,
      path: `${data.path}`
    };
    dicts.push(dict);
  }
  if (data.buttons) {
    for (let i = 0; i < data.buttons.length; i++) {
      const newData = data.buttons[i];
      paths(newData, dicts);
    }
  }
  return dicts;
};

const logJSON = (data) => { // eslint-disable-line
  const dicts = paths(data, []);
  const mock = new ExportMockData;
  Object.keys(dicts).forEach((index) => {
    const dict = dicts[index];
    const json = mock.json(dict.path);
    console.log(dict.name);
    console.log(JSON.stringify(json));
    console.log('');
    console.log('');
  });
};

const objectFromNames = (names, data, index) => {
  if (names.length - 1 === index) {
    if (data.buttons) return data.buttons;
    if (data.path) return data.path;
    return [];
  }
  if (data.buttons) {
    const nextIndex = index + 1;
    const name = names[nextIndex];
    const filter = data.buttons.filter(x => x.name === name);
    const nextData = filter.length > 0 ? filter[0] : {};
    return objectFromNames(names, nextData, nextIndex);
  }
  return [];
};

const infoFromStatePropsActions = (state, props, actions) => {
  const d = props.data || {};
  const isMobile = props.isMobile || false;
  const current = state.names[state.names.length - 1];
  const data = objectFromNames(state.names, d, 0);
  const noBackButton = current === BaseDirectoryName;
  const isComponent = (typeof data === 'string');
  return {
    actions,
    current,
    data,
    isComponent,
    isMobile,
    noBackButton
  };
};

const errorRender = (message) => {
  return (
    <ErrorDiv key={`5000${message}`}>
      {message}
    </ErrorDiv>
  );
};

const renderComponent = (info) => {
  const mock = new ExportMockData;
  const json = mock.json(info.data);
  if (json) {
    if (Debug) console.log(json);
    const comp = new Components;
    const deepcopy = JSON.parse(JSON.stringify(json));
    return comp.renderJSONComponents(deepcopy);
  }
  const message = `unable to render component: |${info.data}|`;
  return errorRender(message);
};

const renderButtons = (info) => {
  const buttons = [];
  Object.keys(info.data).forEach((i) => {
    const b = info.data[i];
    const button = <Button name={b.name} action={() => info.actions.forward(b.name)} focus key={1001 + i} />;
    buttons.push(button);
  });
  if (Debug) console.log(`|TestMockData| returning Grid buttons`);
  const data = { components: buttons };
  return <Grid data={data} isMobile={info.isMobile} contained />;
};

const backButtonHTML = (info) => {
  if (info.noBackButton) return null;
  const name = 'Back';
  return (
    <Button name={name} action={() => info.actions.back()} focus paddingTop={30} paddingBottom={30} key={2000} />
  );
};

const renderHTML = (info) => {
  const title = info.isComponent ? errorRender(info.current) : null;
  const button = backButtonHTML(info);
  const html = info.isComponent ? renderComponent(info) : renderButtons(info);
  return [
    title,
    button,
    html
  ];
};

class TestMockData extends React.Component {

  constructor(props) {
    super(props);
    this.back = this.back.bind(this);
    this.forward = this.forward.bind(this);
    this.actions = {
      back: this.back,
      forward: this.forward
    };
    const names = [BaseDirectoryName];
    this.state = {names};
    if (Debug) console.log(`|TestMockData| did initialize`);
    if (Debug) logJSON(this.props.data);
  }

  back() {
    if (Debug) console.log(`|TestMockData| back`);
    const names = this.state.names;
    names.pop();
    this.setState({names});
  }

  forward(nextName) {
    if (Debug) console.log(`|TestMockData| forward: |${nextName}|`);
    const names = this.state.names;
    names.push(nextName);
    this.setState({names});
  }

  render() {
    if (Debug) console.log(`|TestMockData| render`);
    const info = infoFromStatePropsActions(this.state, this.props, this.actions);
    const html = renderHTML(info);
    return html;
  }
}

export default TestMockData;

const ErrorDiv = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 0px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.847);
  font-family: "Gotham 5R", "Gotham Medium";
`;
