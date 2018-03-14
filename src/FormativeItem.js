import React from 'react';

class FormativeItem extends React.Component {
  constructor() {
    super();
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default FormativeItem;
