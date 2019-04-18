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

type Fields = Array<{
  value: string,
  file: {
    name: string,
  },
  name: string,
  options: Array<{ label: string, value: string }>,
}>;

type Props = {
  animated?: boolean,
  animation?: string,
  className: string,
  fields: Fields,
  onSubmit: Fields => mixed,
  submitText?: String,
};

type State = {
  index: number,
  total: number,
  fields: Fields,
  animationClass: string,
  review: boolean,
};

class Formative extends React.Component<Props, State> {
  static defaultProps = {
    animated: false,
    animation: 'fade',
    submitText: 'Submit',
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
          if (index === fields.length - 1) {
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
    let { value } = event.currentTarget;
    let destination = 'value';
    if (event.currentTarget.files.length) {
      [value] = event.currentTarget.files;
      destination = 'file';
    }
    const { state } = this;
    this.setState(
      update(state, {
        fields: {
          [index]: {
            [destination]: { $set: value },
          },
        },
      }),
    );
  };

  handleOptionKeyPress = (value: number) => {
    const { state } = this;
    const { index } = state;
    const newState = update(state, {
      fields: {
        [index]: {
          value: { $set: state.fields[index].options[value].value },
        },
      },
    });
    this.setState(newState);
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
    const { className, onSubmit, submitText } = this.props;
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
              onSubmit={() => onSubmit(fields)}
              submitText={submitText}
              handleOptionKeyPress={this.handleOptionKeyPress}
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
                  handleOptionKeyPress={this.handleOptionKeyPress}
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
