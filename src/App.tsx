import React, { useEffect } from 'react';
import './App.scss'
import { MaxHeightContainer, NodeContainer, Header, Footer } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import {v4 as uuid }from 'uuid'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { nodeIdsAtom, widthAtom } from 'state';

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function App() {
  const [nodeIds, setNodeIds] = useRecoilState(nodeIdsAtom)
  const [width, setWidth] = useRecoilState(widthAtom)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      const doc = document.documentElement
      doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setWidth])

  const handleNewNode = () => {
    setNodeIds([
      uuid(),
      ...nodeIds,
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
    <div className="App">
      <MaxHeightContainer
        header={<Header onClick={handleNewNode} />}
        footer={<Footer isMobile={columnView} />}
        fullHeight
      >
        <div className={`App__wrapper ${columnView ? 'App__wrapper--columns': ''}`}>
          <DragDropContext onDragEnd={handleDradEnd}>
            <Droppable droppableId='droppable' direction={columnView ? 'vertical' : 'horizontal'}>
              {(provided) => (
                <div className={`App__droppable ${columnView ? 'App__droppable--columns' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                    {nodeIds.map((nodeId, i) => (
                      <Draggable key={nodeId} draggableId={nodeId} index={i}>
                        {(provided) => (
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
                    {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </MaxHeightContainer>

    </div>
  );
}

export default App;
