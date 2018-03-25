import React from 'react';
import PropTypes from 'proptypes';
import update from 'immutability-helper';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import FormativeCounter from './FormativeCounter';
import FormativeNavigation from './FormativeNavigation';
import FormativeProgress from './FormativeProgress';
import FormativeItem from './FormativeItem';
import FormativeReview from './FormativeReview';

const childFactoryCreator = classNames => child =>
  React.cloneElement(child, {
    classNames,
  });

class Formative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 3,
      total: 0,
      fields: props.fields,
      animationClass: 'from-bottom',
    };
    this.nextField = this.nextField.bind(this);
    this.prevField = this.prevField.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.navigate = this.navigate.bind(this);
  }
  nextField() {
    // @TODO double check if user has gone back
    if (this.state.fields[this.state.index].value) {
      this.setState({
        index: this.state.index + 1,
        total: this.state.total + 1,
        animationClass: 'from-bottom',
      });
    }
  }
  prevField() {
    this.setState(
      {
        animationClass: 'from-top',
      },
      () => {
        this.setState({
          index: this.state.index - 1,
        });
      },
    );
  }
  handleChange(event, index) {
    this.setState({
      fields: update(this.state.fields, {
        [index]: {
          value: { $set: event.target.value },
        },
      }),
    });
  }
  navigate(index) {
    let animationClass;
    if (index < this.state.index) {
      animationClass = 'from-top';
    } else if (index > this.state.index) {
      animationClass = 'from-bottom';
    }
    this.setState({ index, animationClass });
  }
  render() {
    const { index, fields, total, animationClass } = this.state;

    if (this.state.index === this.state.fields.length) {
      return (
        <FormativeReview
          fields={fields}
          className={`${this.props.className} f-c-form`}
          handleChange={this.handleChange}
        />
      );
    }

    return (
      <form className={`${this.props.className} f-c-form`}>
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
          className="f-c-list">
          <CSSTransition
            key={index}
            classNames={`f-a-${animationClass}-`}
            timeout={500}
            mountOnEnter={true}
            unmountOnExit={true}>
            <FormativeItem
              {...fields[index]}
              key={index}
              nextField={this.nextField}
              handleChange={event => this.handleChange(event, index)}
            />
          </CSSTransition>
        </TransitionGroup>
        <button
          className="f-c-button f-c-button--continue"
          type="button"
          onClick={this.nextField}
          disabled={!this.state.fields[this.state.index].value}>
          Continue
        </button>
      </form>
    );
  }
}

Formative.propTypes = {
  animated: PropTypes.bool,
  animation: PropTypes.string,
};

Formative.defaultProps = {
  animated: false,
  animation: 'fade',
};

export default Formative;
