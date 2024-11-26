import React from "react";

interface CountryData {
  country: string;
  code: string;
}

interface CountryDisplayProps {
  countryData: CountryData;
}

const CountryDisplay: React.FC<CountryDisplayProps> = ({ countryData }) => {
  const { country, code } = countryData;
  const flagURL = `https://flagcdn.com/80x60/${code.toLowerCase()}.png`;
  const flagURL2x = `https://flagcdn.com/160x120/${code.toLowerCase()}.png 2x`;

  return (
    <div className="country-name">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <img
          src={flagURL}
          srcSet={flagURL2x}
          width="108"
          height="81"
          alt={country}
        />
        {country}
      </div>
    </div>
  );
};

export default CountryDisplay;
