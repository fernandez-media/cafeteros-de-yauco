interface PlayerAvatarProps {
  photo?: string;
  name: string;
  size?: number;
}

const PlayerAvatar = ({ photo, name, size = 40 }: PlayerAvatarProps) => {
  const dimension = `${size}px`;
  const iconSize = Math.round(size * 0.5);

  if (photo) {
    return (
      <div
        className="rounded-full overflow-hidden bg-white/10 flex-shrink-0"
        style={{ width: dimension, height: dimension, boxShadow: '0 0 0 2px hsl(var(--gold))' }}
      >
        <img
          src={photo}
          alt={name}
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="rounded-full bg-white/10 flex items-center justify-center flex-shrink-0"
      style={{ width: dimension, height: dimension, boxShadow: '0 0 0 2px hsl(var(--gold))' }}
      aria-hidden="true"
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );
};

export default PlayerAvatar;
