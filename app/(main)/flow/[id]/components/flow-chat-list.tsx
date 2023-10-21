import { type Message } from 'ai'

import { SmolTalkMessage } from '@/lib/types'
import { nanoid } from 'nanoid'

import { useCallback, useEffect, useMemo, useState } from 'react'
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  CoordinateExtent,
  Edge,
  MiniMap,
  Node,
  NodeChange,
  OnNodesChange,
  PanOnScrollMode,
  Panel,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow
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
  // const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const {
    setNodes,
    setEdges,
    getNodes,
    addNodes,
    addEdges,
    getNode,
    fitView,
    viewportInitialized,
    setCenter,
    getZoom
  } = useReactFlow()

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges(els => addEdge(params, els)),
    []
  )

  const [nodesLength, setNodesLength] = useState(0)

  const PADDING_X = 100
  const PADDING_Y = 100
  const WIDTH = 2000
  const HEIGHT = 1000

  const translateExtent = useMemo<CoordinateExtent>(
    () =>
      getNodes().reduce(
        ([[left, top], [right, bottom]], { position }) => [
          [
            Math.min(
              left,
              (position ?? { x: Infinity }).x - WIDTH / 2 - PADDING_X
            ),
            Math.min(
              top,
              (position ?? { y: Infinity }).y - HEIGHT / 2 - PADDING_Y
            )
          ],
          [
            Math.max(
              right,
              (position ?? { x: -Infinity }).x + WIDTH / 2 + PADDING_X
            ),
            Math.max(
              bottom,
              (position ?? { y: -Infinity }).y + HEIGHT / 2 + PADDING_Y
            )
          ]
        ],
        [
          [Infinity, Infinity],
          [-Infinity, -Infinity]
        ]
      ),
    [getNodes()]
  )

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

  const onNodesChange: OnNodesChange = (changes: NodeChange[]) => {
    console.log('onChanges: ', changes)

    const hasDimensionChanges = changes.some(
      ({ type }) => type === 'dimensions'
    )

    if (!hasDimensionChanges) {
      return
    }

    const nodes = getNodes()
    setNodesLength(nodes.length)

    if (nodes.length === messages.length && !initialLoaded) {
      const lastNode = nodes[nodes.length - 1]

      setCenter(
        lastNode.position.x + (lastNode.width || 0) / 2,
        lastNode.position.y + (lastNode.height || 0) / 2,
        {
          zoom: 1,
          duration: 0
        }
      )
      setInitialLoaded(true)
    } else if (nodes.length === messages.length) {
      const lastNode = nodes[nodes.length - 1]

      setCenter(
        lastNode.position.x + (lastNode.width || 0) / 2,
        lastNode.position.y,
        {
          zoom: getZoom(),
          duration: 500
        }
      )
    }
  }

  const addNode = (newMessage: Message) => {
    let nodes = getNodes()

    const lastNode = nodes[nodes.length - 1]

    const newY = lastNode
      ? (lastNode.height ?? 0) + lastNode.position.y + 20
      : 0

    // Create the new node
    const newNode: Node = {
      id: `n${newMessage.id}`,
      type: 'output',
      data: { label: newMessage.content },
      position: { x: -400, y: newY }
    }

    if (lastNode) {
      if (nodes.length > 1) {
        setNodes(prevNodes => [
          ...prevNodes.map(node => {
            return node.id === lastNode.id ? { ...node, type: 'default' } : node
          })
        ])
      }

      addNodes([newNode])

      const newEdge = {
        id: `${lastNode.id}_${newNode.id}`,
        source: lastNode.id,
        target: newNode.id,
        animated: true
      }

      addEdges(newEdge)
    } else {
      addNodes([{ ...newNode, type: 'input' }])
    }
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
    const nodes = getNodes()

    if (viewportInitialized && nodes.length < messages.length) {
      const message = messages[nodes.length]

      addNode(message)
    }
  }, [viewportInitialized, nodesLength])

  useEffect(() => {
    if (initialLoaded) {
      const nodes = getNodes()
      if (messages.length && messages.length > nodes.length) {
        const newMessage = messages[messages.length - 1]
        addNode(newMessage)
      } else if (messages.length && messages.length === nodes.length) {
        const newMessage = messages[messages.length - 1]
        updateNode(newMessage)
      }
    }
  }, [messages])

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
      defaultNodes={[]}
      defaultEdges={[]}
      minZoom={1}
      maxZoom={2}
      // nodes={nodes}
      // edges={edges}
      onNodesChange={onNodesChange}
      // onEdgesChange={onEdgesChange}
      elementsSelectable={isSelectable}
      nodesConnectable={isConnectable}
      nodesDraggable={isDraggable}
      translateExtent={translateExtent}
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

export function FlowChatWithProvider(props: any) {
  return (
    <ReactFlowProvider>
      <FlowChatList {...props} />
    </ReactFlowProvider>
  )
}
