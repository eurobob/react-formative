import React from 'react';

class Formative extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
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
        {index > 0 && <button>Back</button>}
      </div>
    );
  }
}

export default Formative;
