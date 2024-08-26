// src/styles/media.ts

import { css } from "styled-components";

const sizes = {
  mobile: 900,
  desktop: 901,
};

export const media = {
  mobile: (styles: any) => css`
    @media (max-width: ${sizes.mobile}px) {
      ${styles}
    }
  `,
  desktop: (styles: any) => css`
    @media (min-width: ${sizes.desktop}px) {
      ${styles}
    }
  `,
};

export default media;
