import React from "react";
import "../../css/bootstrap.min.css";
import "../../css/style.css";
import telegram from "../../images/telegram.svg";
import CoinGecko_ic from "../../images/CoinGecko_ic.png";
import medium_ic from "../../images/medium_ic.svg";
import CoinMarketCap_ic from "../../images/CoinMarketCap_ic.png";
import uniswap_ic from "../../images/uniswap_ic.png";
import twitter from "../../images/twitter.svg";

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <ul className="social_ic">
                <li>
                  <a href="#">
                    <img src={telegram} width="30px" alt="" />
                    Telegram Announcements
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={telegram} width="30px" alt="" />
                    Telegram Discussion
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={CoinGecko_ic} width="30px" alt="" />
                    CoinGecko_ic
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={medium_ic} width="30px" alt="" />
                    Medium
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={CoinMarketCap_ic} width="30px" alt="" />
                    CoinMarketCap
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={uniswap_ic} width="30px" alt="" />
                    Uniswap
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={twitter} width="30px" alt="" />
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
