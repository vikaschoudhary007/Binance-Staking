import Web3 from "web3";
import TokenABI from "../Contract/Token.json";
import GuessABI from "../Contract/GuessContract.json";
import { firebaseinit } from "../FirebaseAuth";
import Swal from "sweetalert2";

const db = firebaseinit.database().ref("Data");
const userdb = firebaseinit.database().ref("Data/Users");

/////////// CHECK IF BROWSER IS ENABLED WITH Web3 //////////////

const loadWeb3 = async () => {
  try {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      // window.alert('Non-Ethereum browser detected. you should consider trying MetaMask')
    }
  } catch (err) {
    console.log("error", err);
  }
};

////////// GET METAMASK ACCOUNT AND CREATE CONTRACT INSTANCES ////////////////

const loadBlockChainData = async (
  setAccount,
  setNetworkId,
  setTokenContract,
  setConnectTag,
  setGuessContract
) => {
  try {
    const web3 = window.web3;
    // Load Account
    const accounts = await web3.eth.getAccounts();

    await setAccount(accounts[0]);
    localStorage.account = accounts[0] || "";

    setConnectTag(
      localStorage.account.slice(0, 4) +
        "..." +
        localStorage.account.slice(38, 42)
    );

    // listen the Network ID
    const networkId = await web3.eth.net.getId();
    await setNetworkId(networkId);
    localStorage.networkId = networkId;
    const tokenContract = await new web3.eth.Contract(
      TokenABI,
      "0x7Ed44F825a897eb06BA33Fdd71695884D43DebFC"
    );

    const guessContract = await new web3.eth.Contract(
      GuessABI,
      "0x1e22999Fe0e7EF977Cb195F42E3a7a512f599A12"
    );
    await setTokenContract(tokenContract);

    await setGuessContract(guessContract);
  } catch (err) {
    console.log(err);
  }
};

////////// CHECK IF USER SELECTED A DIFFERENT ACCOUNT IN METAMASK ///////////////

const listenAccountChange = async (setAccount, setConnectTag) => {
  try {
    const web3 = window.web3;
    window.ethereum.on("accountsChanged", async () => {
      const accounts = await web3.eth.getAccounts();
      await setAccount(accounts[0]);
      localStorage.account = accounts[0] || "";

      setConnectTag(
        localStorage.account.slice(0, 4) +
          "..." +
          localStorage.account.slice(39, 42)
      );
    });
  } catch (err) {
    console.log(err);
  }
};

////////// CHECK IF USER SELECTED A DIFFERENT NETWORK ////////////

const listenNetworkChange = async (setNetworkId) => {
  const web3 = window.web3;
  window.ethereum.on("networkChanged", async () => {
    const networkId = await web3.eth.net.getId();
    await setNetworkId(networkId);
    localStorage.networkId = networkId;
  });
};

/////////// GET ALL THE DETAILS OF AN ACCOUNT /////////////////

const accountDetails = async (account, userData, setUserData, setLoading) => {
  try {
    setLoading(true);
    const web3 = window.web3;

    const tokenContract = await new web3.eth.Contract(
      TokenABI,
      "0x7Ed44F825a897eb06BA33Fdd71695884D43DebFC"
    );

    const guessContract = await new web3.eth.Contract(
      GuessABI,
      "0x1e22999Fe0e7EF977Cb195F42E3a7a512f599A12"
    );

    const stochBalance = await tokenContract.methods
      .balanceOf(account)
      .call({ from: account });
    const isUserStaking = await guessContract.methods
      .isUserStaking()
      .call({ from: account });
    const checkStakingBalance = await guessContract.methods
      .checkStakingBalance()
      .call({ from: account });
    const maxNumberUserCanSelect = await guessContract.methods
      .maxNumberUserCanSelect()
      .call({ from: account });
    const remainingNumbersToSet = await guessContract.methods
      .remainingNumbersToSet()
      .call({ from: account });
    const viewNumbersSelected = await guessContract.methods
      .viewNumbersSelected()
      .call({ from: account });
    const totalTokenStakedInContract = await guessContract.methods
      .totalTokenStakedInContract()
      .call({ from: account });
    const winnerTokensReceived = await guessContract.methods
      .winnerTokens()
      .call({ from: account });
    const lastWinsTime = await guessContract.methods
      .lastWinsTime()
      .call({ from: account });  
    // const checkRandomNumber = await guessContract.methods
    //   .checkRandomNumber()
    //   .call({ from: account })
    //   .on('receipt', (receipt) => {
    //     console.log(receipt)
    //   });
    const calculateCurrentTokenAmount = await guessContract.methods
      .calculateCurrentTokenAmount()
      .call({ from: account });    

    await setUserData({
      ...userData,
      stochBalance: stochBalance,
      maxNumberUserCanSelect: maxNumberUserCanSelect,
      remainingNumbersToSet: remainingNumbersToSet,
      isUserStaking: isUserStaking,
      checkStakingBalance: checkStakingBalance,
      viewNumbersSelected: viewNumbersSelected,
      totalTokenStakedInContract: totalTokenStakedInContract,
      winnerTokensReceived: winnerTokensReceived,
      lastWinsTime: lastWinsTime,
      // checkRandomNumber: checkRandomNumber,
      calculateCurrentTokenAmount: calculateCurrentTokenAmount
    });

    setLoading(false);
  } catch (err) {
    console.log(err);
  }
};

