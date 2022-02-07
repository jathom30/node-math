import React, { useEffect, useState } from 'react';
import './App.scss'
import { Box, FlexBox, NodeContainer } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {v4 as uuid }from 'uuid'

function App() {
  const [nodes, setNodes] = useState(['initial'])
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener('resize', () => setWidth(window.innerWidth))
    return () => window.removeEventListener('resize', () => setWidth(window.innerWidth))
  }, [])

  const handleNewNode = () => {
    setNodes([
      ...nodes, uuid()
    ])
  }

  const handleRemoveNode = (id: string) => {
    setNodes(nodes.filter(node => node !== id))
  }

  const showAddButton = nodes.length < 4 && width > 900

  return (
    <div className="App">
      <FlexBox gap="1rem">
        {nodes.map((node) => (
          <Box key={node} flexGrow={1}>
            <NodeContainer id={node} onRemoveContainer={handleRemoveNode} canRemove={nodes.length > 1} />
          </Box>
        ))}
        {showAddButton && <button onClick={handleNewNode} className="App__new-node-btn">
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>}
      </FlexBox>
    </div>
  );
}

export default App;
