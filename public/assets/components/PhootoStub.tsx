import * as React from 'react';
import { Ref, SVGProps, forwardRef, memo } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill={'none'} height={48} ref={ref} width={48} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <g clipPath={'url(#a)'} fill={'#fff'}>
      <path
        d={
          'M36 6H12a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6h24a6 6 0 0 0 6-6V12a6 6 0 0 0-6-6Zm-24 4h24a2 2 0 0 1 2 2v16.72l-6.4-5.46a5.54 5.54 0 0 0-7.04 0L10 35.4V12a2 2 0 0 1 2-2Zm24 28H13.12l14-11.68a1.56 1.56 0 0 1 1.86 0L38 34v2a2 2 0 0 1-2 2Z'
        }
      />
      <path d={'M16 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'} />
    </g>
    <defs>
      <clipPath id={'a'}>
        <path d={'M0 0h48v48H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

export default Memo;
