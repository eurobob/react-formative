// @flow

import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const childFactoryCreator = classNames => child =>
  React.cloneElement(child, {
    classNames,
  });

type Props = {
  index: number,
  fields: Array<{
    value: string
  }>,
  animationClass: string,
}

function FormativeCounter(props: Props) {
  const { animationClass, index, fields } = props
  if (index < fields.length) {
    return (
      <div className="f-c-counter">
        <TransitionGroup
          childFactory={childFactoryCreator(`f-a-${animationClass}-`)}
          component="span"
          className="f-c-counter__incrementor">
            <CSSTransition
              key={index}
              classNames={`f-a-${animationClass}-`}
              timeout={500}
              mountOnEnter={true}
              unmountOnExit={true}>
              <span className="f-c-counter__number">{index + 1}</span>
            </CSSTransition>
        </TransitionGroup>
        <span>{` / ${fields.length}`}</span>
      </div>
  )} else {
    return (
      <div className="f-c-counter">
        <span className="f-c-counter__incrementor">
          <span className="f-c-counter__number">{fields.length}</span>
        </span>
        <span>{` / ${fields.length}`}</span>
      </div>
    )
  };
}

export default FormativeCounter;
