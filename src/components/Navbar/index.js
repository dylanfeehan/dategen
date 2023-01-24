import React from 'react';
import HomeLogo from '../../homelogo'
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          {/*<NavLink to="/" >Home</NavLink>*/}
          <HomeLogo/>
          <NavLink to="/about" >About</NavLink>
          <NavLink to="/contact" >Contact Me</NavLink>
          <NavLink to="/blogs" >Blogs</NavLink>
          <NavLink to="/sign-up" >Sign Up</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;