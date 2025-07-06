import React, { useState, useEffect } from 'react';
import './App.css';
import { AppState } from './types';
import { generateTokens } from './utils/tokenGenerator';
import { encodeStateToUrl, decodeStateFromUrl, getDefaultState } from './utils/urlState';
import TokenTypeInput from './components/TokenTypeInput';
import BucketConfigurator from './components/BucketConfigurator';
import TokenTable from './components/TokenTable';
import ExportButtons from './components/ExportButtons';

function App() {
  const [state, setState] = useState<AppState>(getDefaultState);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    const urlState = decodeStateFromUrl();
    if (urlState) {
      setState(urlState);
    }
  }, []);

  useEffect(() => {
    const newUrl = encodeStateToUrl(state);
    window.history.replaceState({}, '', newUrl);
  }, [state]);

  const tokens = generateTokens(state.buckets, state.tokenType, state.delimiter);

  const handleCopyToken = (tokenName: string) => {
    navigator.clipboard.writeText(tokenName).then(() => {
      alert(`Copied "${tokenName}" to clipboard!`);
    }).catch(() => {
      alert('Failed to copy to clipboard');
    });
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      setState(getDefaultState());
    }
  };

  const handleShareUrl = () => {
    const url = encodeStateToUrl(state);
    navigator.clipboard.writeText(url).then(() => {
      alert('Shareable URL copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy URL to clipboard');
    });
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🛠️ Design Token Name Generator</h1>
        <div className="header-actions">
          <button 
            onClick={() => setShowConfig(!showConfig)}
            className="config-toggle-button"
          >
            {showConfig ? 'Hide Config' : 'Show Config'}
          </button>
          <button onClick={handleShareUrl} className="share-button">
            Share URL
          </button>
          <button onClick={handleClearAll} className="clear-button">
            Clear All
          </button>
          <ExportButtons tokens={tokens} />
        </div>
      </header>

      <div className="app-body">
        {showConfig && (
          <div className="config-panel">
            <TokenTypeInput
              value={state.tokenType}
              onChange={(tokenType) => setState({ ...state, tokenType })}
            />
            
            <div className="delimiter-input">
              <label htmlFor="delimiter">Delimiter:</label>
              <input
                id="delimiter"
                type="text"
                value={state.delimiter}
                onChange={(e) => setState({ ...state, delimiter: e.target.value })}
                className="delimiter-field"
              />
            </div>

            <BucketConfigurator
              buckets={state.buckets}
              onBucketsChange={(buckets) => setState({ ...state, buckets })}
            />
          </div>
        )}

        <div className="main-content">
          <TokenTable tokens={tokens} onCopyToken={handleCopyToken} />
        </div>
      </div>
    </div>
  );
}

export default App;
