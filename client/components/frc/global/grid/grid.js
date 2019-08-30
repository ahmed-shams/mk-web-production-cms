import React from 'react';
import Columns from 'components/basic/edx/flagship/columns';
import Button from 'components/basic/edx/global/button';
import Image16x9 from 'components/basic/edx/global/image/plain';
import CompContainer from 'components/basic/edx/global/comp-container';

const Debug = false;

const buttonHTML = (info) => {
  if (info.displayAll) {
    const f = info.focus;
    const p = 30;
    return (
      <Button name={info.displayName} aria={info.ariaLabel} action={info.displayAll} paddingTop={p} paddingBottom={p} focus={f} />
    );
  }
  return null;
};

const sectionsHTML = (info) => {
  const sections = [];
  Object.keys(info.sections).forEach((index) => {
    const imageOption = info.sections[index].imageOption;
    const html = (
      <CompContainer infos={imageOption} key={`sectionImageOption${index}`}>
        <Image16x9 info={imageOption} />
      </CompContainer>
    );
    sections.push(html);
  });
  return sections;
};

const rowsHTML = (info) => {
  const count = info.objects.length;
  const rows = [];
  if (Debug) console.log(`|GridHTML| length: |${count}| columns: |${info.columns}| isMobile: |${info.isMobile}|`);
  for (let i = 0; i < count; i = i + info.columns) {
    const columns = [];
    for (let j = 0; j < info.columns; j++) {
      const index = j + i;
      const columnsData = index < count ? info.objects[index] : null;
      columns.push(columnsData);
    }
    const data = info.isImageOptions ? {imageOptions: columns} : {components: columns};
    data.columnsTheme = info.columnsTheme;
    data.actions = {};
    data.actions.open = info.open;
    data.columnsInitialIndex = i;
    if (i !== 0 && !info.noPadding) data.columnsTopPadding = true;
    const rowHTML = <Columns data={data} isMobile={info.isMobile} notcontained />;
    rows.push(rowHTML);
  }
  return rows;
};

class GridHTML {

  // returns the button for the grid
  button(info, padding) {
    return buttonHTML(info, padding);
  }

  // returns the grid components for the grid
  rows(info) {
    return rowsHTML(info);
  }

  // returns the button and the grid components
  complete(info) {
    const rows = rowsHTML(info);
    const sections = sectionsHTML(info);
    const button = buttonHTML(info);
    return {
      rows,
      sections,
      button
    };
  }
}

export default GridHTML;
