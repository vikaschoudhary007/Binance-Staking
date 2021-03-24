import React from "react";
import {Link} from "react-router-dom";
import "../../css/bootstrap.min.css";
import "../../css/style.css";
import sc01_img from "../../images/sc01_img.png";

export default function Introduction() {
  return (
    <div>
      <section className="hm_sc_01 d-flex align-items-center" id="Introduction">
        <div className="max_1200">
          <div className="row align-items-center">
            <div className="col-md-7">
              <div className="mx_650">
                <h1 className="def_ttl">
                  Nam sagittis egestas elemen lorem arcu.
                </h1>
                <p className="def_p">
                  Ut ultricies erat ut lectus consequat, quis accumsan risus
                  hendrerit. Suspendisse quam euismod, rutrum sem sed, pretium
                  diam. Cras urna urna, ultrices ut tincidunt vitae fringilla
                  dictum sapien. Proin euismod orci non ante lacinia faucibus.
                  Nam purus. Morbi vulputate suscipit nibh vel imperdiet.
                </p>
                {/* <a href="dashboard.html" className="btn def_btn">
                  Launch App
                </a> */}
                <Link to="/dashboard" className="btn def_btn">Launch App</Link>
              </div>
            </div>
            <div className="col-md-5 sc01_lft">
              <img src={sc01_img} alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
