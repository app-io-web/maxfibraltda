import React from 'react';
import '../Styles/Button.css';

function Button({ text, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="custom-button">
      {text}
    </a>
  );
}

export default Button;
