import React from 'react';
import PropTypes from 'proptypes';
import FormativeItem from './FormativeItem';

const DOMExclusions = ['nextField', 'handleChange'];

class FormativeReview extends React.Component {
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
      <form className={this.props.className}>
        <ul className="f-c-list">
          {this.props.fields.map((field, index) => {
            return (
              <FormativeItem
                className="f-c-list__item--review"
                {...field}
                key={index}
                handleChange={event => this.props.handleChange(event, index)}
              />
            );
          })}
        </ul>
      </form>
    );
  }
}

export default FormativeReview;
