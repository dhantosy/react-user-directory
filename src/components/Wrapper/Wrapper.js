import React from 'react';
import StylesWrapper from './Wrapper.module.scss';

const Wrapper = (props) => (
  <main className={`${StylesWrapper.wrapper}`}>
    {props.children}
  </main>
)

export default Wrapper
