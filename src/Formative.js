import React from 'react';
import PropTypes from 'proptypes';
import FormativeCounter from './FormativeCounter';
import FormativeNavigation from './FormativeNavigation';
import FormativeProgress from './FormativeProgress';
import FormativeItem from './FormativeItem';

class Formative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      fields: props.fields,
    };
    this.nextField = this.nextField.bind(this);
    this.prevField = this.prevField.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.navigate = this.navigate.bind(this);
  }
  nextField() {
    this.setState({ index: this.state.index + 1 });
  }
  prevField() {
    this.setState({ index: this.state.index - 1 });
  }
  handleChange(event) {
    this.setState({
      fields: {
        ...this.state.fields,
        [event.target.name]: {
          ...this.state.fields[event.target.name],
          value: event.target.value,
        },
      },
    });
  }
  navigate(index) {
    console.log(index);
    this.setState({ index });
  }
  render() {
    const { index, fields } = this.state;
    const fieldNames = Object.keys(fields);

    return (
      <form className={`${this.props.className} f-c-form`}>
        <FormativeCounter fields={fieldNames} index={index} />
        <FormativeProgress fields={fieldNames} index={index} />
        <FormativeNavigation
          fields={fieldNames}
          index={index}
          navigate={this.navigate}
        />
        <ul style={{ listStyle: 'none' }}>
          {fieldNames.map(name => (
            <FormativeItem
              key={name}
              {...fields[name]}
              name={name}
              nextField={this.nextField}
              handleChange={this.handleChange}
            />
          ))}
        </ul>
        <button type="button" onClick={this.nextField}>
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
