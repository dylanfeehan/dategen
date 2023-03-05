import React from "react";

const About = () => {
  return (
    <div>
      <h1 className="message">
        I'm building dateGen to learn about full-stack web development!
        <br></br>
        <br></br>
        This app has been a joy to build thus far and I've learned so much. (React, bootstrap, flask & REST, SQL, docker, deploying to AWS)
        <br></br>
        <br></br>
        Over the next few weeks, I'll be using this app to learn about secure sign on / account creation, as well as how to maintain a persistent database in the cloud.
        <br></br>
        <br></br>
        The <code>source code</code> can be found by clicking <a href="https://github.com/dylanfeehan/dategen">this link.</a>
        <br></br>
        <br></br>
        it's a work in progress and is currently being refactored into a social media :)
      </h1>
    </div>
  );
};

export default About;