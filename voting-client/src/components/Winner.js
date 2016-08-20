import React, { Component } from 'react';

export default class Voting extends Component {
  render() {
    return (
      <div className="winner">
        Winner is {this.props.winner}!
      </div>
    );
  }
}
