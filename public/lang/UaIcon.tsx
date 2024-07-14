import * as React from 'react';
import { Ref, SVGProps, forwardRef, memo } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg ref={ref} viewBox={'0 0 640 480'} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <g fillRule={'evenodd'} strokeWidth={'1pt'}>
      <path d={'M0 0h640v480H0z'} fill={'#ffd500'} />
      <path d={'M0 0h640v240H0z'} fill={'#005bbb'} />
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

export default Memo;
