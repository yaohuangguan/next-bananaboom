import React from 'react'
class ClientOnly extends React.Component {
  state = {
    isClient: false,
  };

  componentDidMount() {
    this.setState({
      isClient: true,
    });
  }

  render() {
    const { isClient } = this.state;
    const { children } = this.props;

    return isClient ? children : false;
  }
}

export default ClientOnly