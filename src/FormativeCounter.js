import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const childFactoryCreator = classNames => child =>
  React.cloneElement(child, {
    classNames,
  });

function FormativeCounter(props) {
  if (props.index < props.fields.length) {
    return (
      <div className="f-c-counter">
        <TransitionGroup
          childFactory={childFactoryCreator(`f-a-${props.animationClass}-`)}
          component="span"
          className="f-c-counter__incrementor">
            <CSSTransition
              key={props.index}
              classNames={`f-a-${props.animationClass}-`}
              timeout={500}
              mountOnEnter={true}
              unmountOnExit={true}>
              <span className="f-c-counter__number">{props.index + 1}</span>
            </CSSTransition>
        </TransitionGroup>
        <span>{` / ${props.fields.length}`}</span>
      </div>
  )} else {
    return (
      <div className="f-c-counter">
        <span className="f-c-counter__incrementor">
          <span className="f-c-counter__number">{props.fields.length}</span>
        </span>
        <span>{` / ${props.fields.length}`}</span>
      </div>
    )
  };
}

export default FormativeCounter;
