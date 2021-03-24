import React from "react";

export default function Pagination({ array, paginate, handleRangeCheckbox, checked }) {

  return (
    <div class="head_t_bx">
      <h6>Select Range</h6>
      <ul class="ckbx_list">
        {
            array.map((data,key) => (
                <li key={key}>
                <div className="chckbx">
                    <input type="checkbox" id={`check${key}`} onClick={() => paginate(key+1)} onChange={() => handleRangeCheckbox(key)} checked={checked === key}/>
                    <label htmlFor={`check${key}`}>{data}</label>
                </div>
                </li>
            ))
        }
      </ul>
    </div>
  );
}
