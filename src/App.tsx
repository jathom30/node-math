import React, { useEffect } from 'react';
import './App.scss'
import { MaxHeightContainer, NodeContainer, Header, Footer } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid }from 'uuid'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { exchangeAtom, nodeIdsAtom, widthAtom } from 'state';
import { reorder } from 'helpers';
import ReactGA from 'react-ga4'
import { useQuery } from 'react-query';
import { getExchangeRates } from 'api';

const GA3 = 'UA-120851599-3'
const GA4 = 'G-9TH8P17LPC'

function App() {
  const [nodeIds, setNodeIds] = useRecoilState(nodeIdsAtom)
  const [width, setWidth] = useRecoilState(widthAtom)
  const [exchange, setExchange] = useRecoilState(exchangeAtom)
  
  useEffect(() => {
    ReactGA.initialize([
      {
        trackingId: GA3,
        gaOptions: {
          name: 'GA3',
        },
      },
      {
        trackingId: GA4,
        gaOptions: {
          name: 'GA4',
        },
      },
    ])
  }, [])

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

  useQuery(
    'exchange-rates',
    getExchangeRates,
    {
      onSuccess: (data) => {
        // onSuccess update exchange in state, if no state is available, default to usd
        const newExchange =
          Object.values(data.data.rates).find((rate) => rate.name === exchange?.name) ??
          data.data.rates.usd
        setExchange(newExchange)
      }
    },
  )

  const handleNewNode = () => {
    ReactGA.event({
      category: 'Card',
      action: 'Create'
    })
    setNodeIds([
      uuid(),
      ...nodeIds,
    ])
  }

  const handleRemoveNode = (id: string) => {
    ReactGA.event({
      category: 'Card',
      action: 'Delete'
    })
    setNodeIds(nodeIds.filter(node => node !== id))
  }

  const handleCopyNode = (newId: string, referenceId: string) => {
    ReactGA.event({
      category: 'Card',
      action: 'Clone'
    })
    const originalIndex = nodeIds.findIndex(nodeId => nodeId === referenceId)
    const newIndex = originalIndex+1
    // add newId directly after referenceId
    setNodeIds([...nodeIds.slice(0, newIndex), newId, ...nodeIds.slice(newIndex)])
  }

  const handleDradEnd = (result: DropResult) => {
    ReactGA.event({
      category: 'Card',
      action: 'Drag'
    })
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
            <Droppable droppableId='droppable' direction='vertical'>
              {(provided) => (
                <div className={`App__droppable`} ref={provided.innerRef} {...provided.droppableProps}>
                    {nodeIds.map((nodeId, i) => (
                      <Draggable key={nodeId} draggableId={nodeId} index={i}>
                        {(provided) => (
                          <div className='App__draggable' ref={provided.innerRef} {...provided.draggableProps}>
                            <NodeContainer
                              id={nodeId}
                              onRemove={handleRemoveNode}
                              onCopy={handleCopyNode}
                              isMobile={columnView}
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
