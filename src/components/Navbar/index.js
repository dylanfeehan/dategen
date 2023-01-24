// just use, like richie, the fucking uhh navbar uhhh navbar bootstrap yeah that.
import React from 'react';
import HomeLogo from '../../homelogo';
import {Link} from 'react-router-dom';
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <div>
        {/*<NavLink to="/" >Home</NavLink>*/}
        <HomeLogo/>
        <Link to="/about" >About</Link>
        <Link to="/contact" >Contact Me</Link>
        <Link to="/blogs" >Blogs</Link>
        <Link to="/sign-up" >Sign Up</Link>
      </div>
    </>
  );
};

export default Navbar; // replace this wiith ya own propreitary stuff my boi