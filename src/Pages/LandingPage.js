import React from 'react';
import Header from '../Components/Landing/Header';
import Introduction from '../Components/Landing/Introduction';
import HowItWorks from '../Components/Landing/HowItWorks';
import Tokenomics from '../Components/Landing/Tokenomics';
import ASafePreSale from '../Components/Landing/ASafePreSale';
import Roadmap from '../Components/Landing/Roadmap';
import Audit from '../Components/Landing/Audit';
import Footer from '../Components/Landing/Footer';
import APY from '../Components/Landing/APY';

export default function LandingPage() {
  return (
    <div>
      <Header />
      <Introduction />
      <HowItWorks />
      <Audit />
      <APY />
      <Tokenomics />
      <ASafePreSale />
      <Roadmap />
      <Footer />
    </div>
  );
}
