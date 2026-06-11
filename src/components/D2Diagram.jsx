import { useState } from 'react';

// Auth-flow is the reference: 1276px SVG looks perfect in max-w-4xl (896px) container.
// All other charts are capped at the same pixels-per-D2-unit ratio so nodes are
// visually the same size regardless of how wide the canvas D2 auto-computed.
const REF_SVG_W = 1276;
const CONTAINER_W = 896; // max-w-4xl
const SCALE = CONTAINER_W / REF_SVG_W; // ≈ 0.702

export function D2Diagram({ src, title }) {
  const [maxWidth, setMaxWidth] = useState('100%');

  const handleLoad = (e) => {
    const w = e.target.naturalWidth;
    if (w > 0) setMaxWidth(`${Math.round(w * SCALE)}px`);
  };

  return (
    <div className="rounded-xl border border-border/40 overflow-hidden w-full">
      {title && (
        <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
          {title}
        </p>
      )}
      <div className="w-full flex justify-center" style={{ background: '#1e1e2e' }}>
        <img
          src={src}
          alt={title || 'diagram'}
          onLoad={handleLoad}
          style={{ width: '100%', maxWidth, height: 'auto' }}
          loading="lazy"
        />
      </div>
    </div>
  );
}
