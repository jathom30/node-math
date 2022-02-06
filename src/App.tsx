import React from 'react';
import { SingleValue } from 'react-select'
import { TokenSearch } from 'components';
import { TokenSearchResult } from 'types';
import './App.css';
import { TokenDisplay, FlexBox } from 'components';
import { NodeInputs } from 'components/NodeInputs';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { nodeCost, nodeCount, nodeRewards, nodeWithdrawTax, tokenId } from 'state';

function App() {
  const [id, setId] = useRecoilState(tokenId)
  const setNodeCount = useSetRecoilState(nodeCount)
  const setNodeCost = useSetRecoilState(nodeCost)
  const setNodeRewards = useSetRecoilState(nodeRewards)
  const setNodeTax = useSetRecoilState(nodeWithdrawTax)

  const handleSelectToken = (token: SingleValue<TokenSearchResult>) => {
    setId(token?.id)
  }

  const handleClearToken = () => {
    setId(undefined)
    setNodeCount(1)
    setNodeCost(0)
    setNodeRewards(0)
    setNodeTax(0)
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
