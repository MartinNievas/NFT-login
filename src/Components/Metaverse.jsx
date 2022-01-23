import React from 'react';
import metaverse from "../images/metaverse.svg";

const params = new URLSearchParams(window.location.search);
const paramValue = params.get("redeem");

const Metaverse = () => {
    return (
        <>
            <section id="header" className="d-flex align-items-center">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-10 mx-auto">
                        <div className="row">
                            <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                                <h2 className="my-3">
                                    <h2>Welcome to the Metaverse!</h2>
                                    Your redeem code is: <b>{paramValue}</b>
                                </h2>
                            </div>
                            <div className="col-lg-6 order-1 order-lg-2 header-image">
                                <img src={metaverse} className="img-fluid animated" alt="Home Img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </>
    )
}

export default Metaverse;

