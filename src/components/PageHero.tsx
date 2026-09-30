import ResponsiveImage from './ResponsiveImage';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  goldWord?: string;
  centered?: boolean;
  tallDesktop?: boolean;
}

const PageHero = ({ title, subtitle, goldWord, centered, tallDesktop }: PageHeroProps) => {
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
        name="hero"
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
          background: tallDesktop
            ? 'linear-gradient(to bottom, transparent 50%, #111111 100%)'
            : 'linear-gradient(to bottom, transparent 30%, #111111 100%)',
        }}
      />

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
