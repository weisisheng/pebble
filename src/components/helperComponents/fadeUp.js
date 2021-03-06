import React from 'react';

import { Spring, animated, config } from 'react-spring';

const FadeUp = ({ fadeUp, children }) => (
  <Spring
    native
    items={fadeUp}
    from={{ opacity: 0, transform: 'translateY(150px)' }}
    to={{
      opacity: 1,
      transform: fadeUp ? 'translateY(0px)' : 'translateY(150px)',
    }}
    config={config.slow}
  >
    {props => <animated.div style={props}>{children}</animated.div>}
  </Spring>
);

export default FadeUp;
