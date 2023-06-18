import React, { useState } from 'react';
import './Customize.css'; // Import the CSS file for styling

const Customize: React.FC = () => {
  const [themeColor, setThemeColor] = useState('white');
  const [sliderValue, setSliderValue] = useState(0.3);

  const handleColorChange = (color: string) => {
    setThemeColor(color);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(parseFloat(event.target.value));
  };

  return (
    <div className="customize-container">
      <div className="customize-element">
        <div className="customize-header">
          <h3 className="customize-element-title">Set Temperature</h3>
          <div className="customize-question-mark" title="Modifies the creativity of the chatbot. Higher numbers mean more creativity">
            ?
          </div>
        </div>
        <div className="customize-slider-container">
          <input type="range" min="0" max="1" step="0.01" value={sliderValue} className="customize-slider" onChange={handleSliderChange} />
          <span className="customize-slider-value">{sliderValue}</span>
        </div>
      </div>
      <div className="customize-element">
        <div className="customize-header">
          <h3 className="customize-element-title">Theme Color</h3>
        </div>
        <div className="customize-color-option">
          <div
            className={`customize-circle ${themeColor === 'white' ? 'white' : ''}`}
            onClick={() => handleColorChange('white')}
          ></div>
          <div
            className={`customize-circle ${themeColor === 'black' ? 'black' : ''}`}
            onClick={() => handleColorChange('black')}
          ></div>
        </div>
      </div>
      <div className="customize-element">
        <div className="customize-header">
          <h3 className="customize-element-title">Special Information</h3>
        </div>
        <textarea className="customize-text-field"></textarea>
      </div>
    </div>
  );
};

export default Customize;
