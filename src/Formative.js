// @flow

import React from 'react';
import update from 'immutability-helper';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import FormativeCounter from './FormativeCounter';
import FormativeNavigation from './FormativeNavigation';
import FormativeProgress from './FormativeProgress';
import FormativeItem from './FormativeItem';
import FormativeReview from './FormativeReview';

const childFactoryCreator = classNames => child => React.cloneElement(child, {
  classNames,
});

type Props = {
  animated?: boolean,
  animation?: string,
  className: string,
  fields: Array<{ value: string, name: string }>,
  onSubmit: () => mixed,
};

type State = {
  index: number,
  total: number,
  fields: Array<{ value: string, name: string }>,
  animationClass: string,
  review: boolean,
};

class Formative extends React.Component<Props, State> {
  static defaultProps = {
    animated: false,
    animation: 'fade',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      index: 0,
      total: 0,
      fields: props.fields,
      animationClass: 'from-bottom',
      review: false,
    };
  }

  nextField = () => {
    // @TODO double check if user has gone back
    const { fields, index, total } = this.state;
    if (fields[index].value) {
      this.setState(
        {
          index: index + 1,
          total: total + 1,
          animationClass: 'from-bottom',
        },
        () => {
          if (index === fields.length) {
            const this2 = this;
            setTimeout(() => {
              this2.setState({
                review: true,
              });
            }, 1000);
          }
        },
      );
    }
  };

  prevField = () => {
    const { index } = this.state;
    this.setState(
      {
        animationClass: 'from-top',
      },
      () => {
        this.setState({
          index: index - 1,
        });
      },
    );
  };

  handleChange = (event: SyntheticEvent<HTMLInputElement>, index: number) => {
    const fields = this.state;
    this.setState({
      fields: update(fields, {
        [index]: {
          value: { $set: event.currentTarget.value },
        },
      }),
    });
  };

  navigate = (key: number) => {
    const { index } = this.state;
    let animationClass;
    if (key < index) {
      animationClass = 'from-top';
    } else if (key > index) {
      animationClass = 'from-bottom';
    }
    this.setState({ index, animationClass });
  };

  render() {
    const {
      index, fields, total, animationClass, review,
    } = this.state;
    const { className, onSubmit } = this.props;
    const isFinished = index === fields.length;

    if (review) {
      return (
        <TransitionGroup className={className}>
          <CSSTransition
            key={index}
            classNames="f-a-from-bottom-"
            timeout={500}
            mountOnEnter
            unmountOnExit
            appear
          >
            <FormativeReview
              fields={fields}
              className={`${className} f-c-form`}
              handleChange={this.handleChange}
              onSubmit={onSubmit}
            />
          </CSSTransition>
        </TransitionGroup>
      );
    }

    return (
      <form className={`${className} f-c-form`}>
        <div
          className={`f-c-form__inner ${isFinished ? 'f-a-fade-exit f-a-fade-exit-active' : ''}`}
        >
          <FormativeCounter fields={fields} index={index} animationClass={animationClass} />
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
                mountOnEnter
                unmountOnExit
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
            disabled={fields[index] && !fields[index].value}
          >
            Continue
          </button>
        </div>
      </form>
    );
  }
}

export default Formative;
