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
      this.props.nextField();
    }
  }

  render() {
    return (
      <li className="f-c-list__item">
        {this.props.label && (
          <label htmlFor={this.props.name} className="f-c-label">
            {this.props.label}
          </label>
        )}
        {React.createElement(
          this.props.element,
          Object.assign(
            {
              onKeyPress: this.handleKeyPress,
              onChange: this.props.handleChange,
              id: this.props.name,
              className: 'f-c-input',
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
