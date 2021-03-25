import React, { useContext, useEffect, useState } from 'react';
import '../../css/bootstrap.min.css';
import '../../css/style.css';
import { UserContext } from '../../Context/UserContext';
import { firebaseinit } from '../../FirebaseAuth';
import {
  approveFunction,
  checkLastRandomNumber,
  chooseWinner,
  guessRandomNumber,
} from '../../Functions/Web3';
import ApproveModal from './ApproveModal';

const db = firebaseinit.database().ref('Data/Users');

export default function Main() {
  const {
    userData,
    checkRandomNumber,
    setCheckRandomNumber,
    account,
    guessContract,
  } = useContext(UserContext);
  const [approvedAmount, setApprovedAmount] = useState(0);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState({
    linkBakance: 0,
  });

  useEffect(() => {
    const getApprovedAmount = async () => {
      try {
        setLoading(true);

        await db
          .child(account)
          .child('approveAmount')
          .on('value', (snapshot) => {
            setApprovedAmount(snapshot.val());
          });

        const checkLinkBalance = await guessContract.methods
          .checkLinkBalance()
          .call({ from: account });

        setAdminData({
          ...adminData,
          linkBakance: checkLinkBalance,
        });

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getApprovedAmount();
  }, []);

  useEffect(() => {
    const getApprovedAmount = async () => {
      try {
        setLoading(true);

        await db
          .child(account)
          .child('approveAmount')
          .on('value', (snapshot) => {
            setApprovedAmount(snapshot.val());
          });

        setLoading(false);

        const checkLinkBalance = await guessContract.methods
          .checkLinkBalance()
          .call({ from: account });
        setAdminData({
          ...adminData,
          linkBakance: checkLinkBalance,
        });
      } catch (err) {
        console.log(err);
      }
    };

    getApprovedAmount();
  }, [account, guessContract]);

  return (
    <div className="inner_main">
      <div className="container">
        <div className="in_wt_bx">
          <div className="row">
            <div className="col-md-12">
              <div className="row row-cols-xl-5 row-cols-md-3 row-cols-sm-2">
                <div className="col-md-4-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>Stoch Balance</h6>
                    <h3>
                      {parseFloat(
                        (userData.stochBalance / 10 ** 18).toString()
                      ).toFixed(2)}
                    </h3>
                  </div>
                </div>
                <div className="col-md-2-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>Approved</h6>
                    <h3>{approvedAmount || 0}</h3>
                    <ApproveModal approveFunction={approveFunction} />
                  </div>
                </div>
                <div className="col-md-2-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>Link Balance</h6>
                    <h3>
                      {parseFloat(adminData.linkBakance / 10 ** 18).toFixed(2)}
                    </h3>
                  </div>
                </div>
                <div className="col-md-4-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>Last Game Time</h6>
                    <h3>
                      {new Date(userData.lastWinsTime * 1000).toLocaleString()}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Changes */}

            <div className="col-md-12">
              <div className="row row-cols-xl-5 row-cols-md-3 row-cols-sm-2">
                <div className="col-md-2-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>Expected Rewards</h6>
                    <h3>
                      {parseFloat(
                        (
                          userData.calculateCurrentTokenAmount /
                          10 ** 18
                        ).toString()
                      ).toFixed(2)}
                    </h3>
                  </div>
                </div>

                <div className="col-md-4-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>Random Number</h6>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Enter Seed"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />

                    <button
                      className="btn btn_blck"
                      onClick={() =>
                        guessRandomNumber(
                          guessContract,
                          account,
                          value,
                          setValue
                        )
                      }
                    >
                      Generate
                    </button>
                  </div>
                </div>

                <div className="col-md-4-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>Choose Winner</h6>
                    <h3></h3>
                    <button
                      className="btn btn_blck"
                      onClick={() => chooseWinner()}
                    >
                      Choose
                    </button>
                  </div>
                </div>

                <div className="col-md-4-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>Check Random Number</h6>
                    <h3>{checkRandomNumber}</h3>
                    <button
                      className="btn btn_blck"
                      onClick={() =>
                        checkLastRandomNumber(
                          setCheckRandomNumber,
                          account,
                          guessContract
                        )
                      }
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Changes */}
            <div className="col-md-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
