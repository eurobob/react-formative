// @flow

import React from 'react';
import Upload from './assets/svg/upload.svg';

const DOMExclusions = ['nextField', 'handleChange', 'handleOptionKeyPress', 'review'];
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

/**
  Since we are passing down props to a child component we need to remove
  Formative-specific props so they don't appear in the DOM
*/
const validateFieldProps = props => Object.keys(props).reduce((acc, key) => {
  if (key === 'value' && props.type === 'file') {
    return acc;
  }
  if (key && DOMExclusions.indexOf(key) < 0) {
    return Object.assign(acc, { [key]: props[key] });
  }
  return acc;
}, {});

type Props = {
  autoFocus?: boolean,
  name: string,
  label?: string | boolean,
  review?: boolean,
  value?: string,
  type?: string,
  file: {
    preview: string,
  },
  element: string,
  nextField: () => mixed | null,
  handleChange: (event: SyntheticKeyboardEvent<HTMLInputElement>, index: number) => mixed,
  handleOptionKeyPress: (value: number) => mixed,
  className: string,
  options: Array<{
    value: string,
    label: string,
  }>,
};

type State = {
  fieldProps: {
    file: {
      name: any,
    },
  },
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
    review: false,
    nextField: () => {},
    className: '',
    options: [],
  };

  componentDidMount() {
    const { options } = this.props;
    if (options.length) {
      window.addEventListener('keydown', this.handleKeyPress);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      fieldProps: validateFieldProps(nextProps),
    });
  }

  componentWillUnmount() {
    const { options } = this.props;
    if (options.length) {
      window.removeEventListener('keydown', this.handleKeyPress);
    }
  }

  handleKeyPress = (event: SyntheticKeyboardEvent<>) => {
    const {
      options, handleOptionKeyPress, nextField, review,
    } = this.props;
    if (!review) {
      const alphabetIndex = alphabet.indexOf(event.key);
      if (alphabetIndex !== -1 && alphabetIndex < options.length) {
        handleOptionKeyPress(alphabetIndex);
      } else if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        event.stopPropagation();
        window.removeEventListener('keydown', this.handleKeyPress);
        nextField();
      }
    } else if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      window.removeEventListener('keydown', this.handleKeyPress);
      nextField();
    }
  };

  render() {
    const {
      className,
      label,
      name,
      options,
      value,
      handleChange,
      element,
      autoFocus,
      review,
      file,
      type,
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
          && options.map((option, index) => {
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
                !review && (
                  <span key={`${name}-key-${option.label}`} className="f-c-label--key">
                    {alphabet[index]}
                  </span>
                ),
              ],
            );
          })}
        {!options.length && (
          <div style={{ marginTop: '20px' }}>
            {type === 'file' && (
              <label htmlFor={name} className="f-c-label--file">
                {file && (
                  <img
                    src={window.URL.createObjectURL(file)}
                    alt=""
                    style={{ width: 'auto' }}
                    className="f-c-label--img"
                  />
                )}
                <div className="f-c-label--overlay" style={{ opacity: file ? 0 : 1 }}>
                  <img src={Upload} alt="" style={{ width: '100px' }} />
                </div>
              </label>
            )}
            {React.createElement(
              element,
              Object.assign({}, fieldProps, {
                onKeyPress: this.handleKeyPress,
                onChange: handleChange,
                id: name,
                className: 'f-c-input',
                autoFocus,
              }),
            )}
          </div>
        )}
      </li>
    );
  }
}

export default FormativeItem;
