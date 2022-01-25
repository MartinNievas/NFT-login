import React, { useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import useWalletMembershipAccess from './Components/AuthNFT'
import Navbar from './Components/Navbar'
import homePicure from './images/home.svg';
import metaversePicture from "./images/metaverse.svg";

const AuthContext = React.createContext(null);
const params = new URLSearchParams(window.location.search);
const paramValue = params.get("redeem");

const fakeAuth = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve('2342f2f1d131rf12'), 250);
    });

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = React.useState(null);
    const [currentAccount, setCurrentAccount] = useState("");

    const handleLogin = async () => {
        const token = await fakeAuth();
        setToken(token);
    };

    const handleLogout = () => {
        setToken(null);
    };

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
                const token = await fakeAuth();
                setToken(token);
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

    const getCurrentAccount = () => {
        return currentAccount;
    }

    const value = {
        token,
        currentAccount,
        onCheckIfWalletIsConnected:checkIfWalletIsConnected,
        onConnectWallet:connectWallet,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};


const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};

const useAuth = () => {
  return React.useContext(AuthContext);
};

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/home" replace state={{ from: location }} />;
  }

  return children;
};


const App = () => {

  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route
            path="Navbar"
            element={
              <ProtectedRoute>
                <Navbar />
              </ProtectedRoute>
            }
          />
          <Route
            path="metaverse"
            element={
              <ProtectedRoute>
                <Metaverse />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

const Home = () => {
    const hasMembershipAccess = useWalletMembershipAccess();
    const {currentAccount, onCheckIfWalletIsConnected, onConnectWallet} = useAuth();

    useEffect(() => {
        onCheckIfWalletIsConnected();
    }, [])

    var name = 'Grow your business with';
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
                                        <button className="btn-get-started" onClick={onConnectWallet}>
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
                                <img src={homePicure} className="img-fluid animated" alt="Home Img" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </section>
        </>

    )
}

const Metaverse = () => {
    const {token} = useAuth();
    return (
        <>
            <section id="header" className="d-flex align-items-center">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-10 mx-auto">
                        <div className="row">
                            <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                                <h2>Welcome to the Metaverse!</h2>
                                <h2 className="my-3">
                                    Your redeem code is: <b>{paramValue}</b>
                                </h2>
                            </div>
                            <div className="col-lg-6 order-1 order-lg-2 header-image">
                                <img src={metaversePicture} className="img-fluid animated" alt="Home Img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </>
    )
}


export default App;