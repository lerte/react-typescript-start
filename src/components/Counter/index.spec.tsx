import * as React from 'react';
import { shallow } from 'enzyme';
import Counter from '.';

const renderComponent = () => shallow(
  <Counter>
    +
  </Counter>
);

describe('<Counter />', () => {
  it('should render an <Counter> tag', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.type()).toEqual('div');
  });
});
