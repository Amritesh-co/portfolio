import { useMemo, useState } from 'react';
import { ReactFlow, Background, Handle, Position, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from '@dagrejs/dagre';

const NODE_W = 260;
const NODE_H = 88;

function layoutGraph(nodes, edges, direction = 'TB') {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: direction, nodesep: 96, ranksep: 80, marginx: 48, marginy: 48 });
  g.setDefaultEdgeLabel(() => ({}));
  nodes.forEach(n => g.setNode(n.id, { width: NODE_W, height: NODE_H }));
  edges.forEach(e => g.setEdge(e.source, e.target));
  dagre.layout(g);
  const laidOut = nodes.map(n => {
    const { x, y } = g.node(n.id);
    return { ...n, position: { x: x - NODE_W / 2, y: y - NODE_H / 2 } };
  });
  const gb = g.graph();
  return { nodes: laidOut, graphH: gb.height || 450 };
}

const FlowNode = ({ data }) => {
  const [hovered, setHovered] = useState(false);
  const isLR = data.direction === 'LR';
  const targetPos = isLR ? Position.Left : Position.Top;
  const sourcePos = isLR ? Position.Right : Position.Bottom;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative px-5 py-4 rounded-lg border text-sm font-mono text-center leading-tight select-none flex flex-col justify-center items-center transition-all duration-300 cursor-pointer ${
        hovered
          ? "scale-[1.06] border-primary/80 shadow-[0_0_25px_rgba(139,92,246,0.35)] z-[100]"
          : "scale-100 z-10"
      } ${data.c || 'border-border/60 bg-muted/30 text-foreground'}`}
      style={{ width: NODE_W, height: NODE_H }}
    >
      <Handle type="target" position={targetPos}
        style={{ opacity: 0, width: 1, height: 1, minWidth: 0, minHeight: 0, background: 'transparent', border: 'none' }} />
      <div className="font-bold text-base leading-snug">{data.label}</div>
      {data.sub && (
        <div style={{ fontSize: '11px', opacity: 0.7, marginTop: 4, lineHeight: 1.3 }}>{data.sub}</div>
      )}
      <Handle type="source" position={sourcePos}
        style={{ opacity: 0, width: 1, height: 1, minWidth: 0, minHeight: 0, background: 'transparent', border: 'none' }} />
    </div>
  );
};

const nodeTypes = { flowNode: FlowNode };

const EDGE_STYLE  = { stroke: '#888', strokeWidth: 2.5 };
const MARKER_END  = { type: MarkerType.ArrowClosed, color: '#888', width: 18, height: 18 };
const LABEL_STYLE = { fontSize: 11, fill: '#ccc', fontFamily: 'monospace' };
const LABEL_BG    = { fill: 'hsl(var(--background))', fillOpacity: 0.9 };

export function FlowDiagram({ title, nodes: rawNodes, edges: rawEdges, direction = 'TB' }) {
  const { nodes, graphH } = useMemo(() => {
    const nodesWithDir = rawNodes.map(n => ({
      ...n,
      data: { ...n.data, direction }
    }));
    return layoutGraph(nodesWithDir, rawEdges, direction);
  }, [rawNodes, rawEdges, direction]);

  const edges = useMemo(() => rawEdges.map(e => ({
    type: 'smoothstep',
    markerEnd: MARKER_END,
    style: EDGE_STYLE,
    labelStyle: LABEL_STYLE,
    labelBgStyle: LABEL_BG,
    labelBgPadding: [3, 2],
    ...e,
  })), [rawEdges]);

  return (
    <div className="overflow-hidden w-full">
      {title && (
        <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
          {title}
        </p>
      )}
      <div style={{ height: Math.max(graphH + 140, 320) }}>
        <ReactFlow
          key={direction}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.06 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
          style={{ background: 'transparent' }}
        >
          <Background color="#2a2a3a" gap={24} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
