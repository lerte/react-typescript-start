import * as React from 'react';
import { render } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import { App } from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<App />, div);
  });

  describe('handle counter state', () => {
    const app = renderIntoDocument(<App />);

    it('should start at 0', () => {
      const expected = 0;

      expect(app.state.counter).toBe(expected);
    });

    it('should increment by one', () => {
      const expected = 1;

      app.increment();

      expect(app.state.counter).toBe(expected);
    });

    it('should decrement by one', () => {
      const expected = 0;

      app.decrement();

      expect(app.state.counter).toBe(expected);
    });
  });
});
