import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class AsyncContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
    };

    this.renderCircularProgress = this.renderCircularProgress.bind(this);
  }

  componentWillMount() {
    return this.props.promise()
      .then(() => this.setState({loading: false}))
      .catch((err) => this.setState({loading: false, error: true}));
  }

  renderCircularProgress() {
    return (<CircularProgress
        className="loading"
        size={this.props.spinnerSize}
        thickness={this.props.spinnerThickness}
      />);
  }

  render() {
    let asyncSubject;

    if (this.state.loading) {
      asyncSubject = this.renderCircularProgress();
    } else {
      asyncSubject = this.state.error ? this.props.renderOnReject() : this.props.renderOnResolve();
    }

    return (<div>{asyncSubject}</div>);
  }
}