//////////// HANDLE CHOOSENUMBER FUNCTION OF GUESS CONTRACT ///////////////////

const chooseNumbers = async (
  guessContract,
  account,
  dataArray,
  setSelectedGuesses,
  setCheckboxId
) => {
  try {

    await guessContract.methods
      .chooseNumbers(dataArray)
      .send({ from: account })
      .on('transactionHash', async() => { 
        Swal.fire({
          title: "Transaction Processing...",
          text: "Please Wait",
          showConfirmButton: false,
          showCloseButton: false,
          icon: "info",
          customClass: {
            confirmButton: 'swal-button'
          },
          allowOutsideClick:false,
          buttonsStyling:false
        });
        
      });

    await db.once("value", async (snapshot) => {
      const data = snapshot.val().ChoosedArray;
      await db.update({
        ChoosedArray: data.concat(dataArray),
      });
    });

    await userdb.once("value", async (snapshot) => {
      const temp = snapshot.val();

      let countValue;
      if (temp == null) {
        await userdb.child(account).child("Transactions").set({
          count: 0,
        });

        await userdb
          .child(account)
          .child("Transactions/count")
          .once("value", async (result) => {
            countValue = result.val();
            console.log(countValue);
          });
      }
      await userdb
        .child(account)
        .child("Transactions/count")
        .once("value", async (result) => {
          countValue = result.val();
          console.log(countValue);
        });

      if (countValue === null) {
        await userdb.child(account).child("Transactions").set({
          count: 0,
        });

        await userdb
          .child(account)
          .child("Transactions/count")
          .once("value", async (result) => {
            countValue = result.val();
            console.log(countValue);
          });
      }

      await userdb
        .child(account)
        .child("Transactions")
        .child(countValue)
        .update({
          date: new Date().toISOString().slice(0, 10),
          choosenNumber: dataArray,
          type: "CHOOSE NUMBER",
        })
        .then(async () => {
          await userdb
            .child(account)
            .child("Transactions")
            .child("count")
            .set(countValue + 1)
            .then(() => {
              Swal.fire({
                title: "Transaction Successful",
                showConfirmButton: true,
                showCloseButton: false,
                confirmButtonText:"Close",
                icon: "success",
                customClass: {
                  confirmButton: 'swal-button'
                },
                buttonsStyling:false
              })
              .then(() => {
                setSelectedGuesses([]);
                setCheckboxId(new Map());
              });
            });
        });
    });
  } catch (err) {
    Swal.fire({
      title: "Oops! Transaction Failed",
      showConfirmButton: true,
      showCloseButton: false,
      confirmButtonText: "Close",
      icon: "error",
      customClass: {
        confirmButton: 'swal-button'
      },
      buttonsStyling:false
    });
  }
};

//////////////// HANDLE STAKETOKEN FUNCTION OF GUESS CONTARCT //////////////////////

