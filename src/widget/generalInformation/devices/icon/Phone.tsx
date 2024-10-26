import * as React from 'react';
import { Ref, SVGProps, forwardRef } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill={'none'} height={36} ref={ref} width={36} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M24 1.5H12c-2.07 0-3.75 1.68-3.75 3.75v25.5c0 2.07 1.68 3.75 3.75 3.75h12c2.07 0 3.75-1.68 3.75-3.75V5.25c0-2.07-1.68-3.75-3.75-3.75ZM18 33a2.247 2.247 0 0 1-2.25-2.25A2.247 2.247 0 0 1 18 28.5a2.247 2.247 0 0 1 2.25 2.25A2.247 2.247 0 0 1 18 33Zm6.75-6h-13.5V6h13.5v21Z'
      }
      fill={'#fff'}
    />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);

export default ForwardRef;
