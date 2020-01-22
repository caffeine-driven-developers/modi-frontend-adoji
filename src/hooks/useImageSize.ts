import originalUseImageSize from '@use-hooks/image-size';
type NewUseImageSizeType = (
  src: string | null | undefined,
) => {
  width: number;
  height: number;
};

const useImageSizeRedefinedByOlaf: NewUseImageSizeType = src => {
  const [width, height] = originalUseImageSize(src);
  return {
    width,
    height,
  };
};

export default useImageSizeRedefinedByOlaf;
