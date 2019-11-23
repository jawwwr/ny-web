import React, { useState } from 'react'
import { Link } from "react-router-dom";

const Modal = (props :any) => {
  const { active_modal, setActiveModal, src } = props
  return(
    <div className={`modal ${active_modal ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <section className="modal-card-body">
        Test
        </section>
        <footer className="modal-card-foot">
          <button className="button is-primary">Save</button>
          <button type="button" className="button is-danger" onClick={() => setActiveModal(false)}>Cancel</button>
        </footer>
      </div>
    </div>
  )
}

export default Modal