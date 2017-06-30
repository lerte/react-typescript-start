import * as React from 'react';
import { shallow } from 'enzyme';
import Button from '.';

const renderComponent = () => shallow(
  <Button>
    +
  </Button>
);

describe('<Button />', () => {
  it('should render an <Button> tag', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.type()).toEqual('button');
  });
});
