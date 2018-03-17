import React from 'react';
import PropTypes from 'proptypes';

const DOMExclusions = ['nextField'];

class FormativeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldProps: this.validateFieldProps(props),
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
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
      this.props.nextField();
    }
  }

  render() {
    return (
      <li>
        <label htmlFor="">{this.props.label}</label>
        {React.createElement(
          this.props.element,
          Object.assign(
            {
              onKeyPress: this.handleKeyPress,
            },
            this.state.fieldProps,
          ),
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
};

export default FormativeItem;
