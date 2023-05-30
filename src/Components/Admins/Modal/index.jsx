import React from 'react';
import './modal.module.css';

function Modal({ content }) {
  return (
    <div className="modal">
      <h2>Message</h2>
      <div className="modal-content">
        <p className="p-modal error-title">{content} </p>
        <span className="close">&times;</span>
        <p className="dom-validation error-text"></p>
      </div>
    </div>
  );
}

export default Modal;
