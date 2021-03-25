import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import '../../css/bootstrap.min.css';
import '../../css/style.css';
import logo from '../../images/logo.svg';
import { UserContext } from '../../Context/UserContext';

export default function StakeModal({ approveFunction }) {
  const { account, tokenContract, userData } = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const [value, setValue] = useState(0);
  const [error, setError] = useState(false);

  const handleMaxButton = () => {
    setValue(userData.stochBalance / 10 ** 18);
  };

  return (
    <>
      <button className="btn btn_blck" onClick={() => setModalShow(true)}>
        Approve
      </button>

      <Modal show={modalShow}>
        <div className="modal-div">
          <div className="modal-header">
            <p>STOCH</p>
            <button
              onClick={() => {
                setModalShow(false);
                setValue(0);
              }}
            >
              X
            </button>
          </div>
          <div className="modal-body">
            <h2>
              How Much Do you
              <br /> want to Approve?
            </h2>
            <label htmlFor="modal-input">Approve STOCH</label>
            <input
              type="text"
              id="modal-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className="modal-body-maxButton"
              onClick={() => handleMaxButton()}
            >
              Max
            </button>
            <p style={!error ? { display: 'none' } : {}}>
              Amount should be grater then 0
            </p>
          </div>
          <div className="modal-footer">
            <div className="modal-footer-content">
              <p>Lorem ipsum dolor amet consectectur adipiscing elit.</p>
              <p>Mauris pretium eros justo, nec fringilla nibh semper sed.</p>
            </div>
            <button
              className="btn btn_stake_blck"
              onClick={() =>
                approveFunction(
                  tokenContract,
                  value,
                  account,
                  setError,
                  setModalShow,
                  setValue
                )
              }
            >
              APPROVE
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
