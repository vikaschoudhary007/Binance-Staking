import React, { useContext, useEffect, useState } from 'react';
import '../../css/bootstrap.min.css';
import '../../css/style.css';
import StakeModal from './StakeModal';
import ApproveModal from './ApproveModal';
import { UserContext } from '../../Context/UserContext';
import {
  stakeTokens,
  unstakeTokens,
  approveFunction,
  checkLastRandomNumber,
} from '../../Functions/Web3';
import { firebaseinit } from '../../FirebaseAuth';

const database = firebaseinit.database().ref('Binance');
const db = firebaseinit.database().ref('Binance/Users');

export default function Main() {
  const {
    userData,
    account,
    guessContract,
    checkRandomNumber,
    setCheckRandomNumber,
  } = useContext(UserContext);
  const [transactions, setTransactions] = useState({});
  const [winnerNumbers, setWinnerNUmbers] = useState({});
  const [approvedAmount, setApprovedAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        setLoading(true);

        await db
          .child(account)
          .child('approveAmount')
          .on('value', (snapshot) => {
            setApprovedAmount(snapshot.val());
          });

        await db
          .child(account)
          .child('Transactions')
          .on('value', async (snapshot) => {
            setTransactions(snapshot.val());
          });

        await database.child('winnerNumbers').on('value', async (snapshot) => {
          setWinnerNUmbers(snapshot.val());
        });

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getAllTransactions();
  }, []);

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        setLoading(true);

        await db
          .child(account)
          .child('approveAmount')
          .on('value', (snapshot) => {
            setApprovedAmount(snapshot.val());
          });

        await db
          .child(account)
          .child('Transactions')
          .on('value', async (snapshot) => {
            setTransactions(snapshot.val());
          });

        await database.child('winnerNumbers').on('value', async (snapshot) => {
          setWinnerNUmbers(snapshot.val());
        });

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getAllTransactions();
  }, [account]);

  const setArray = () => {
    const Items = [];

    if (transactions == null) {
      return <p>No Transactions Yet</p>;
    }

    Object.entries(transactions).map(([key, object]) => {
      Items.push(object);
    });

    Items.splice(-1, 1);

    return loading ? (
      <p>Loading...</p>
    ) : (
      Items.reverse().map((item) => {
        Items.forEach((item) => {
          if (item.choosenNumber === undefined) {
            item.choosenNumber = '-';
          }
        });

        return (
          <tr>
            <td>{item.date}</td>
            <td>{`${item.choosenNumber}`}</td>
            <td>{item.stakingAmount || item.approveAmount || '-'}</td>
            <td>{item.type || '-'}</td>
          </tr>
        );
      })
    );
  };

  const setNumberArray = () => {
    const Items = [];

    if (winnerNumbers == null) {
      return <p>No Winners Yet</p>;
    }

    Object.entries(winnerNumbers).map(([key, object]) => {
      Items.push(object);
    });

    Items.splice(-1, 1);

    return loading ? (
      <p>Loading...</p>
    ) : (
      Items.reverse().map((item) => {
        return (
          <tr>
            <td>{item.date}</td>
            <td>{`${item.number}`}</td>
          </tr>
        );
      })
    );
  };

  return (
    <div className="inner_main">
      <div className="container">
        <div className="in_wt_bx">
          <div className="row">
            <div className="col-md-12">
              <div className="row row-cols-xl-5 row-cols-md-3 row-cols-sm-2">
                <div className="col-md-4-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>$STOCH Balance in Wallet</h6>
                    <h3>
                      {parseFloat(
                        (userData.stochBalance / 10 ** 18).toString()
                      ).toFixed(1)}
                    </h3>
                  </div>
                </div>
                <div className="col-md-2-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>Approved</h6>
                    <h3>
                      {approvedAmount === null
                        ? 0
                        : parseFloat(approvedAmount.toString()).toFixed(2)}
                    </h3>
                    <ApproveModal approveFunction={approveFunction} />
                  </div>
                </div>
                <div className="col-md-2-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>Staking Balance</h6>
                    <h3>{userData.checkStakingBalance}</h3>
                    {userData.isUserStaking ? (
                      <button
                        className="btn btn_blck"
                        onClick={() => unstakeTokens(guessContract, account)}
                      >
                        Unstake
                      </button>
                    ) : (
                      <StakeModal
                        stakeTokens={stakeTokens}
                        approvedAmount={approvedAmount}
                      />
                    )}
                  </div>
                </div>
                <div className="col-md-2-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>Total $STOCH Currently Staked in Pool</h6>
                    <h3>{userData.totalTokenStakedInContract}</h3>
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
                    <h6>Last Winning Number</h6>
                    <h3>
                      {parseInt(checkRandomNumber) > 1000 ||
                      checkRandomNumber === null
                        ? 0
                        : checkRandomNumber}
                    </h3>
                    <button
                      className="btn btn_blck"
                      onClick={() =>
                        checkLastRandomNumber(setCheckRandomNumber)
                      }
                    >
                      View
                    </button>
                  </div>
                </div>

                <div className="col-md-4-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>Time of Last Winner</h6>
                    <h6 className="last-winner">
                      {new Date(userData.lastWinsTime * 1000).toLocaleString()}
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            {/* Changes */}
            {/* <div className="col-md-12">
              <div className="max995">
                <h4 className="ttl_sm">Transaction History</h4>
                <div className="wt_brdd_bx">
                  <div className="rspnv_tbl">
                    <table className="table info_tbl">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Chosen Numbers</th>
                          <th>Staked/Approved</th>
                          <th>Transaction Type</th>
                        </tr>
                      </thead>
                      <tbody>{setArray()}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div> */}

            <div class="row" style={{ marginBottom: 20 }}>
              <div class="col-md-8">
                <div class="max995">
                  <h4 class="ttl_sm">Transaction History</h4>
                  <div class="wt_brdd_bx">
                    <div class="rspnv_tbl">
                      <table class="table info_tbl">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Chosen Numbers</th>
                            <th>Staked/Approved</th>
                            <th>Transaction Type</th>
                          </tr>
                        </thead>
                        <tbody>{setArray()}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="max995">
                  <h4 class="ttl_sm">Last Winning Numbers</h4>
                  <div class="wt_brdd_bx">
                    <div class="rspnv_tbl">
                      <table class="table info_tbl">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Winning Number</th>
                          </tr>
                        </thead>
                        <tbody>{setNumberArray()}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 
            ////////////////////////////////////// */}
          </div>
        </div>
      </div>
    </div>
  );
}
