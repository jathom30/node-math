import React, { useState } from 'react';
import { SingleValue } from 'react-select'
import { TokenSearch } from 'components';
import { TokenSearchResult } from 'types';
import './App.css';
import { TokenDisplay, FlexBox } from 'components';
import { NodeInputs } from 'components/NodeInputs';

function App() {
  const [tokenId, setTokenId] = useState<string>()

  const handleSelectToken = (token: SingleValue<TokenSearchResult>) => {
    setTokenId(token?.id)
  }

  const handleClearToken = () => {
    setTokenId(undefined)
  }

  return (
    <div className="App">
      <FlexBox gap="1rem" flexDirection='column'>
        {!tokenId ? (
          <TokenSearch onChange={handleSelectToken} />
        ) : (
          <>
            <TokenDisplay tokenId={tokenId} onClearTokenId={() => setTokenId(undefined)} />
            <NodeInputs />
          </>
        )}
      </FlexBox>
    </div>
  );
}

export default App;


// Order: token cost, then node cost (number of tokens), starting node count (default 1), daily rewards