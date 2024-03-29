import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../css/bootstrap.min.css';
import '../../css/style.css';
import logo from '../../images/logo.png';
import menu from '../../images/menu.svg';
import { UserContext } from '../../Context/UserContext';

export default function Header() {
  const { connectTag, handleConnect } = useContext(UserContext);

  return (
    <div>
      <header className="header" id="header">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link className="navbar-brand" to="/">
              <img src={logo} className="img-fluid" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#MainMenu"
              aria-controls="MainMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <img src={menu} alt="" />
            </button>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0"></ul>
              <div className="d-flex">
                <button className="btn btn_bfs" onClick={handleConnect}>
                  {!localStorage.account ? <>Connect</> : <>{connectTag}</>}
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
