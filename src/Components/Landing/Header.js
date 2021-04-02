import React from 'react';
import '../../css/bootstrap.min.css';
import '../../css/style.css';
import logo from '../../images/logo.png';
import menu from '../../images/menu.svg';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <header className="header" id="header">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="#">
              <img src={logo} className="img-fluid" />
            </a>
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
            <div className="collapse navbar-collapse" id="MainMenu">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="#Introduction">
                    Introduction
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#HowItworks">
                    How It Works
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#Audit">
                    Preserving Value For Investors
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#APY">
                    APY
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#Tokenomics">
                    Tokenomics
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#ASafePreSale">
                    A Safe PreSale
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#Roadmap">
                    Roadmap
                  </a>
                </li>
              </ul>
              <div className="d-flex">
                <Link to="/dashboard" className="btn btn_bfs">
                  Launch App
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
