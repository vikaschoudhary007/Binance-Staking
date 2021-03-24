import React from "react";
import "../../css/bootstrap.min.css";
import "../../css/style.css";
import sc4_img from "../../images/sc4_img.png"

export default function ASafePreSale() {
  return (
    <div>
      <section className="hm_sc_04 pad100" id="ASafePreSale">
        <div className="max_1200">
          <div className="row align-items-center">
            <div className="col-md-8 sm_mt_30">
              <div className="mx-680 ms-0">
                <h1 className="def_ttl_sm">
                  Sed luctus in justo vel viverra. Ultrices lorem fend lacus
                  eleifend.
                </h1>
                <p className="def_p mb-3">
                  Ut ultricies erat ut lectus consequat, quis accumsan risus
                  hendrerit. Suspendisse quam euismod, rutrum sem sed, pretium
                  diam. Cras urna urna, ultrices ut tincidunt vitae fringilla
                  dictum sapien. Proin euismod orci non ante lacinia faucibus.
                </p>
                <p className="def_p mb-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam dignissim eget augue quis scelerisque. Etiam ac lorem
                  magna. Interdum et malesuada fames ac ante ipsum primis in
                  faucibus. Suspendisse auctor dui ex porta posuere.
                </p>
                <p className="def_p mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam dignissim eget augue quis scelerisque. Etiam ac lorem
                  magna. Interdum et malesuada fames ac ante ipsum primis in
                  faucibus. Suspendisse auctor dui ex porta posuere.
                </p>
              </div>
            </div>
            <div className="col-md-4 text-end">
              <img
                src={sc4_img}
                alt=""
                className="img-fluid ms-auto me-0"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
