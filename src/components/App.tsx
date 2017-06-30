import * as React from 'react';
import styled from 'styled-components';

import Button from './Button';
import Div from './Div';
import Wrapper from './Wrapper';
import Couter from './Counter';

export class App extends React.Component<any, any> {
  private counter: number;
  constructor() {
    super();

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.state = { counter: 0};
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  decrement() {
    this.setState({
      counter: this.state.counter - 1
    });
  }

  render() {
    return (
      <Div>
        <Wrapper>
          <Button onClick={this.decrement}>-</Button>
          <Couter>{this.state.counter}</Couter>
          <Button onClick={this.increment}>+</Button>
        </Wrapper>
      </Div>  
    );
  }
}
