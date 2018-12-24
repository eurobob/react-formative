// @flow

import React from 'react';

const DOMExclusions = ['nextField', 'handleChange'];

type Props = {
  autoFocus: boolean,
  name: string,
  label: string | boolean,
  value: string,
  type: string,
  element: string,
  nextField?: () => mixed,
  handleChange: (event: SyntheticKeyboardEvent<HTMLInputElement>) => mixed,
  className: string,
  options?: Array<{
    value: string,
    label: string
  }>
};

type State = {
  fieldProps: {}
};

class FormativeItem extends React.Component<Props, State> {
  state = {
    fieldProps: this.validateFieldProps(this.props)
  };

  static defaultProps = {
    name: '',
    label: false,
    value: '',
    type: 'text',
    element: 'input',
    autoFocus: true,
    className: ''
  };

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      fieldProps: this.validateFieldProps(nextProps)
    });
  }

  /**
    Since we are passing down props to a child component we need to remove
    Formative-specific props so they don't appear in the DOM
  */
  validateFieldProps(props: Props) {
    return Object.keys(props).reduce((acc, key) => {
      if (key && DOMExclusions.indexOf(key) < 0) {
        return Object.assign(acc, { [key]: props[key] });
      }
      return acc;
    }, {});
  }

  handleKeyPress = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    // @TODO allow shift+enter for new line
    if (event.key == 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      this.props.nextField && this.props.nextField();
    }
  };

  render() {
    return (
      <li className={`${this.props.className} f-c-list__item`}>
        {this.props.label && (
          <label htmlFor={this.props.name} className="f-c-label">
            {this.props.label}
          </label>
        )}
        {this.props.options &&
          this.props.options.map((option, key) => {
            const selected = option.value === this.props.value;
            return React.createElement(
              'label',
              {
                key: `${this.props.name}-label-${key}`,
                className: `f-c-label--radio ${selected ? '-checked' : ''}`,
                onKeyPress: this.handleKeyPress
              },
              [
                React.createElement(
                  this.props.element,
                  Object.assign({}, option, {
                    key: `${this.props.name}-input-${key.toString()}`,
                    type: 'radio',
                    name: this.props.name,
                    hidden: true,
                    onChange: this.props.handleChange,
                    checked: selected ? true : false
                  })
                ),
                <span key={`${this.props.name}-span-${key}`}>
                  {option.label}
                </span>
              ]
            );
          })}
        {!this.props.options &&
          React.createElement(
            this.props.element,
            Object.assign({}, this.state.fieldProps, {
              onKeyPress: this.handleKeyPress,
              onChange: this.props.handleChange,
              id: this.props.name,
              className: 'f-c-input',
              autoFocus: this.props.autoFocus
            })
          )}
      </li>
    );
  }
}

export default FormativeItem;
