import React from 'react';
import PropTypes from 'proptypes';

const DOMExclusions = [
  'fElement',
  'fHeading',
  'fComponent',
  'fFields',
  'fHideInput',
  'fNext',
  'fPrev',
  'animated',
  'animation',
  'children',
];

class FormativeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldProps: this.validateFieldProps(props),
    };
    this.renderField = this.renderField.bind(this);
    this.renderFields = this.renderFields.bind(this);
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
    if (event.key == 'Enter') {
      this.props.fNext();
    }
  }

  /**
    Render individual fields.
    @TODO label options to hide, align & wrap
  */
  renderField(element, props = {}) {
    return React.createElement('label', { key: props.key }, [
      React.createElement(
        element,
        Object.assign({}, this.state.fieldProps, props),
      ),
      props.label,
    ]);
  }

  /**
    Render all fields
    @TODO tidy this up for multiple fields
  */
  renderFields() {
    const { fComponent, fElement, fFields, fHideInput } = this.props;
    let props = {
      onKeyPress: this.handleKeyPress,
    };
    if (fFields && fFields.length) {
      if (fHideInput) {
        props = Object.assign(props, {
          hidden: true,
        });
      }
      return fFields.map((field, index) => {
        props = Object.assign(props, {
          key: index,
        });
        if (typeof field === 'string') {
          props = Object.assign(props, {
            value: field,
            label: field,
          });
        } else {
          props = Object.assign(props, field);
        }
        return this.renderField(fComponent || fElement, props);
      });
    } else {
      if (fHideInput) {
        props = Object.assign(props, {
          hidden: true,
        });
      }
      props = Object.assign(props, {
        key: 'bleh',
        label: this.props.label || this.props.name,
      });
      return this.renderField(fComponent || fElement, props);
    }
  }

  render() {
    return (
      <div>
        {this.props.fHeading && <h2>{this.props.fHeading}</h2>}
        {this.renderFields()}
      </div>
    );
  }
}

FormativeItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  fElement: PropTypes.string,
  fHeading: PropTypes.string,
  fComponent: PropTypes.func,
  fFields: PropTypes.array,
};

FormativeItem.defaultProps = {
  name: '',
  label: null,
  value: '',
  // @TODO default props should go in the formative parent
  // type: 'text',
  // fElement: 'input',
  // fFields: [],
};

export default FormativeItem;
