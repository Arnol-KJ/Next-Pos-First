'use client'
import React from "react";
import { IoClose } from "react-icons/io5";

interface Modaltype{
    isOpen : boolean
    onClose : () => void
    children : React.ReactNode
}

const Propup  = ({isOpen , onClose , children}:Modaltype) => {
    if(!isOpen) return null

    return(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Propup