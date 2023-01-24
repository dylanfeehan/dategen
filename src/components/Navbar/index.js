import React from 'react';
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/dategen#about" >About</NavLink>
          <NavLink to="/dategen#contact" >Contact Me</NavLink>
          <NavLink to="/dategen#blogs" >Blogs</NavLink>
          <NavLink to="/dategen#sign-up" >Sign Up</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;