import React, { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";
import Swal from "sweetalert2";

export default function Guess({
  guesses,
  setSelectedGuesses,
  selectedGuesses,
  checkboxId,
  setCheckboxId,
  choosedArray,
  setChoosedArray,
  loading,
}) {
  const { userData } = useContext(UserContext);

  const handleChange = (event) => {
    let temp = [];
    temp = selectedGuesses;

    const target = event.target;
    var id = target.id;
    var value = target.value;
    var checked = target.checked;

    if (target.checked) {
      {
        if (temp.length < userData.remainingNumbersToSet) {
          temp.push(parseInt(value));
        } else {
          Swal.fire({
            title: "Can't exceed available balance to choose",
            showConfirmButton: true,
            showCloseButton: false,
            confirmButtonText:"Close",
            icon: "warning",
            customClass: {
              confirmButton: 'swal-button'
            },
            buttonsStyling:false
          })
          setCheckboxId(new Map(checkboxId.set(id, false)));
          return;
        }

        setCheckboxId(new Map(checkboxId.set(id, checked)));
      }
    }

    if (!target.checked) {
      for (var i = 0; i < Object.keys(temp).length; i++) {
        if (temp[i] === parseInt(value)) {
          temp.splice(i, 1);
        }
      }
      setCheckboxId(new Map(checkboxId.set(id, checked)));
    }

    setSelectedGuesses(temp);
  };

  return (
    <>
      {loading ? (
        <div className="tbodyt_bx">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="tbodyt_bx">
          {guesses.map((guess) => (
            <div className="check_v2" key={guess}>
              <input
                type="checkbox"
                id={guess}
                value={guess}
                onChange={handleChange}
                checked={checkboxId.get(String(guess))}
                disabled={choosedArray.get(guess)}
              />
              <label htmlFor={guess}>{guess}</label>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
