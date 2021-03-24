import React, { useContext, useEffect, useState } from "react";
import "../../css/bootstrap.min.css";
import "../../css/style.css";
import StakeModal from "./StakeModal";
import ApproveModal from "./ApproveModal";
import { UserContext } from "../../Context/UserContext";
import { stakeTokens, unstakeTokens, approveFunction } from "../../Functions/Web3";
import { firebaseinit } from "../../FirebaseAuth";

const db = firebaseinit.database().ref("Data/Users");

export default function Main() {
  const { userData, account, guessContract } = useContext(UserContext);
  const [transactions, setTransactions] = useState({});
  const [approvedAmount, setApprovedAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        setLoading(true);

        await db.child(account).child('approveAmount').on("value", snapshot => {
          setApprovedAmount(snapshot.val());
        });

        await db
          .child(account)
          .child("Transactions")
          .on("value", async (snapshot) => {
            setTransactions(snapshot.val());
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

        await db.child(account).child('approveAmount').on("value", snapshot => {
          setApprovedAmount(snapshot.val())
        });

        await db
          .child(account)
          .child("Transactions")
          .on("value", async (snapshot) => {
            setTransactions(snapshot.val());
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

    if(transactions == null){
      return (
        <p>No Transactions Yet</p>
      )
    }

    Object.entries(transactions).map(([key, object]) => {
      Items.push(object);
    });

    Items.splice(-1, 1);

    return loading ? (
      <p>Loading...</p>
    ) : (
      Items.reverse().map((item) => {

        Items.forEach(item => {
          if(item.choosenNumber === undefined){
            item.choosenNumber = '-'
          }
        })
        
        return (
          <tr>
          <td>{item.date}</td>
          <td>{`${item.choosenNumber}`}</td>
          <td>{item.stakingAmount || item.approveAmount || '-'}</td>
          <td>{item.type || '-'}</td>
        </tr>
        )
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
                    <h6>Stoch Balance</h6>
                    <h3>{parseFloat((userData.stochBalance / 10 ** 18).toString()).toFixed(2)}</h3>
                  </div>
                </div>
                <div className="col-md-2-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>Approved</h6>
                    <h3>{approvedAmount || 0}</h3>
                    <ApproveModal 
                      approveFunction={approveFunction}
                    />
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
                        approvedAmount = {approvedAmount}
                      />
                      
                    )}
                  </div>
                </div>
                <div className="col-md-2-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>Running STOCH in Pool</h6>
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
                    <h3>{userData.calculateCurrentTokenAmount}</h3>
                  </div>
                </div>

                <div className="col-md-4-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>Last Game Winner Number</h6>
                    <h3>{userData.checkRandomNumber || 'Not Selected'}</h3>
                  </div>
                </div>

                <div className="col-md-4-5 mb-5">
                  <div className="ds_bx_wt">
                    <h6>Last Game Time</h6>
                    <h3>{(new Date(userData.lastWinsTime * 1000)).toLocaleString()}</h3>
                  </div>
                </div>

              </div>
            </div>

            {/* Changes */}
            <div className="col-md-12">
              <div className="max995">
                <h4 className="ttl_sm">Transaction History</h4>
                <div className="wt_brdd_bx">
                  <div className="rspnv_tbl">
                    <table className="table info_tbl">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Chosen Number</th>
                          <th>Staked/Approved</th>
                          <th>Transaction Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {setArray()}
                      </tbody>
                    </table>
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
