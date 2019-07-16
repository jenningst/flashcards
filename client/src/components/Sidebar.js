import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as Close } from '../components/icons/svg/error.svg'

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

function Sidebar({ isOpen, toggleOpen }) {
  return (
    <SidebarWrapper
      className={`Sidebar${isOpen ? '--open' : ''}`}
    >
      <CloseIcon onClick={toggleOpen} />
      I am a sidebar
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  visibility: hidden;
  width: 0;
  height: 100%;

  &[class*="--open"] {
    width: 200px;
    visibility: visible;
  }
`;

const CloseIcon = styled(Close)`
  height: 2rem;
  width: 2rem;
`;

export default Sidebar;