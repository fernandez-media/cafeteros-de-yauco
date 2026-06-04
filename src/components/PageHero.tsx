import ResponsiveImage from './ResponsiveImage';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  goldWord?: string;
}

const PageHero = ({ title, subtitle, goldWord }: PageHeroProps) => {
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
    <div className="relative w-full h-[200px] overflow-hidden">
      {/* Background Image */}
      <ResponsiveImage
        name="hero"
        alt=""
        width={1920}
        height={600}
        sizes="100vw"
        ariaHidden
        pictureClassName="absolute inset-0 w-full h-full"
        className="w-full h-full object-cover opacity-30"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 30%, #111111 100%)',
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full px-5 pb-6">
        <h1 className="font-display font-black text-4xl uppercase text-white leading-tight m-0">
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
