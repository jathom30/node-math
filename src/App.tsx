import React, { useState } from 'react';
import { SingleValue } from 'react-select'
import { TokenSearch } from 'components';
import { TokenSearchResult } from 'types';
import './App.css';
import { TokenDisplay, FlexBox } from 'components';
import { NodeInputs } from 'components/NodeInputs';
import { useRecoilState } from 'recoil';
import { tokenId } from 'state';

function App() {
  const [id, setId] = useRecoilState(tokenId)

  const handleSelectToken = (token: SingleValue<TokenSearchResult>) => {
    setId(token?.id)
  }

  const handleClearToken = () => {
    setId(undefined)
  }

  return (
    <div className="App">
      <FlexBox gap="1rem" flexDirection='column'>
        {!id ? (
          <TokenSearch onChange={handleSelectToken} />
        ) : (
          <>
            <TokenDisplay onClearTokenId={handleClearToken} />
            <NodeInputs />
          </>
        )}
      </FlexBox>
    </div>
  );
}

export default App;
