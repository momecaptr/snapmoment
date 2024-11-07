import type { SVGProps } from 'react';
import { Ref, forwardRef, memo } from 'react';

const SvgFillbell = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'1em'}
    ref={ref}
    viewBox={'0 0 18 20'}
    width={'1em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M11 16.341c0 .9-.916 1.66-2 1.66s-2-.76-2-1.66v-.34h4v.34Zm6.52-3.134-1.8-1.803V6.936C15.72 3.456 13.218.5 9.899.06a6.724 6.724 0 0 0-5.316 1.607A6.731 6.731 0 0 0 2.28 6.727l-.001 4.677-1.8 1.804a1.63 1.63 0 0 0-.354 1.782C.38 15.603.973 16 1.637 16H5v.341c0 2.018 1.794 3.66 4 3.66s4-1.642 4-3.66v-.34h3.362a1.63 1.63 0 0 0 1.51-1.01 1.632 1.632 0 0 0-.351-1.784Z'
      }
      clipRule={'evenodd'}
      fill={'currentcolor'}
      fillRule={'evenodd'}
    />
  </svg>
);
const ForwardRef = forwardRef(SvgFillbell);
const Memo = memo(ForwardRef);

export default Memo;
