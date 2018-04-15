import React from 'react';
import PropTypes from 'proptypes';

const DOMExclusions = ['nextField', 'handleChange'];

class FormativeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldProps: this.validateFieldProps(props),
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fieldProps: this.validateFieldProps(nextProps),
    });
  }

  /**
    Since we are passing down props to a child component we need to remove
    Formative-specific props so they don't appear in the DOM
  */
  validateFieldProps(props) {
    return Object.keys(props).reduce((acc, key) => {
      if (key && DOMExclusions.indexOf(key) < 0) {
        return Object.assign(acc, { [key]: props[key] });
      }
      return acc;
    }, {});
  }

  handleKeyPress(event) {
    // @TODO allow shift+enter for new line
    if (event.key == 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      this.props.nextField();
    }
  }

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
                onKeyPress: this.handleKeyPress,
              },
              [
                React.createElement(
                  this.props.element,
                  Object.assign(option, {
                    key: `${this.props.name}-input-${key}`,
                    type: 'radio',
                    name: this.props.name,
                    hidden: true,
                    onChange: this.props.handleChange,
                    checked: selected ? true : false,
                  }),
                ),
                <span key={`${this.props.name}-span-${key}`}>
                  {option.label}
                </span>,
              ],
            );
          })}
        {!this.props.options &&
          React.createElement(
            this.props.element,
            Object.assign(this.state.fieldProps, {
              onKeyPress: this.handleKeyPress,
              onChange: this.props.handleChange,
              id: this.props.name,
              className: 'f-c-input',
              autoFocus: this.props.autoFocus,
            }),
          )}
      </li>
    );
  }
}

FormativeItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  element: PropTypes.string,
};

FormativeItem.defaultProps = {
  name: '',
  label: null,
  value: '',
  type: 'text',
  element: 'input',
  autoFocus: true,
};

export default FormativeItem;
