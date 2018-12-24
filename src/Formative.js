// @flow

import React from 'react';
import update from 'immutability-helper';
import {
  Transition,
  TransitionGroup,
  CSSTransition
} from 'react-transition-group';

import FormativeCounter from './FormativeCounter';
import FormativeNavigation from './FormativeNavigation';
import FormativeProgress from './FormativeProgress';
import FormativeItem from './FormativeItem';
import FormativeReview from './FormativeReview';

const childFactoryCreator = classNames => child =>
  React.cloneElement(child, {
    classNames
  });

type Props = {
  animated?: boolean,
  animation?: string,
  className: string,
  fields: Array<{ value: string }>,
  onSubmit: () => mixed
};

type State = {
  index: number,
  total: number,
  fields: Array<{ value: string }>,
  animationClass: string,
  review: boolean
};

class Formative extends React.Component<Props, State> {
  state = {
    index: 0,
    total: 0,
    fields: this.props.fields,
    animationClass: 'from-bottom',
    review: false
  };

  static defaultProps = {
    animated: false,
    animation: 'fade'
  };

  nextField = () => {
    // @TODO double check if user has gone back
    if (this.state.fields[this.state.index].value) {
      this.setState(
        {
          index: this.state.index + 1,
          total: this.state.total + 1,
          animationClass: 'from-bottom'
        },
        () => {
          if (this.state.index === this.state.fields.length) {
            const this2 = this;
            setTimeout(() => {
              this2.setState({
                review: true
              });
            }, 1000);
          }
        }
      );
    }
  };
  prevField = () => {
    this.setState(
      {
        animationClass: 'from-top'
      },
      () => {
        this.setState({
          index: this.state.index - 1
        });
      }
    );
  };
  handleChange = (event: SyntheticEvent<HTMLInputElement>, index: number) => {
    this.setState({
      fields: update(this.state.fields, {
        [index]: {
          value: { $set: event.currentTarget.value }
        }
      })
    });
  };
  navigate = (index: number) => {
    let animationClass;
    if (index < this.state.index) {
      animationClass = 'from-top';
    } else if (index > this.state.index) {
      animationClass = 'from-bottom';
    }
    this.setState({ index, animationClass });
  };
  render() {
    const { index, fields, total, animationClass, review } = this.state;
    const isFinished = index === fields.length;

    if (review) {
      return (
        <TransitionGroup className={this.props.className}>
          <CSSTransition
            key={index}
            classNames="f-a-from-bottom-"
            timeout={500}
            mountOnEnter={true}
            unmountOnExit={true}
            appear={true}
          >
            <FormativeReview
              fields={fields}
              className={`${this.props.className} f-c-form`}
              handleChange={this.handleChange}
              onSubmit={this.props.onSubmit}
            />
          </CSSTransition>
        </TransitionGroup>
      );
    }

    return (
      <form className={`${this.props.className} f-c-form`}>
        <div
          className={`f-c-form__inner ${
            isFinished ? 'f-a-fade-exit f-a-fade-exit-active' : ''
          }`}
        >
          <FormativeCounter
            fields={fields}
            index={index}
            animationClass={animationClass}
          />
          <FormativeProgress fields={fields} total={total} />
          <FormativeNavigation
            fields={fields}
            index={index}
            total={total}
            navigate={this.navigate}
          />
          <TransitionGroup
            childFactory={childFactoryCreator(`f-a-${animationClass}-`)}
            component="ul"
            className="f-c-list"
          >
            {fields[index] && (
              <CSSTransition
                key={index}
                classNames={`f-a-${animationClass}-`}
                timeout={500}
                mountOnEnter={true}
                unmountOnExit={true}
              >
                <FormativeItem
                  {...fields[index]}
                  key={index}
                  nextField={this.nextField}
                  handleChange={event => this.handleChange(event, index)}
                />
              </CSSTransition>
            )}
          </TransitionGroup>
          <button
            className="f-c-button f-c-button--continue"
            type="button"
            onClick={this.nextField}
            disabled={
              this.state.fields[this.state.index] &&
              !this.state.fields[this.state.index].value
            }
          >
            Continue
          </button>
        </div>
      </form>
    );
  }
}

export default Formative;
