import React from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Blogs = () => {
  return (
    <div className="container">
      <h1 style={{textAlign: 'center', marginTop: '2rem', marginLeft: '1rem', marginRight: '1rem'}}>There are no blogs. But the navbar looks better when it's full of links you see on a typical website.</h1>
      <a href="https://www.youtube.com/watch?v=rdIqZ8ocyhw" target="_blank">
        <Button variant='outline-dark'>
          Click Me
        </Button>
      </a>
    </div>
  );
};

export default Blogs;