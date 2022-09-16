import styled from 'styled-components';
import { palette } from 'styled-theme';

import BoxComponent from '@iso/components/utility/box';

export const BoxWrapper = styled(BoxComponent)`
  .isoInvoiceTableBtn {
    display: flex;
    margin-bottom: 20px;
    a {
      margin-left: auto;
    }
  }
`;

export const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const FiltersBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Filters = styled.h2`
  font-size: 14px;
  color: #788195;
  font-family: 'Roboto';
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > span {
    padding: 0.5rem 1rem;
    cursor: pointer;

    @media only screen and (max-width: 767px) {
      padding: 0.5rem;
    }
  }
  .ant-checkbox-group-item {
    display: block;
  }
  i.anticon {
    color: #aeb0c1;
    margin-left: 8px;
  }

  @media only screen and (max-width: 767px) {
    flex-shrink: 0;
  }
`;

export const StatusTag = styled.span`
  padding: 0 5px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  background-color: ${palette('primary', 0)};
  font-size: 12px;
  color: #ffffff;
  text-transform: capitalize;

  &.pending {
    background-color: ${palette('error', 0)};
  }

  &.shipped {
    background-color: ${palette('warning', 0)};
  }

  &.delivered {
    background-color: ${palette('success', 0)};
  }
`;

const CardWrapper = styled.div`
  width: auto;
  overflow: inherit;
  position: relative;
  .isoInvoiceTable {
    table {
      tbody {
        tr {
          td {
            .isoInvoiceBtnView {
              display: flex;
              flex-direction: row;
              > a {
                margin: ${(props) =>
                  props['data-rtl'] === 'rtl' ? '0 0 0 15px' : '0 15px 0 0'};
              }
            }
          }
        }
      }
    }
  }

  .invoiceListTable {
    .ant-dropdown-menu-item,
    .ant-dropdown-menu-submenu-title {
      &:hover {
        background-color: ${palette('secondary', 1)};
      }
    }

    .invoiceViewBtn {
      color: ${palette('text', 3)};

      &:hover {
        color: ${palette('primary', 0)};
      }
    }

    .invoiceDltBtn {
      font-size: 18px;
      border: 0;
      color: ${palette('error', 0)};

      &:hover {
        border: 0;
        color: ${palette('error', 2)};
      }
    }
  }
`;

export default CardWrapper;
