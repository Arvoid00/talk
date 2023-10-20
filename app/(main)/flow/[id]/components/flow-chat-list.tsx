import { type Message } from 'ai'

import { SmolTalkMessage } from '@/lib/types'
import { nanoid } from 'nanoid'

import { useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  EdgeProps,
  MiniMap,
  Node,
  NodeProps,
  PanOnScrollMode,
  Panel,
  addEdge,
  useEdgesState,
  useNodesState
} from 'reactflow'

import 'reactflow/dist/style.css'

export interface FlowChatList {
  messages: Message[]
  isLoading: boolean
  atLimit?: boolean
}

// TODO: Put this somewhere else
const limitMessage: SmolTalkMessage = {
  id: nanoid(),
  role: 'assistant',
  assistantMessageType: 'error',
  assistantMessageDetails: 'rate-limit',
  content:
    'You have reached the rate limit for your plan level. Please try again later.'
}

const initialNodes = [
  {
    id: 'interaction-1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 }
  },
  {
    id: 'interaction-2',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 }
  },
  {
    id: 'interaction-3',
    data: { label: 'Node 3' },
    position: { x: 400, y: 100 }
  },
  {
    id: 'interaction-4',
    data: { label: 'Node 4' },
    position: { x: 400, y: 200 }
  }
]

const initialEdges = [
  {
    id: 'interaction-e1-2',
    source: 'interaction-1',
    target: 'interaction-2',
    animated: true
  },
  { id: 'interaction-e1-3', source: 'interaction-1', target: 'interaction-3' }
]

const onNodeDragStart = (_event: any, node: any) =>
  console.log('drag start', node)
const onNodeDragStop = (event: any, node: any) => console.log('drag stop', node)
const onNodeClick = (event: any, node: any) => console.log('click node', node)
const onPaneClick = (event: any) => console.log('onPaneClick', event)
const onPaneScroll = (event: any) => console.log('onPaneScroll', event)
const onPaneContextMenu = (event: any) =>
  console.log('onPaneContextMenu', event)

