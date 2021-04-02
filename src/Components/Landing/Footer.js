import React from 'react';
import '../../css/bootstrap.min.css';
import '../../css/style.css';
import telegram from '../../images/telegram.svg';
import CoinGecko_ic from '../../images/CoinGecko_ic.png';
import medium_ic from '../../images/medium_ic.svg';
import CoinMarketCap_ic from '../../images/CoinMarketCap_ic.png';
import uniswap_ic from '../../images/uniswap_ic.png';
import twitter from '../../images/twitter.svg';

export default function Footer() {
  return (
    <div>
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="col-md-12 text-center">
              <ul class="social_ic">
                <li>
                  <a href="https://t.me/StochasticFinanceChat" target="_blank">
                    <img src={telegram} width="30px" alt="" />
                    Telegram Chat
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/StochasticDefi?s=08"
                    target="_blank"
                  >
                    <img src={twitter} width="30px" alt="" />
                    Twitter
                  </a>
                </li>

                {/* <li>
              <a href="#">
                <img src="images/telegram.svg" width="30px" alt="">
                Telegram Discussion
              </a>
            </li>
            <li>
              <a href="#">
                <img src="images/CoinGecko_ic.png" width="30px" alt="">
                CoinGecko_ic
              </a>
            </li>
            <li>
              <a href="#">
                <img src="images/medium_ic.svg" width="30px" alt="">
                Medium
              </a>
            </li>
            <li>
              <a href="#">
                <img src="images/CoinMarketCap_ic.png" width="30px" alt="">
                CoinMarketCap
              </a>
            </li>
            <li>
              <a href="#">
                <img src="images/uniswap_ic.png" width="30px" alt="">
                Pancakeswap
              </a>
            </li>
            <li>
              <a href="#">
                <img src="images/twitter.svg" width="30px" alt="">
                Twitter
              </a>
            </li> */}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
