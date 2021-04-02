import React from 'react';
import '../../css/bootstrap.min.css';
import '../../css/style.css';
import sc3_img from '../../images/sc3_img.png';

export default function APY() {
  return (
    <div>
      <section className="hm_sc_03 pad100" id="APY">
        <div className="max_1200">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="mx-680 text-start">
                <img src={sc3_img} alt="" className="img-fluid mb-5" />
                <h1 className="def_ttl_sm">APY Calculation</h1>

                <p className="def_p mb-0">
                  An APY calculation is dependent upon several factors:
                </p>

                <p className="def_p mb-0">
                  &#8226; Staker's initial price of $STOCH purchase
                </p>
                <p className="def_p mb-0">&#8226; Market price of $STOCH</p>
                <p className="def_p mb-0">
                  &#8226; Number of $STOCH staked in the pool
                </p>
                <p className="def_p mb-3">
                  &#8226; Emissions rate of $STOCH (this is the only known
                  component of the equation)
                </p>
                <p className="def_p mb-0">
                  Our platform has an APY calculator where you can work out the
                  current APY.
                </p>
                <p className="def_p mb-3">
                  As an example, let us assume the $STOCH purchase was at the
                  PreSale price of $13.75. Let us then assume that the price
                  stays at the initial listing price of $16.50. Finally, let us
                  assume 30% of all $STOCH supply is staked in the staking pool.
                  The APY would be 200%.{' '}
                </p>

                <p className="def_p mb-0">30,000 x $13.75= $412,500</p>
                <p className="def_p mb-0">
                  960 x 52 weeks x $16.50= $8,23,680{' '}
                </p>

                <p className="def_p mb-3">$412,500 / $825,100 =200% APY</p>

                <p className="def_p mb-0">
                  Because of our burn mechanism, this APY should be generated
                  whilst supply stays relatively fixed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