const stakeTokens = async (
  guessContract,
  amount,
  account,
  setError,
  setModalShow,
  setValue
) => {
  try {
    const tokens = amount.toString();
    var approved;

    await userdb
      .child(account)
      .child("approveAmount")
      .once("value", (snapshot) => {
        if (snapshot.val() === null) {
          approved = false;
        }
      });

    if (approved === false) {
      Swal.fire({
        title: "You need to approve first",
        showConfirmButton: true,
        showCloseButton: false,
        confirmButtonText:"Close",
        icon: "error",
        customClass: {
          confirmButton: 'swal-button'
        },
        buttonsStyling:false
      })
      setValue(0);
      setModalShow(false);

      return;
    }

    if (amount === 0) {
      setError(true);
      return;
    }
    console.log(tokens);
    await guessContract.methods.stakeTokens(tokens).send({ from: account })
    .on('transactionHash', async() => { 
      await setModalShow(false)
      Swal.fire({
        title: "Transaction Processing...",
        text: "Please Wait",
        showConfirmButton: false,
        showCloseButton: false,
        icon: "info",
        customClass: {
          confirmButton: 'swal-button'
        },
        allowOutsideClick:false,
        buttonsStyling:false
      });
      
    });

    setError(false);

    await userdb.once("value", async (snapshot) => {
      const temp = snapshot.val();

      let countValue;
      if (temp == null) {
        await userdb.child(account).child("Transactions").set({
          count: 0,
        });

        await userdb
          .child(account)
          .child("Transactions/count")
          .once("value", async (result) => {
            countValue = result.val();
            console.log(countValue);
          });
      }
      await userdb
        .child(account)
        .child("Transactions/count")
        .once("value", async (result) => {
          countValue = result.val();
          console.log(countValue);
        });

      if (countValue === null) {
        await userdb.child(account).child("Transactions").set({
          count: 0,
        });

        await userdb
          .child(account)
          .child("Transactions/count")
          .once("value", async (result) => {
            countValue = result.val();
            console.log(countValue);
          });
      }

      await userdb
        .child(account)
        .child("Transactions")
        .child(countValue)
        .update({
          date: new Date().toISOString().slice(0, 10),
          stakingAmount: amount,
          type: "STAKE",
        })
        .then(async () => {
          await userdb
            .child(account)
            .child("Transactions")
            .child("count")
            .set(countValue + 1)
            .then(() => {
              setValue(0);
              Swal.fire({
                title: "Transaction Successful",
                showConfirmButton: true,
                showCloseButton: false,
                confirmButtonText:"Close",
                icon: "success",
                customClass: {
                  confirmButton: 'swal-button'
                },
                buttonsStyling:false
              });
              setModalShow(false);
            });
        });
    });
  } catch (err) {
    Swal.fire({
      title: "Oops! Transaction Failed",
      showConfirmButton: true,
      showCloseButton: false,
      confirmButtonText: "Close",
      icon: "error",
      customClass: {
        confirmButton: 'swal-button'
      },
      buttonsStyling:false
    });
    setValue(0);
    setModalShow(false);
    console.log(err);
  }
};

//////////////// HANLDE UNSTAKE FUNCTION OF GUESS CONTRACT ///////////////////////

