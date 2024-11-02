import type { SVGProps } from 'react';
import { Ref, forwardRef, memo } from 'react';

const SvgOutlinebell = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill={'none'} height={20} width={18} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'm2.514 14 1.18-1.182c.378-.378.586-.88.586-1.414V6.727c0-1.357.59-2.654 1.62-3.556a4.66 4.66 0 0 1 3.737-1.129c2.327.309 4.082 2.413 4.082 4.895v4.467c0 .534.208 1.036.585 1.413L15.485 14H2.515ZM11 16.341C11 17.24 10.083 18 9 18s-2-.76-2-1.659V16h4v.341Zm6.521-3.133-1.8-1.804V6.937C15.72 3.456 13.216.499 9.9.06a6.722 6.722 0 0 0-5.318 1.607 6.728 6.728 0 0 0-2.302 5.06v4.677L.477 13.208a1.631 1.631 0 0 0-.354 1.782C.38 15.604.972 16 1.636 16H5v.341C5 18.359 6.793 20 9 20s4-1.641 4-3.659V16h3.363c.664 0 1.256-.396 1.51-1.009a1.63 1.63 0 0 0-.352-1.783Z'
      }
      clipRule={'evenodd'}
      fill={'#fff'}
      fillRule={'evenodd'}
    />
  </svg>
);
const ForwardRef = forwardRef(SvgOutlinebell);
const Memo = memo(ForwardRef);

export default Memo;
