import React from 'react';
import '../../css/bootstrap.min.css';
import '../../css/style.css';
import sc01_img from '../../images/sc01_img.png';
import definition_img from '../../images/definition_img.png';
import { Link } from 'react-router-dom';

export default function Introduction() {
  return (
    <div>
      <section className="hm_sc_01 d-flex align-items-center" id="Introduction">
        <div className="max_1200">
          <div
            className="d-flex"
            style={{
              float: 'right',
              position: 'fixed',
              zIndex: 99,
              top: 0,
              top: '120px',
              right: '12px',
            }}
          >
            <a
              href="https://exchange.pancakeswap.finance/#/swap?inputCurrency=0xb57A5BfF7141EC4a95a08c7321CB14fafD7952a8/"
              target="_blank"
              className="btn btn_bfs"
            >
              Buy $STOCH
            </a>
          </div>
          <div className="row align-items-center">
            <div className="col-md-7">
              <div className="mx_650">
                <img src={definition_img} alt="" className="img-fluid mb-5" />

                <p className="def_p">
                  {' '}
                  The DEFI space has been extremely innovative in recent months.
                  Visionary developers have been taking traditional financial
                  instruments and creating yield-generating platforms that are
                  working towards a fully-decentralized ecosystem.
                </p>

                <p className="def_p">
                  {' '}
                  DEFI is all about creating platforms that enable finance to
                  work without any government or company oversight, in turn
                  producing more efficient and corruption-free markets and
                  therefore higher returns.
                </p>

                <p className="def_p">
                  {' '}
                  Stochastic finance has been designed to decentralize one of
                  the oldest and most popular financial instruments: Lottery
                  Bonds (otherwise known as Premium Bonds).
                </p>

                <p className="def_p">
                  {' '}
                  The term 'lottery bond' or 'premium bond' has been used in the
                  English language since at least the late 18th century, to
                  describe a bond where holders renounce interest payments but
                  instead participate in a lottery which distributes the
                  equivalent of aggregate interest payments among them. The
                  rewards distribution from these bonds is a multivariate,
                  hypergeometric distribution.
                </p>

                <p className="def_p">
                  {' '}
                  Lottery bonds are particularly popular in the UK, where over
                  21 million people own them to a value of over GBP 100 billion.
                </p>

                <p className="def_p">
                  {' '}
                  Stochastic Finance is the first DEFI project to create a
                  decentralized platform to replicate the mechanics of lottery
                  bonds based around staking, a random number generator powered
                  by Chainlink VRF, and smart contracts. Join us in
                  revolutionizing traditional finance.
                </p>

                {/* <a href="dashboard.html" className="btn def_btn">Launch App</a>  */}
              </div>
            </div>
            <div className="col-md-5 sc01_lft">
              <img src={sc01_img} alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