const unstakeTokens = async (guessContract, account) => {
  try {
    await guessContract.methods
      .unstakeTokens()
      .send({ from: account })
      .on("transactionHash", async () => {

        Swal.fire({
          title: "Transaction Processing...",
          text: "Please Wait",
          showConfirmButton: false,
          showCloseButton: false,
          icon: "info",
          customClass: {
            confirmButton: 'swal-button'
          },
          allowOutsideClick:false,
          buttonsStyling:false
        });
      });

    await userdb.once("value", async (snapshot) => {
      const temp = snapshot.val();
      console.log("vikas", temp);

      let countValue;
      if (temp == null) {
        await userdb.child(account).child("Transactions").set({
          count: 0,
        });

        await userdb
          .child(account)
          .child("Transactions/count")
          .once("value", async (result) => {
            countValue = result.val();
            console.log(countValue);
          });
      }
      await userdb
        .child(account)
        .child("Transactions/count")
        .once("value", async (result) => {
          countValue = result.val();
          console.log(countValue);
        });

      if (countValue === null) {
        await userdb.child(account).child("Transactions").set({
          count: 0,
        });

        await userdb
          .child(account)
          .child("Transactions/count")
          .once("value", async (result) => {
            countValue = result.val();
            console.log(countValue);
          });
      }

      await userdb
        .child(account)
        .child("Transactions")
        .child(countValue)
        .update({
          date: new Date().toISOString().slice(0, 10),
          type: "UNSTAKE",
        })
        .then(async () => {
          await userdb
            .child(account)
            .child("Transactions")
            .child("count")
            .set(countValue + 1)
            .then(() => {
              Swal.fire({
                title: "Transaction Successful",
                showConfirmButton: true,
                showCloseButton: false,
                confirmButtonText:"Close",
                icon: "success",
                customClass: {
                  confirmButton: 'swal-button'
                },
                buttonsStyling:false
              });
            });
        });
    });

    // window.location.reload();
  } catch (err) {
    Swal.fire({
      title: "Oops! Transaction Failed",
      showConfirmButton: true,
      showCloseButton: false,
      confirmButtonText: "Close",
      icon: "error",
      customClass: {
        confirmButton: 'swal-button'
      },
      buttonsStyling:false
    });
  }
};

const approveFunction = async (
  tokenContract,
  amount,
  account,
  setError,
  setModalShow,
  setValue
) => {
  try {
    const web3 = window.web3;

    const tokens = web3.utils.toWei(amount.toString(), "ether").toString();

    if (amount === 0) {
      setError(true);
      return;
    }

    setError(false);
    await tokenContract.methods
      .approve("0x1e22999Fe0e7EF977Cb195F42E3a7a512f599A12", tokens)
      .send({ from: account })
      .on("transactionHash", async () => {
        await setModalShow(false);
        Swal.fire({
          title: "Transaction Processing...",
          text: "Please Wait",
          showConfirmButton: false,
          showCloseButton: false,
          icon: "info",
          customClass: {
            confirmButton: 'swal-button'
          },
          allowOutsideClick:false,
          buttonsStyling:false
        });
      });

    await userdb.once("value", async (snapshot) => {
      const temp = snapshot.val();
      console.log("vikas", temp);

      let countValue;
      if (temp == null) {
        await userdb.child(account).child("Transactions").set({
          count: 0,
        });

        await userdb
          .child(account)
          .child("Transactions/count")
          .once("value", async (result) => {
            countValue = result.val();
            console.log(countValue);
          });
      }
      await userdb
        .child(account)
        .child("Transactions/count")
        .once("value", async (result) => {
          countValue = result.val();
          console.log(countValue);
        });

      if (countValue === null) {
        await userdb.child(account).child("Transactions").set({
          count: 0,
        });

        await userdb
          .child(account)
          .child("Transactions/count")
          .once("value", async (result) => {
            countValue = result.val();
            console.log(countValue);
          });
      }

      await userdb.child(account).update({
        approveAmount: amount,
      });

      await userdb
        .child(account)
        .child("Transactions")
        .child(countValue)
        .update({
          date: new Date().toISOString().slice(0, 10),
          approveAmount: amount,
          type: "APPROVE",
        })
        .then(async () => {
          await userdb
            .child(account)
            .child("Transactions")
            .child("count")
            .set(countValue + 1)
            .then(async () => {
              await setValue(0);
              Swal.fire({
                title: "Transaction Successful",
                showConfirmButton: true,
                showCloseButton: false,
                confirmButtonText: "Close",
                icon: "success",
                customClass: {
                  confirmButton: 'swal-button'
                },
                buttonsStyling:false
              });
            });
        });
    });
  } catch (err) {
    Swal.fire({
      title: "Oops! Transaction Failed",
      showConfirmButton: true,
      showCloseButton: false,
      confirmButtonText: "Close",
      icon: "error",
      customClass: {
        confirmButton: 'swal-button'
      },
      buttonsStyling:false
    });
    setValue(0);
    setModalShow(false);
    console.log(err);
  }
};

export {
  loadWeb3,
  loadBlockChainData,
  listenAccountChange,
  listenNetworkChange,
  accountDetails,
  chooseNumbers,
  stakeTokens,
  unstakeTokens,
  approveFunction,
};
