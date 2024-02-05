import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavigation = styled.nav`
  display: flex;
  gap: 1.5em;
  align-items: center;
  color: #222;

  .nav__link {
    transition: opacity 0.5s ease;
    &:hover {
      opacity: 0.6;
    }
    &.active {
      text-decoration: underline;
    }
  }
`;

const Navigation = () => {
  return (
    <StyledNavigation className="nav">
      <NavLink to={'/'} className={({ isActive }) => (isActive ? 'nav__link active' : 'nav__link')}>
        Список товаров
      </NavLink>
    </StyledNavigation>
  );
};

export default Navigation;