export function FlowChatList({ messages, isLoading }: FlowChatList) {
  const [lastY, setLastY] = useState(0) // Keep track of the last Y-coordinate
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges(els => addEdge(params, els)),
    []
  )

  console.log('nodes', nodes)
  console.log('nodes', edges)

  const [isSelectable, setIsSelectable] = useState(true)
  const [isDraggable, setIsDraggable] = useState(true)
  const [isConnectable, setIsConnectable] = useState(false)
  const [zoomOnScroll, setZoomOnScroll] = useState(false)
  const [panOnScroll, setPanOnScroll] = useState(true)
  const [panOnScrollMode, setPanOnScrollMode] = useState(
    PanOnScrollMode.Vertical
  )
  const [zoomOnDoubleClick, setZoomOnDoubleClick] = useState(false)
  const [panOnDrag, setpanOnDrag] = useState(true)
  const [captureZoomClick, setCaptureZoomClick] = useState(false)
  const [captureZoomScroll, setCaptureZoomScroll] = useState(false)
  const [captureElementClick, setCaptureElementClick] = useState(false)

  const [initialLoaded, setInitialLoaded] = useState(false)

  const addNode = (newMessage: Message) => {
    const lastNode = nodes[nodes.length - 1]
    const lastEdge = edges[edges.length - 1]

    const newY = (lastNode.height as number) + lastNode.position.y + 50

    // Create the new node
    const newNode: Node = {
      id: `n${newMessage.id}`,
      type: 'output',
      data: { label: newMessage.content },
      position: { x: 0, y: newY }
    }

    // Update nodes and lastY for next iteration
    setNodes(prevNodes => [
      ...prevNodes.map(node => {
        return node.id === lastNode.id
          ? { ...node, position: { x: 0, y: newY } }
          : node
      }),
      newNode
    ])

    const newEdge = {
      id: `e${newMessage.id}`,
      source: `n${messages[messages.length - 2].id}`,
      target: `n${newMessage.id}`,
      animated: true
    }

    setEdges(prevEdges => [...prevEdges, newEdge])

    setLastY(newY)
  }

  const updateNode = (newMessage: Message) => {
    setNodes(nds =>
      nds.map(node => {
        if (node.id === `n${newMessage.id}`) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: newMessage.content
          }
        }

        return node
      })
    )
  }

  useEffect(() => {
    if (!initialLoaded && messages.length) {
      setInitialLoaded(true)
      const initialMessageNodes: Node[] = messages.map((message, index) => {
        // Calculate position for new node based on index
        const x = 0
        const y = index * 100

        return {
          id: `n${message.id}`,
          type: index === 0 ? 'input' : 'default',
          data: { label: message.content },
          position: { x, y }
          // parentNode:
          //   index === 0 ? `n${messages[index].id}` : `n${messages[index - 1].id}`
        }
      })

      const initialMessageEdges = messages.map((message, index) => {
        return {
          id: `e${index}`,
          source:
            index === 0
              ? `n${messages[index].id}`
              : `n${messages[index - 1].id}`,
          target: `n${message.id}`,
          animated: true
        }
      })

      setNodes(_ => [...initialMessageNodes])
      setEdges(_ => [...initialMessageEdges])
    } else {
      if (messages.length && messages.length > nodes.length) {
        const newMessage = messages[messages.length - 1]
        addNode(newMessage)
      } else if (messages.length && messages.length === nodes.length) {
        const newMessage = messages[messages.length - 1]
        updateNode(newMessage)
      }
    }
  }, [messages, setNodes])

  // if (!messages.length) {
  //   return null
  // }

  const isWaitingForResponse =
    messages[messages.length - 1].role === 'user' && isLoading

  // return (
  //   <div className="relative mx-auto max-w-2xl px-4 md:px-8">
  //     {messages.map((message, index) => {
  //       return (
  //         <div key={index}>
  //           <ChatMessage message={message} />
  //           {/* {index < messages.length - 1 && (
  //             <Separator className="my-4 md:my-8" />
  //           )} */}
  //         </div>
  //       )
  //     })}
  //   </div>
  // )
  // {
  //   isWaitingForResponse && (
  //     <div className="mt-4 flex items-center justify-center md:mt-8">
  //       <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-500"></div>
  //     </div>
  //   )
  // }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      elementsSelectable={isSelectable}
      nodesConnectable={isConnectable}
      nodesDraggable={isDraggable}
      zoomOnScroll={zoomOnScroll}
      panOnScroll={panOnScroll}
      panOnScrollMode={panOnScrollMode}
      zoomOnDoubleClick={zoomOnDoubleClick}
      onConnect={onConnect}
      onNodeClick={captureElementClick ? onNodeClick : undefined}
      onNodeDragStart={onNodeDragStart}
      onNodeDragStop={onNodeDragStop}
      panOnDrag={panOnDrag}
      onPaneClick={captureZoomClick ? onPaneClick : undefined}
      onPaneScroll={captureZoomScroll ? onPaneScroll : undefined}
      onPaneContextMenu={captureZoomClick ? onPaneContextMenu : undefined}
      fitView
    >
      <Background color="#ccc" variant={BackgroundVariant.Dots} />
      <MiniMap />
      <Controls />

      <Panel position={'top-left'}>
        <div>
          <label htmlFor="draggable">
            <input
              id="draggable"
              type="checkbox"
              checked={isDraggable}
              onChange={event => setIsDraggable(event.target.checked)}
              className="react-flow__draggable"
            />
            nodesDraggable
          </label>
        </div>
        <div>
          <label htmlFor="connectable">
            <input
              id="connectable"
              type="checkbox"
              checked={isConnectable}
              onChange={event => setIsConnectable(event.target.checked)}
              className="react-flow__connectable"
            />
            nodesConnectable
          </label>
        </div>
        <div>
          <label htmlFor="selectable">
            <input
              id="selectable"
              type="checkbox"
              checked={isSelectable}
              onChange={event => setIsSelectable(event.target.checked)}
              className="react-flow__selectable"
            />
            elementsSelectable
          </label>
        </div>
        <div>
          <label htmlFor="zoomonscroll">
            <input
              id="zoomonscroll"
              type="checkbox"
              checked={zoomOnScroll}
              onChange={event => setZoomOnScroll(event.target.checked)}
              className="react-flow__zoomonscroll"
            />
            zoomOnScroll
          </label>
        </div>
        <div>
          <label htmlFor="panonscroll">
            <input
              id="panonscroll"
              type="checkbox"
              checked={panOnScroll}
              onChange={event => setPanOnScroll(event.target.checked)}
              className="react-flow__panonscroll"
            />
            panOnScroll
          </label>
        </div>
        <div>
          <label htmlFor="panonscrollmode">
            <select
              id="panonscrollmode"
              value={panOnScrollMode}
              onChange={event =>
                setPanOnScrollMode(event.target.value as PanOnScrollMode)
              }
              className="react-flow__panonscrollmode"
            >
              <option value="free">free</option>
              <option value="horizontal">horizontal</option>
              <option value="vertical">vertical</option>
            </select>
            panOnScrollMode
          </label>
        </div>
        <div>
          <label htmlFor="zoomondbl">
            <input
              id="zoomondbl"
              type="checkbox"
              checked={zoomOnDoubleClick}
              onChange={event => setZoomOnDoubleClick(event.target.checked)}
              className="react-flow__zoomondbl"
            />
            zoomOnDoubleClick
          </label>
        </div>
        <div>
          <label htmlFor="panOnDrag">
            <input
              id="panOnDrag"
              type="checkbox"
              checked={panOnDrag}
              onChange={event => setpanOnDrag(event.target.checked)}
              className="react-flow__panOnDrag"
            />
            panOnDrag
          </label>
        </div>
        <div>
          <label htmlFor="capturezoompaneclick">
            <input
              id="capturezoompaneclick"
              type="checkbox"
              checked={captureZoomClick}
              onChange={event => setCaptureZoomClick(event.target.checked)}
              className="react-flow__capturezoompaneclick"
            />
            capture onPaneClick
          </label>
        </div>
        <div>
          <label htmlFor="capturezoompanescroll">
            <input
              id="capturezoompanescroll"
              type="checkbox"
              checked={captureZoomScroll}
              onChange={event => setCaptureZoomScroll(event.target.checked)}
              className="react-flow__capturezoompanescroll"
            />
            capture onPaneScroll
          </label>
        </div>
        <div>
          <label htmlFor="captureelementclick">
            <input
              id="captureelementclick"
              type="checkbox"
              checked={captureElementClick}
              onChange={event => setCaptureElementClick(event.target.checked)}
              className="react-flow__captureelementclick"
            />
            capture onElementClick
          </label>
        </div>
        <div>
          <button
            id="addnode"
            type="button"
            onClick={() =>
              addNode({
                id: '1',
                content: 'Hello',
                role: 'user'
              })
            }
            className="react-flow__captureelementclick"
          >
            add node
          </button>
        </div>
      </Panel>
    </ReactFlow>
  )
}
