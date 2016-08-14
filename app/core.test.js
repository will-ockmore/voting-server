import { expect } from 'chai';
import { Map, List, fromJS } from 'immutable';

import { setEntries, next, vote } from './core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds entries to the state', () => {
      let state = Map();
      const entries = ['Trainspotting', '28 Days Later'];
      let nextState = setEntries(state, entries);

      expect(nextState).to.equal(fromJS({
        entries: ['Trainspotting', '28 Days Later']
      }));
    });

  });

  describe('next', () => {

    it('picks the next two entries to be put to vote', () => {
      const state = fromJS({
        entries: ['Trainspotting', '28 Days Later', 'Sunshine']
      });
      const nextState = next(state);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later']
        },
        entries: ['Sunshine']
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {
            Trainspotting: 4,
            '28 Days Later': 2
          }
        },
        entries: ['Millions', '127 Hours', 'Sunshine']
      });
      const nextState = next(state);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Millions', '127 Hours']
        },
        entries: ['Sunshine', 'Trainspotting']
      }));
    });


    it('puts both from tied vote back into entries', () => {
      const state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {
            Trainspotting: 4,
            '28 Days Later': 4
          }
        },
        entries: ['Millions', '127 Hours', 'Sunshine']
      });
      const nextState = next(state);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Millions', '127 Hours']
        },
        entries: ['Sunshine', 'Trainspotting', '28 Days Later']
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'Trainspotting'
      }));
    });

  });

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
        pair: List.of('Trainspotting', '28 Days Later')
      });
      const nextState = vote(state, 'Trainspotting')
      expect(nextState).to.equal(Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 1
        })
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 3,
          '28 Days Later': 2
        })
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 4,
          '28 Days Later': 2
        })
      }));
    });

 });

});
