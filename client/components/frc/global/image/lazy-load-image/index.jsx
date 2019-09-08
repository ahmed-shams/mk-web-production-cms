import React, { Component } from 'react';
import 'intersection-observer';
import LazyImage from './lazyload';

class LazyLoadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: false,
      intersectionObserver: false
    };
    this.verifyClient = this.verifyClient.bind(this);
  }

  componentDidMount() {
    this.verifyClient();
  }

  verifyClient() {
    if (typeof window !== 'undefined') {
      this.setState({ client: true });
    }
    if ("IntersectionObserver" in window) {
      this.setState({ intersectionObserver: true });
    }
  }

  render() {
    const { client, intersectionObserver } = this.state;
    const { info } = this.props;
    if (client && intersectionObserver) {
      return <LazyImage info={info} />;
    }
    return null;
  }
}

export default LazyLoadImage;
