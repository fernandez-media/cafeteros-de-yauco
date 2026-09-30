import { Link } from 'react-router-dom';
import ResponsiveImage, { type ImageName } from './ResponsiveImage';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  goldWord?: string;
  centered?: boolean;
  tallDesktop?: boolean;
  imageName?: ImageName;
  showBack?: boolean;
}

const PageHero = ({ title, subtitle, goldWord, centered, tallDesktop, imageName = 'hero', showBack = true }: PageHeroProps) => {
  const renderTitle = () => {
    if (!goldWord) {
      return title;
    }

    const parts = title.split(new RegExp(`(${goldWord})`, 'i'));
    return parts.map((part, index) =>
      part.toLowerCase() === goldWord.toLowerCase() ? (
        <span key={index} className="text-gold">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div className={`relative w-full h-[200px] ${tallDesktop ? 'lg:h-[320px]' : ''} overflow-hidden`}>
      <ResponsiveImage
        name={imageName}
        alt=""
        width={1920}
        height={600}
        sizes="100vw"
        ariaHidden
        pictureClassName="absolute inset-0 w-full h-full"
        className={`w-full h-full object-cover ${tallDesktop ? 'opacity-40 lg:opacity-50' : 'opacity-30'}`}
      />

      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(17,17,17,0.3) 0%, transparent 40%, transparent 55%, #111111 100%)',
        }}
      />

      {showBack && (
        <Link
          to="/"
          className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white text-sm font-display font-bold no-underline transition-all duration-200 hover:bg-gold/20 hover:border-gold/40 hover:text-gold active:scale-[0.96]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Inicio
        </Link>
      )}

      <div className={`absolute bottom-0 left-0 w-full px-5 pb-6 ${centered ? 'text-center' : ''}`}>
        <h1 className={`font-display font-black text-4xl ${tallDesktop ? 'lg:text-5xl' : ''} uppercase text-white leading-tight m-0`}>
          {renderTitle()}
        </h1>
        {subtitle && (
          <p className="text-sm text-white/50 mt-1 m-0">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default PageHero;
