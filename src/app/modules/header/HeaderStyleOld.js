import styled from "styled-components";

export const MobileStyle = styled.div`
  .nav-phone-icon {
    cursor: pointer;
    display: none;
    height: 22px;
    position: absolute;
    left: 20px;
    top: 25px;
    width: 16px;
    z-index: 1;
  }

  .nav-phone-icon {
    display: block;
  }

  .nav-phone-icon::before {
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 6px 0 0 #fff, 0 12px 0 0 #fff;
    content: "";
    display: block;
    height: 2px;
    position: absolute;
    width: 20px;
  }
`;

export const HeaderStyle = styled.div`
  .ant-drawer-body {
    padding-left: 0;
    padding-top: 16px;
  }

  .ant-drawer-content {
    background: #001528;
  }
`;
