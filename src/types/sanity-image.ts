export type SanityImageAsset = {
  _ref?: string;
  metadata?: {
    dimensions?: {
      width?: number;
      height?: number;
    };
  };
};

export type SanityImage = {
  asset?: SanityImageAsset;
  alt?: string;
};
