import React from 'react';

class FormativeItem extends React.Component {
  constructor() {
    super();
  }
  render() {
    return <div style={{ position: 'absolute' }}>{this.props.children}</div>;
  }
}

export default FormativeItem;
