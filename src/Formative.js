import React from 'react';
import PropTypes from 'proptypes';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Formative extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
    this.nextItem = this.nextItem.bind(this);
    this.prevItem = this.prevItem.bind(this);
  }
  nextItem() {
    this.setState({ index: this.state.index + 1 });
  }
  prevItem() {
    this.setState({ index: this.state.index - 1 });
  }
  render() {
    const { index } = this.state;
    const { animated, animation, children } = this.props;
    return (
      <div>
        {animated && (
          <TransitionGroup>
            <CSSTransition key={index} timeout={1000} classNames={animation}>
              {children[index]}
            </CSSTransition>
          </TransitionGroup>
        )}
        {!animated && children[index]}
        {index > 0 && (
          <button type="button" onClick={this.prevItem}>
            Back
          </button>
        )}
        {index < children.length - 1 && (
          <button type="button" onClick={this.nextItem}>
            Next
          </button>
        )}
        {index === children.length - 1 && <button type="submit">Finish</button>}
      </div>
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
