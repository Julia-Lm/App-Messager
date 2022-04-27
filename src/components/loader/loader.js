import React from "react";
import './loader.scss';

const Loader = () => {

    return (
        <div className="container">
            <div className="loader-content" style={{ height: window.innerHeight - 50 }}>
                <div className="lds-dual-ring"></div>
            </div>
        </div>
    )
}

export default Loader;