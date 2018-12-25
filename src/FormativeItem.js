// @flow

import React from 'react';

const DOMExclusions = ['nextField', 'handleChange'];

/**
  Since we are passing down props to a child component we need to remove
  Formative-specific props so they don't appear in the DOM
*/
const validateFieldProps = props => Object.keys(props).reduce((acc, key) => {
  if (key && DOMExclusions.indexOf(key) < 0) {
    return Object.assign(acc, { [key]: props[key] });
  }
  return acc;
}, {});

type Props = {
  autoFocus?: boolean,
  name: string,
  label?: string | boolean,
  value?: string,
  element: string,
  nextField: () => mixed | null,
  handleChange: (event: SyntheticKeyboardEvent<HTMLInputElement>) => mixed,
  className: string,
  options: Array<{
    value: string,
    label: string,
  }>,
};

type State = {
  fieldProps: {},
};

class FormativeItem extends React.Component<Props, State> {
  state = {
    fieldProps: validateFieldProps(this.props),
  };

  static defaultProps = {
    name: '',
    label: false,
    value: '',
    type: 'text',
    element: 'input',
    autoFocus: true,
    nextField: () => {},
    className: '',
    options: [],
  };

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      fieldProps: validateFieldProps(nextProps),
    });
  }

  handleKeyPress = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    // @TODO allow shift+enter for new line
    const { nextField } = this.props;
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      nextField();
    }
  };

  render() {
    const {
      className, label, name, options, value, handleChange, element, autoFocus,
    } = this.props;
    const { fieldProps } = this.state;
    return (
      <li className={`${className} f-c-list__item`}>
        {label && (
          <label htmlFor={name} className="f-c-label">
            {label}
          </label>
        )}
        {!!options.length
          && options.map((option) => {
            const selected = option.value === value;
            return React.createElement(
              'label',
              {
                key: `${name}-label-${option.label}`,
                className: `f-c-label--radio ${selected ? '-checked' : ''}`,
                onKeyPress: this.handleKeyPress,
              },
              [
                React.createElement(
                  element,
                  Object.assign({}, option, {
                    key: `${name}-input-${option.label}`,
                    type: 'radio',
                    name,
                    hidden: true,
                    onChange: handleChange,
                    checked: !!selected,
                  }),
                ),
                <span key={`${name}-span-${option.label}`}>{option.label}</span>,
              ],
            );
          })}
        {!options.length
          && React.createElement(
            element,
            Object.assign({}, fieldProps, {
              onKeyPress: this.handleKeyPress,
              onChange: handleChange,
              id: name,
              className: 'f-c-input',
              autoFocus,
            }),
          )}
      </li>
    );
  }
}

export default FormativeItem;
