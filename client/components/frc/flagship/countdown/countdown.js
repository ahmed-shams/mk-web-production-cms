import React from 'react';
import Styled from 'styled-components';

const headlineHTML = (hl) => {
  if (hl) {
    const hlClass = hl.type + " width-70-mobile text-center";
    if (hl.link && hl.link !== "") {
      return (
        <a aria-label={hl.aria_label} data-icid={hl.data_icid} href={hl.link}>
          <h2 className={hlClass}>{hl.text}</h2>
        </a>
      );
    }
    return (
      <h2 className={hlClass}>{hl.text}</h2>
    );
  }
  return {};
};

const countdownHTML = (countdown, className) => {
  if (countdown.link && countdown.link !== "") {
    return (
      <div className={className}>
        <a aria-label={countdown.aria_label} data-icid={countdown.data_icid} href={countdown.link}>
        {countdown.text}
        </a>
      </div>
    );
  }
  return (
    <div className={className}>
    {countdown.text}
    </div>
  );
};

const beforeCountdownHTML = (countdown) => {
  const className = countdown.type + " text-center type-padding-top padding-top-30-tablet width-70-tablet countdown-before";
  return countdownHTML(countdown, className);
};

const afterCountdownHTML = (countdown) => {
  const className = countdown.type + " text-center type-padding-top width-70-tablet countdown-after";
  return countdownHTML(countdown, className);
};

const allCountdownHTML = (copy, after) => {
  if (after) return afterCountdownHTML(copy.afterCountdown);
  return beforeCountdownHTML(copy.beforeCountdown);
};

const countdownType1HTML = (copy, type, after) => {
  const t = type.toString();
  if (t === "1") return allCountdownHTML(copy, after);
  return [];
};

const countdownType2HTML = (copy, type, after) => {
  const t = type.toString();
  if (t === "2") return allCountdownHTML(copy, after);
  return [];
};

const disclaimerHTML = (copy) => {
  if (copy.disclaimer && copy.disclaimer !== "") {
    return (
      <BottomSection className="text-center row">
        <small className="promo--legal">{copy.disclaimer}</small>
      </BottomSection>
    );
  }
  return [];
};

const CountdownHTML = ({data, state}) => {
  const bg = data.background;
  const midSectionClass = "mkwp--wrapper row flagship component small-collapse componentCountdown " + bg.color;
  const divClass = "type-wrapper align-center margin-top-20 margin-bottom-20 margin-top-30-tablet margin-bottom-30-tablet width-100 " + data.copy.textColor;
  const HTML = (
    <section className="mkwpdev mkwp">
      <MidSection className={midSectionClass} mobile={bg.mobile} desktop={bg.desktop}>
        <div className="columns small-12">
          <figure className="gallery promo--gallery align-center">
            <div className={divClass} aria-atomic="true">
              {headlineHTML(data.copy.headline)}
              {countdownType2HTML(data.copy, data.positionType, state.after)}
              <div className="countdown-clock-wrapper type-padding-top padding-top-30-tablet text-center width-70-tablet" tabIndex="-1" aria-hidden="true">
                <div className="countdown-clock">
                  <div className="type-headline-mmk-countdown">{state.days}</div>
                  <div className="type-headline-mens-1">:</div>
                  <div className="type-headline-mmk-countdown">{state.hours}</div>
                  <div className="type-headline-mens-1">:</div>
                  <div className="type-headline-mmk-countdown">{state.minutes}</div>
                  <div className="type-headline-mens-1">:</div>
                  <div className="type-headline-mmk-countdown">{state.seconds}</div>
                </div>
                <div className="countdown-format" aria-hidden="true">
                  <div className="type-copy-product">Days</div>
                  <div></div>
                  <div className="type-copy-product">Hours</div>
                  <div></div>
                  <div className="type-copy-product">Minutes</div>
                  <div></div>
                  <div className="type-copy-product">Seconds</div>
                </div>
              </div>
              {countdownType1HTML(data.copy, data.positionType, state.after)}
            </div>
          </figure>
          <div className="countdown-clock-text" aria-hidden="false" role="alert" aria-live="assertive"></div>
        </div>
      </MidSection>
      {disclaimerHTML(data.copy)}
    </section>
  );
  return HTML;
};

export default CountdownHTML;

const BottomSection = Styled.section`
  margin-top: 3px !important;;
`;

const MidSection = Styled.section`
  background-image: url(${props => props.mobile});
  @media (min-width: 768px) {
    background-image: url(${props => props.desktop});
  }
`;
