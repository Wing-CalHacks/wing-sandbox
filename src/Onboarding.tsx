import React, { useState } from 'react';
import './OnboardingView.css'; // Import the CSS file for styling
import Drop from './Drop';
import Customize from './Customize';
import Complete from './Complete';

const OnboardingView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleContinue = () => {
    if (currentPage < 4) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="onboarding-container">
    <h2 className="header">Configure your chatbot</h2> {/* New header element */}
      <div className="circle-container">
        <div className={`circle ${currentPage === 1 ? 'active' : ''}`}>1</div>
        <div className="line" />
        <div className={`circle ${currentPage === 2 ? 'active' : ''}`}>2</div>
        <div className="line" />
        <div className={`circle ${currentPage === 3 ? 'active' : ''}`}>3</div>
      </div>
      <div className="content-container">
        {currentPage === 1 && <FirstPage handleContinue={handleContinue} />}
        {currentPage === 2 && <ThirdPage handleContinue={handleContinue} />}
        {currentPage === 3 && <FourthPage handleContinue={handleContinue} />}
      </div>
    </div>
  );
};

interface PageProps {
  handleContinue: () => void;
}

const FirstPage: React.FC<PageProps> = ({ handleContinue }) => {
  return (
    <div className="page-content">
      <div><Drop /></div>
      <button className="continue-button" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

const SecondPage: React.FC<PageProps> = ({ handleContinue }) => {
  return (
    <div className="page-content">
      <div><Drop /></div>
      <button className="continue-button" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

const ThirdPage: React.FC<PageProps> = ({ handleContinue }) => {
  return (
    <div className="page-content">
      <div><Customize /></div>
      <button className="continue-button" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

const FourthPage: React.FC<PageProps> = ({ handleContinue }) => {
  return (
    <div className="page-content">
      <div><Complete /></div>
    </div>
  );
};

export default OnboardingView;
