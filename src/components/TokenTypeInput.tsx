import React from 'react';

interface TokenTypeInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TokenTypeInput: React.FC<TokenTypeInputProps> = ({ value, onChange }) => {
  const commonTypes = ['color', 'spacing', 'typography', 'border', 'shadow', 'size'];

  return (
    <div className="token-type-input">
      <label htmlFor="tokenType">Token Type:</label>
      <select
        id="tokenType"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="token-type-select"
      >
        {commonTypes.map(type => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or enter custom type"
        className="token-type-input-field"
      />
    </div>
  );
};

export default TokenTypeInput;