import React, { useContext, useEffect, useState } from "react";
import "../../css/bootstrap.min.css";
import "../../css/style.css";
import Guess from "./Components/Guess";
import Pagination from "./Components/Pagination";
import { UserContext } from "../../Context/UserContext";
import { firebaseinit } from "../../FirebaseAuth";
import { chooseNumbers } from "../../Functions/Web3";

const db = firebaseinit.database().ref("Data");

export default function Main() {
  const { userData, account, guessContract } = useContext(UserContext);

  const array = [
    "001 - 100",
    "101 - 200",
    "201 - 300",
    "301 - 400",
    "401 - 500",
    "501 - 600",
    "601 - 700",
    "701 - 800",
    "801 - 900",
    "901 - 1000",
  ];

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [guessPerPage] = useState(100);
  const [selectedGuesses, setSelectedGuesses] = useState([]);
  const [checkboxId, setCheckboxId] = useState(new Map());
  const [choosedArray, setChoosedArray] = useState(new Map());


  useEffect(() => {
    function range(start, end) {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    }
    var result = range(1, 1000);

    setGuesses(result);

    const getDataFromFirebase = async () => {
      setLoading(true);
      await db.on("value", async (snapshot) => {
        const temp = snapshot.val();
        
        
        if(temp === null){
          await db.child("ChoosedArray").update([-1]);
        }
        if (temp === undefined) {
          await db.child("ChoosedArray").update([-1]);
        }

        await db.on("value", (snapshot) => {
          const data = snapshot.val().ChoosedArray;

          for (var i = 0; i < data.length; i++) {
            choosedArray.set(parseInt(data[i]), true);
          }

        });
        setLoading(false);
      });
    };

    getDataFromFirebase();
  }, []);

  const handleRangeCheckbox = (key) => {
    setChecked(key);
  };

  // get Current Guess
  const indexOfLastGuess = currentPage * guessPerPage;
  const indexOfFirstGuess = indexOfLastGuess - guessPerPage;
  const currentGuess = guesses.slice(indexOfFirstGuess, indexOfLastGuess);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="inner_main">
      <div className="container">
        <div className="in_wt_bx">
          <div className="row">
            <div className="col-xl-3">
              <div className="row">
                <div className="col-xl-12 mb-3 col-sm-6">
                  <div
                    className="ds_bx_wt wt_mx_305 min_h_292"
                    style={{ overflow: "inherit", marginBottom: "5vh" }}
                  >
                    <h6>Chosen Numbers</h6>
                    <h3>
                      {
                        selectedGuesses.map((data) => (
                          <>
                          {`${data}, `}
                          </>
                        ))
                      }
                    </h3>
                    {selectedGuesses.length === 0 ? (
                      <></>
                    ) : (
                      <button
                        className="btn btn_blck"
                        onClick={() =>
                          chooseNumbers(
                            guessContract,
                            account,
                            selectedGuesses,
                            setSelectedGuesses,
                            setCheckboxId
                          )
                        }
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>

                
                <div className="col-xl-12 mb-3 col-sm-6">
                  <div
                    className="ds_bx_wt wt_mx_305 min_h_292"
                    style={{ overflow: "inherit" }}
                  >
                    
                    <h6>Chosen History</h6>
                    <h3>
                      {userData.viewNumbersSelected.map((data) => (
                        <>
                          {`${data}, `}
                        </>
                      ))}
                     
                    </h3>

                  </div>
                </div>
                
                <div className="col-xl-12 mb-3 col-sm-6">
                  <div className="ds_bx_wt wt_mx_305">
                    <h6>Available Balance to Choose</h6>
                    <h3>{userData.remainingNumbersToSet}</h3>
                  </div>
                </div>
                <div className="col-xl-12 mb-3 col-sm-6">
                  <div className="ds_bx_wt wt_mx_305">
                    <h6>Total Limit</h6>
                    <h3>{userData.maxNumberUserCanSelect}</h3>
                  </div>
                </div>
                <div className="col-xl-12 mb-3 col-sm-6">
                  <div className="ds_bx_wt wt_mx_305">
                    <h6>Running STOCH in Pool</h6>
                    <h3>{userData.totalTokenStakedInContract}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9">
              <div className="max100">
                <div className="wt_brdd_bx">
                  <Pagination
                    array={array}
                    paginate={paginate}
                    handleRangeCheckbox={handleRangeCheckbox}
                    checked={checked}
                  />
                  <Guess
                    guesses={currentGuess}
                    setSelectedGuesses={setSelectedGuesses}
                    selectedGuesses={selectedGuesses}
                    checkboxId={checkboxId}
                    setCheckboxId={setCheckboxId}
                    choosedArray={choosedArray}
                    setChoosedArray={setChoosedArray}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
