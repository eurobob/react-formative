import React from 'react';

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
    return (
      <div>
        {this.props.children[index]}
        {index > 0 && <button onClick={this.prevItem}>Back</button>}
        <button onClick={this.nextItem}>Next</button>
      </div>
    );
  }
}

export default Formative;
