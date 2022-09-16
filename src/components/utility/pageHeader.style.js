import styled from 'styled-components';
import { palette } from 'styled-theme';

import WithDirection from '@iso/lib/helpers/rtl';

const WDComponentTitleWrapper = styled.h1`
  font-size: 19px;
  font-weight: 500;
  color: ${palette('secondary', 2)};
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;

  @media only screen and (max-width: 767px) {
    margin: 0 10px;
    margin-bottom: 30px;
  }
`;

const ComponentTitleWrapper = WithDirection(WDComponentTitleWrapper);

export { ComponentTitleWrapper };
