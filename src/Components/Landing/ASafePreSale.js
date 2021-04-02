import React from 'react';
import '../../css/bootstrap.min.css';
import '../../css/style.css';
import sc4_img from '../../images/sc4_img.png';
import sc3_img from '../../images/sc3_img.png';

export default function ASafePreSale() {
  return (
    <div>
      <section class="hm_sc_04 pad100" id="ASafePreSale">
        <div class="max_1200">
          <div class="row align-items-center">
            <div class="col-md-12 sm_mt_30">
              <div class="mx-680 text-start">
                <img src={sc3_img} alt="" class="img-fluid mb-5" />

                <h1 class="def_ttl_sm">A Safe PreSale</h1>
                <p class="def_p mb-3">
                  &#8226; PreSale Date: Saturday April 3rd at 3pm UTC
                </p>
                <p class="def_p mb-3">&#8226; 18 $STOCH per BNB</p>
                <p class="def_p mb-3">
                  &#8226; 15 $STOCH per BNB is the Pancakeswap listing price
                </p>
                <p class="def_p mb-3">
                  &#8226; The sale will take place on The Fridge Finance, to
                  guarantee the locking of liquidity upon listing
                </p>
                <p class="def_p mb-3">&#8226; Hardcap: 3000 BNB</p>
                <p class="def_p mb-3">&#8226; Softcap: 1000 BNB</p>

                <p class="def_p mb-3">
                  &#8226; Our platform is fully operational from day one.
                </p>
                <p class="def_p mb-3">
                  &#8226; Fully audited prior to PreSale.{' '}
                </p>
                <p class="def_p mb-3">
                  &#8226; Sales Platform that guarantees the locking of
                  liquidity
                </p>
                <p class="def_p mb-0">
                  &#8226; The team has been privately KYC'd by The Fridge{' '}
                </p>
              </div>
            </div>
            {/* <div class="col-md-4 text-end">
          <img src={sc4_img} alt="" class="img-fluid ms-auto me-0">
        </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
