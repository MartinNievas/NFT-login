import React, { useState, useEffect} from 'react';
import { NavLink } from "react-router-dom"
import home from "../images/home.svg";
import '../App.css';

const params = new URLSearchParams(window.location.search);
const paramValue = params.get("token");

const Home = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [token, setToken] = useState();

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log("Make sure you have metamask!");
                return;
            } else {
                console.log("We have the ethereum object", ethereum);
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account:", account);
                setCurrentAccount(account)
            } else {
                console.log("No authorized account found")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error)
        }
    }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
    var name='Grow your business with';
    var btnname = "Get Started";

    return (
        <>
            <section id="header" className="d-flex align-items-center"> <div className="container-fluid">
                <div className="row">
                    <div className="col-10 mx-auto">
                        <div className="row">
                            <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                                <h1> Grow your business with <strong className="brand-name"> NFT</strong>
                                </h1>
                                <h2 className="my-3">
                                    We are the team of talented developer making metaverse accesible to everyone
                                </h2>

                                <div className="mt-3">
                                    { }
                                    {!currentAccount && (
                                        <button className="btn-get-started" onClick={connectWallet}>
                                        Conectar wallet
                                        </button>
                                    )}
                                    { }
                                    {currentAccount && (
                                        <div className="mt-3">
                                            <NavLink to={'/metaverse'} className="btn-get-started ">
                                            Enter Metaverse
                                            </NavLink>
                                        </div>
                                    )}

                                </div>
                            </div>

                            <div className="col-lg-6 order-1 order-lg-2 header-image">
                                <img src={home} className="img-fluid animated" alt="Home Img" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </section>
        </>

    )
}

export default Home;