import React from 'react';
import '../../css/bootstrap.min.css';
import '../../css/style.css';
import sc2_img from '../../images/sc2_img.png';

export default function HowItWorks() {
  return (
    <div>
      <section className="hm_sc_02 pad100" id="HowItworks">
        <div className="max_1200">
          <div className="row align-items-center">
            {/* <div className="col-md-4">
          <img src={sc2_img} alt="" className="img-fluid">
        </div>  */}
            <div className="col-md-12 sm_mt_30">
              <div className="mx-680 text-start">
                <h1 className="def_ttl_sm">How It Works</h1>
                <p className="def_p mb-3">
                  Stochastic is a single-asset staking platform, namely $STOCH,
                  our native token. You stake your $STOCH in our staking pool.{' '}
                </p>
                <p className="def_p mb-3">
                  For each 100 $STOCH you stake in the pool, you can reserve 1
                  number on our board of 1000. For example, if you stake 500
                  $STOCH, you can reserve 5 numbers. These numbers are yours for
                  as long as you are staking the applicable $STOCH.
                </p>

                <p className="def_p mb-3">
                  {' '}
                  1000 $STOCH per week is emitted on a constant per-second
                  basis. From these 1000 $STOCH, 960 will release into the
                  reward wallet, and the remaining 40 will be reserved for
                  future development costs to expand the platform.
                </p>

                <p className="def_p mb-3">
                  {' '}
                  At a variable interval (based upon the amount of numbers
                  reserved), the Chainlink VRF contract is called and a random
                  number is generated between 1 and 1000.
                </p>

                <p className="def_p mb-3">
                  {' '}
                  If the randomly-generated number is currently reserved, the
                  owner will be able to claim all the $STOCH rewards in the
                  reward contract at the time of the number match.
                </p>

                <p className="def_p mb-3">
                  Our algorithm has been designed to generate a winner every 3
                  days, on average.
                </p>
                <p className="def_p mb-0">
                  Y multiplied (X/Z) = Call frequency in minutes{' '}
                </p>
                <p className="def_p mb-0">Y- minutes in 3 days </p>
                <p className="def_p mb-0">X- Amount of $STOCH staked </p>
                <p className="def_p mb-3">Z- Current supply of $STOCH </p>
                <p className="def_p mb-0">For example: </p>
                <p className="def_p mb-0">
                  4320 x (50000/100000) = 2160 minutes per contract call{' '}
                </p>
                <p className="def_p mb-0">
                  Once the number match has occurred, the reward wallet is
                  returned to zero and the process starts again.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
