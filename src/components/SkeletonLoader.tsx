const shimmerStyle = `
@keyframes shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.skeleton-bone {
  background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%);
  background-size: 800px 100%;
  animation: shimmer 1.8s ease-in-out infinite;
  border-radius: 8px;
}
`;

const Bone = ({ className = '', style }: { className?: string; style?: React.CSSProperties }) => (
  <div className={`skeleton-bone ${className}`} style={style} />
);

const SkeletonLoader = () => (
  <div className="min-h-screen bg-[#0a0a0a] pt-14">
    <style>{shimmerStyle}</style>

    {/* Hero skeleton */}
    <div className="relative w-full h-[70vh] overflow-hidden">
      <Bone className="w-full h-full" style={{ borderRadius: 0 }} />
      <div className="absolute bottom-0 left-0 w-full px-5 pb-10">
        <Bone style={{ width: '60%', height: 40, marginBottom: 12 }} />
        <Bone style={{ width: '80%', height: 40, marginBottom: 16 }} />
        <Bone style={{ width: '45%', height: 16 }} />
      </div>
    </div>

    {/* Section title */}
    <div className="px-5 pt-10 pb-4">
      <Bone style={{ width: 140, height: 22, marginBottom: 8 }} />
      <Bone style={{ width: 200, height: 12 }} />
    </div>

    {/* Horizontal cards row */}
    <div className="flex gap-4 px-5 overflow-hidden pb-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex-shrink-0 w-[150px]">
          <Bone style={{ width: 150, height: 200, marginBottom: 8 }} />
          <Bone style={{ width: 100, height: 12, marginBottom: 4 }} />
          <Bone style={{ width: 70, height: 10 }} />
        </div>
      ))}
    </div>

    {/* Section title */}
    <div className="px-5 pt-6 pb-4">
      <Bone style={{ width: 120, height: 22, marginBottom: 8 }} />
    </div>

    {/* Vertical cards */}
    <div className="px-5 flex flex-col gap-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-2xl p-3" style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.03)' }}>
          <Bone style={{ width: 72, height: 48, flexShrink: 0, borderRadius: 10 }} />
          <div className="flex-1">
            <Bone style={{ width: '70%', height: 12, marginBottom: 6 }} />
            <Bone style={{ width: '50%', height: 10 }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonLoader;
