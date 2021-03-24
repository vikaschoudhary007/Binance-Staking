import React from 'react';
import "../../css/bootstrap.min.css";
import "../../css/style.css";
import sc3_img from "../../images/sc3_img.png";


export default function Tokenomics() {
    return (
        <div>
            <section className="hm_sc_03 pad100" id="Tokenomics">
      <div className="max_1200">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="mx-680">
              <img src={sc3_img} alt="" className="img-fluid mb-5" />
              <h1 className="def_ttl_sm">Sed luctus in justo vel viverra. Ultrices lorem fend lacus eleifend.</h1>
              <p className="def_p mb-0">Ut ultricies erat ut lectus consequat, quis accumsan risus hendrerit. Suspendisse quam euismod, rutrum sem sed, pretium diam. Cras urna urna, ultrices ut tincidunt vitae fringilla dictum sapien. Proin euismod orci non ante lacinia faucibus.</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
        </div>
    )
}
