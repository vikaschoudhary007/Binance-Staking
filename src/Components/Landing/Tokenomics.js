import React from 'react';
import '../../css/bootstrap.min.css';
import '../../css/style.css';
import sc3_img from '../../images/sc3_img.png';

export default function Tokenomics() {
  return (
    <div>
      <section className="hm_sc_03 pad100" id="Tokenomics">
        <div className="max_1200">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="mx-680 text-start">
                <img src={sc3_img} alt="" className="img-fluid mb-5" />
                <h1 className="def_ttl_sm">Tokenomics</h1>

                <p className="def_p mb-3">
                  &#8226; The Stochastic token model has been designed to
                  provide the returns of a lottery bond whilst still keeping a
                  constant supply.
                </p>

                <p className="def_p mb-3">
                  &#8226; Initial supply: 100,000 $STOCH
                </p>
                <p className="def_p mb-3">
                  &#8226; Staking emissions rate: 1,000 $STOCH per week
                </p>
                <p className="def_p mb-3">
                  &#8226; Transaction Fee Burn Mechanism: 1.5% of each
                  transaction
                </p>
                <p className="def_p mb-3">&#8226; PreSale: 54,000 $STOCH</p>
                <p className="def_p mb-3">
                  &#8226; Liquidity Provision: 27,000 $STOCH
                </p>
                <p className="def_p mb-3">&#8226; Marketing: 9,000 $STOCH</p>
                <p className="def_p mb-3">
                  &#8226; Team Tokens: 9,000 $STOCH (team tokens are locked and
                  will be distributed every quarter on an even basis for 4
                  quarters).{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
