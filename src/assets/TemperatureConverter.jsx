import React, { useState } from 'react';

// Temperature input component that receives values and handlers from parent
const TemperatureInput = ({ scale, temperature, onTemperatureChange }) => {
  const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
  };

  return (
    <div className="temperature-input">
      <label>
        Enter temperature in {scaleNames[scale]}:
        <input
          value={temperature}
          onChange={(e) => onTemperatureChange(e.target.value)}
          placeholder={`Enter ${scaleNames[scale]}`}
        />
      </label>
    </div>
  );
};


// Parent component that manages the shared state
const TemperatureCalculator = () => {
  // State is lifted to this level
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('c');

  // Conversion functions
  const toCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5 / 9;
  };

  const toFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
  };

  // Handler functions that update the lifted state
  const handleCelsiusChange = (temperature) => {
    setScale('c');
    setTemperature(temperature);
  };

  const handleFahrenheitChange = (temperature) => {
    setScale('f');
    setTemperature(temperature);
  };

  // Calculate both temperatures based on the current scale and value
  const celsius = scale === 'f' ? toCelsius(parseFloat(temperature)) : parseFloat(temperature);
  const fahrenheit = scale === 'c' ? toFahrenheit(parseFloat(temperature)) : parseFloat(temperature);

  return (
    <div className="calculator">
      <h2>Temperature Converter</h2>
      
      <p>
          Multiple Instances of the Same Component
                    </p>  
      <TemperatureInput
        scale="c"
        temperature={scale === 'c' ? temperature : celsius.toFixed(2)}
        onTemperatureChange={handleCelsiusChange}
      />

      <TemperatureInput
        scale="f"
        temperature={scale === 'f' ? temperature : fahrenheit.toFixed(2)}
        onTemperatureChange={handleFahrenheitChange}
      />
    </div>
  );
};

export default TemperatureCalculator;