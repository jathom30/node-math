import React, { useEffect, useState } from 'react';
import './App.scss'
import { Box, FlexBox, NodeContainer } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {v4 as uuid }from 'uuid'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {
  const [nodeIds, setNodeIds] = useState(['initial'])
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener('resize', () => setWidth(window.innerWidth))
    return () => window.removeEventListener('resize', () => setWidth(window.innerWidth))
  }, [])

  const handleNewNode = () => {
    setNodeIds([
      ...nodeIds, uuid()
    ])
  }

  const handleRemoveNode = (id: string) => {
    setNodeIds(nodeIds.filter(node => node !== id))
  }

  const handleCopyNode = (newId: string, referenceId: string) => {
    const originalIndex = nodeIds.findIndex(nodeId => nodeId === referenceId)
    const newIndex = originalIndex+1
    // add newId directly after referenceId
    setNodeIds([...nodeIds.slice(0, newIndex), newId, ...nodeIds.slice(newIndex)])
  }

  // const handleDradEnd = (result: unknown) => {
  //   console.log(result)
  // }

  const showAddButton = nodeIds.length < 4 && width > 900

  return (
    <div className="App">
      <FlexBox gap="1rem">
        {nodeIds.map((nodeId, i) => (
          <Box key={nodeId} flexGrow={1}>
            <NodeContainer id={nodeId} onRemove={handleRemoveNode} onCopy={handleCopyNode} canRemove={nodeIds.length > 1} />
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
