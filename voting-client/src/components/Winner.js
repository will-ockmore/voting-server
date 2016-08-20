import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Voting extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div className="winner">
        Winner is {this.props.winner}!
      </div>
    );
  }
}
