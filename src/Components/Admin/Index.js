import React, { useContext, useEffect, useState } from 'react';
import '../../css/bootstrap.min.css';
import '../../css/style.css';
import '../../css/datepicker.css';
import { UserContext } from '../../Context/UserContext';
import { firebaseinit } from '../../FirebaseAuth';
import Number from '../../images/number.png';
import Calender from '../../images/calendar.png';

import {
  approveFunction,
  checkLastRandomNumber,
  chooseWinner,
  guessRandomNumber,
  emitEveryWeekTokens,
  pushWinnerNumber,
} from '../../Functions/Web3';
import ApproveModal from './ApproveModal';

const db = firebaseinit.database().ref('Binance/Users');

export default function Main() {
  const {
    userData,
    checkRandomNumber,
    setCheckRandomNumber,
    account,
    guessContract,
    tokenContract,
  } = useContext(UserContext);
  const [approvedAmount, setApprovedAmount] = useState(0);
  const [value, setValue] = useState('');
  const [winnerNumber, setWinnerNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

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
                    <h6>$STOCH Balance in Wallet</h6>
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
                    <h3>{parseFloat(approvedAmount).toFixed(2) || 0}</h3>
                    <ApproveModal approveFunction={approveFunction} />
                  </div>
                </div>
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
                    <h6>Time of Last Winner</h6>
                    <h6 className="last-winner">
                      {new Date(userData.lastWinsTime * 1000).toLocaleString()}
                    </h6>
                  </div>
                </div>

                <div className="col-md-4-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>Emit Weekly Tokens</h6>
                    <h3></h3>
                    <button
                      className="btn btn_blck"
                      onClick={() =>
                        emitEveryWeekTokens(tokenContract, account)
                      }
                    >
                      Emit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Changes */}

            <div className="col-md-12">
              <div className="row row-cols-xl-5 row-cols-md-3 row-cols-sm-2">
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
                      onClick={() => chooseWinner(guessContract, account)}
                    >
                      Choose
                    </button>
                  </div>
                </div>

                <div className="col-md-4-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>Check Random Number</h6>
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
                    <h6>Add winner number</h6>

                    <button
                      className="btn btn_blck"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div
                  class="modal fade model-contents"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header  border-0">
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <p>
                        <img src={Number} />
                        Add Winning Number
                      </p>
                      <div class="modal-body">
                        <form>
                          <label>Date</label>
                          <br />
                          <div class="date-picker-tbl">
                            <div
                              id="datepicker"
                              class="input-group date"
                              data-date-format="mm-dd-yyyy"
                              placeholder="Date"
                            >
                              <input
                                class="form-control"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                              />
                            </div>
                          </div>
                          <br />
                          <div class="form-group ">
                            <label for="exampleInputPassword1">
                              Winning Number
                            </label>
                            <div class="win-num-filed">
                              <input
                                type="text"
                                class="form-control"
                                id=""
                                placeholder="Enter winning number"
                                value={winnerNumber}
                                onChange={(e) =>
                                  setWinnerNumber(e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div class="modal-footer submit-btn border-0">
                            <button
                              type="button"
                              class=" w-100"
                              onClick={() =>
                                pushWinnerNumber(
                                  winnerNumber,
                                  date,
                                  setWinnerNumber,
                                  setDate
                                )
                              }
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
