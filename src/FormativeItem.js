import React from 'react';
import PropTypes from 'proptypes';

const DOMExclusions = ['fElement', 'fHeading', 'fComponent', 'fFields'];

class FormativeItem extends React.Component {
  constructor() {
    super();
  }
  validateChildProps(props) {
    return Object.keys(props).reduce((acc, key) => {
      if (key && DOMExclusions.indexOf(key) < 0) {
        return Object.assign(acc, { [key]: props[key] });
      }
      return acc;
    }, {});
  }
  render() {
    const {
      fHeading,
      fComponent,
      fElement,
      name,
      value,
      label,
      type,
      component,
    } = this.props;
    const childProps = this.validateChildProps(this.props);

    let child;
    if (fComponent) {
      child = React.createElement(fComponent, childProps);
    } else {
      child = React.createElement(fElement, childProps);
    }

    return (
      <div>
        <h2>{fHeading}</h2>
        {(type === 'checkbox' || type === 'radio') && (
          <label>
            {child}
            {label || name}
          </label>
        )}
        {type !== 'checkbox' &&
          type !== 'radio' && (
            <label>
              {label || name}
              {child}
            </label>
          )}
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
  type: 'text',
  fElement: 'input',
  fHeading: null,
  fComponent: null,
  fFields: [],
};

export default FormativeItem;
