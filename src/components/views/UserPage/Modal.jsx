import React, {useState} from "react";

import "../../../css/Modal.css";
import "../../../App.css";

export default function Modal(props) {
    const {open, yes, no, text} = props;

    return (
        <div className={open ? "Modal openModal modal-item" : "Modal modal-item" }  onClick={no}>
            <p className="modal-item">{text}</p>
            <div className="modal-item btn-group">
                <button type="button" className="modal-btn btn modal-item" onClick={yes}>예</button>
                <button type="button" className="modal-btn btn modal-item" onClick={no}>아니요</button>
            </div>
        </div>
    );
}