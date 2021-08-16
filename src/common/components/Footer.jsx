import React from "react";

// copyright message
{
  new Date().getFullYear();
}

const Footer = () => {
  return (
    <div style={{ textAlign: "center" }}>
      Copyright © {new Date().getFullYear()},
      <a href="https://jeansimon.dev"> Jean-Simon Royer</a> <br />
      Trademark LightFlix, LLC.
    </div>
  );
};

export default Footer;
