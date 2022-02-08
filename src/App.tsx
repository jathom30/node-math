import React, { useEffect, useState } from 'react';
import './App.scss'
import { Box, FlexBox, NodeContainer } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripHorizontal, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {v4 as uuid }from 'uuid'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Button } from 'components/Button';

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

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

  const handleDradEnd = (result: DropResult) => {
    setNodeIds(prevNodeIds => {
      // dropped outside the list
      if (!result.destination) {
        return prevNodeIds;
      }
      return reorder(
        prevNodeIds,
        result.source.index,
        result.destination?.index,
      )
    })
  }

  const columnView = width < 800

  return (
    <div className={`App ${columnView ? 'App--columns': ''}`}>
      <DragDropContext onDragEnd={handleDradEnd}>
        <Droppable droppableId='droppable' direction={columnView ? 'vertical' : 'horizontal'}>
          {(provided, snapshot) => (
            <div className={`App__droppable ${columnView ? 'App__droppable--columns' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                {nodeIds.map((nodeId, i) => (
                  <Draggable key={nodeId} draggableId={nodeId} index={i}>
                    {(provided, snapshot) => (
                      <div className='App__draggable' ref={provided.innerRef} {...provided.draggableProps}>
                        <NodeContainer
                          id={nodeId}
                          onRemove={handleRemoveNode}
                          onCopy={handleCopyNode}
                          canRemove={nodeIds.length > 1}
                        >
                          <div className='NodeContainer__btn NodeContainer__btn--handle' {...provided.dragHandleProps}><FontAwesomeIcon icon={faGripHorizontal} /></div>
                        </NodeContainer>
                      </div>
                    )}
                  </Draggable>
                ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Box padding='0.5rem' paddingTop={0}>
        <Button width="100%" onClick={handleNewNode}>
          <FontAwesomeIcon icon={faPlusCircle} />
        </Button>
      </Box>
    </div>
  );
}

export default App;
