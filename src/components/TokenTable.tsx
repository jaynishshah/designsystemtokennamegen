import React from 'react';
import { Token } from '../types';

interface TokenTableProps {
  tokens: Token[];
  onCopyToken: (tokenName: string) => void;
}

const TokenTable: React.FC<TokenTableProps> = ({ tokens, onCopyToken }) => {
  if (tokens.length === 0) {
    return (
      <div className="token-table-empty">
        <p>No tokens generated. Add values to your buckets to see token combinations.</p>
      </div>
    );
  }

  return (
    <div className="token-table-container">
      <div className="token-count">
        Generated {tokens.length} token{tokens.length !== 1 ? 's' : ''}
      </div>
      
      <table className="token-table">
        <thead>
          <tr>
            <th>Token Name</th>
            <th>Token Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr key={index}>
              <td className="token-name">{token.name}</td>
              <td className="token-type">{token.type}</td>
              <td>
                <button
                  onClick={() => onCopyToken(token.name)}
                  className="copy-button"
                  title="Copy token name"
                >
                  📋
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenTable;