import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  getPair() {
    return this.props.pair || [];
  }

  getVotes(entry) {
  if (this.props.tally && this.props.tally.has(entry)) {
    return this.props.tally.get(entry);
  }
  return 0;
}

  render() {
    return (
      <div className="results">
        {this.getPair().map(entry =>
          <div key={entry} className="entry">
            <h1>{entry}</h1>
            <div className="voteCount">
              {this.getVotes(entry)}
            </div>
          </div>
        )}
      </div>
    );
  }
}
