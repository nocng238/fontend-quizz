import React, { useState } from 'react';
const useForceUpdate = () => {
  const [value, setValue] = useState(true); // integer state
  return () => setValue(!value); // update state to force render
  // An function that increment 👆🏻 the previous state like here
  // is better than directly setting `value + 1`
};
export default useForceUpdate;
