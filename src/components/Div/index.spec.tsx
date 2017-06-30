import * as React from 'react';
import { shallow } from 'enzyme';
import Div from '.';

const renderComponent = () => shallow(
  <Div>
    +
  </Div>
);

describe('<Div />', () => {
  it('should render an <Div> tag', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.type()).toEqual('div');
  });
});
