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
    const { animated, animation } = this.props;
    return (
      <div>
        {animated && (
          <TransitionGroup>
            <CSSTransition key={index} timeout={1000} classNames={animation}>
              {this.props.children[index]}
            </CSSTransition>
          </TransitionGroup>
        )}
        {!animated && this.props.children[index]}
        {index > 0 && <button onClick={this.prevItem}>Back</button>}
        <button onClick={this.nextItem}>Next</button>
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
