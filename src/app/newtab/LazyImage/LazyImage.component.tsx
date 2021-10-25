import React from 'react'

interface LazyImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: {};
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}
const LazyImage = ({
  src,
  alt = "",
  className = "",
  style = {},
  onClick = (e) => {},
}: LazyImageProps) => {
  const [isError, setIsError] = React.useState<Boolean>(false);
  const [isLoaded, setIsLoaded] = React.useState<Boolean>(false);

  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
      setIsError(false);
    };
    img.onerror = () => {
      // if the error is src = '', do nothing, wait for new input
      if(src === '') return;
      setIsError(true);
    };
  }, [src]);

  if (isError) {
    return (
      <div className={`w-full h-full ${className} bg-gray-400 text-xs`}>
        Error
      </div>
    );
  }

  if (isLoaded && !isError) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        onClick={onClick}
      />
    );
  }

  return (
    <div
      className={`w-full h-full ${className} bg-gray-400 text-xs`}
      style={style}
    >
      loading
    </div>
  );
};

export default LazyImage
