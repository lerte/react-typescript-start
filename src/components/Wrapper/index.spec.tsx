import * as React from 'react';
import { shallow } from 'enzyme';
import Wrapper from '.';

const renderComponent = () => shallow(
  <Wrapper>
    +
  </Wrapper>
);

describe('<Wrapper />', () => {
  it('should render an <Wrapper> tag', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.type()).toEqual('div');
  });
});
