import React from 'react';
import '../../css/bootstrap.min.css';
import '../../css/style.css';
import sc6_img from '../../images/sc6_img.png';

export default function Audit() {
  return (
    <div>
      <section class="hm_sc_03 pad100 bgdrk" id="Audit">
        <div class="max_1200">
          <div class="row">
            <div class="col-md-12 text-center">
              <div class="mx-680 text-start">
                <img src={sc6_img} alt="" class="img-fluid mb-5" />
                <h1 class="def_ttl_sm">Preserving Value For Investors</h1>

                <p class="def_p">
                  {' '}
                  Although our algorithm has been formulated to distribute
                  0.428% of the total supply on average per distribution, we've
                  also installed additional safeguards, to preserve token value.{' '}
                </p>

                <p class="def_p">
                  {' '}
                  To minimize the impact the reward wallet has on the market
                  price, we will be capping the maximum one-time distribution at
                  1% of the current total supply of $STOCH.
                </p>

                <p class="def_p">
                  {' '}
                  We will accomplish this by calling the Chainlink Oracle as
                  many times as is required to determine a winner, once the
                  wallet size reaches the 1% threshold.
                </p>

                <p class="def_p">
                  {' '}
                  This will limit the amount of $STOCH that reaches the open
                  market at any given time.{' '}
                </p>

                <p class="def_p">
                  To further preserve value for token holders, we have also
                  implemented a burn mechanism of 1.5% of every transaction.
                  This will help offset the emissions rate and work to sustain a
                  stable supply of $STOCH going forward, enabling the platform
                  to provide significant APY without inflation.
                </p>

                {/* <p class="def_p">Ut ultricies erat ut lectus consequat, quis accumsan risus hendrerit. Suspendisse quam
              euismod, rutrum sem sed, pretium diam. Cras urna urna, ultrices ut tincidunt vitae fringilla dictum
              sapien. Proin euismod orci non ante lacinia faucibus.</p>
            <a href="#" class="btn def_btn">Audit Now</a>  */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
