import type { SVGProps } from 'react';
import { Ref, forwardRef, memo } from 'react';
const SvgUcBrowser = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'1em'}
    ref={ref}
    viewBox={'0 0 36 36'}
    width={'1em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={'M15.5 32c3.59 0 6.5-2.462 6.5-5.5S19.09 21 15.5 21 9 23.462 9 26.5s2.91 5.5 6.5 5.5'}
      fill={'currentcolor'}
      stroke={'currentcolor'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
    />
    <path
      d={
        'M22.038 28.935s4.489-.824 4.489 2.94H12.393a8.397 8.397 0 0 1-8.398-8.397c0-2.176.825-4.162 2.186-5.65 2.632-2.88 3.825-3.896 3.825-6.282 0-2.385-2.965-3.843-6.01-1.988 2.608-4.55 4.685-5.433 8.925-5.433s6.229 3.534 6.229 6.626c0 6.14-9.898 6.67-9.898 15.688'
      }
      fill={'currentcolor'}
    />
    <path
      d={
        'M22.038 28.935s4.489-.824 4.489 2.94H12.393a8.397 8.397 0 0 1-8.398-8.397c0-2.176.825-4.162 2.186-5.65 2.632-2.88 3.825-3.896 3.825-6.282 0-2.385-2.965-3.843-6.01-1.988 2.608-4.55 4.685-5.433 8.925-5.433s6.229 3.534 6.229 6.626c0 6.14-9.898 6.67-9.898 15.688'
      }
      stroke={'currentcolor'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
    />
    <path d={'M22.038 28.935a6.848 6.848 0 0 0-11.685-7.14'} fill={'currentcolor'} />
    <path
      d={'M22.038 28.935a6.848 6.848 0 0 0-11.685-7.14'}
      stroke={'currentcolor'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
    />
    <path
      d={
        'M13.606 19.14c3.954-2.779 9.431-1.674 12.92 1.639 4.02-.707 5.478 1.767 5.478 1.767-1.71-.134-3.775.492-5.14 1.007a2.28 2.28 0 0 1-2.502-.592c-2.694-2.972-6.85-5.69-10.756-3.82'
      }
      fill={'currentcolor'}
      stroke={'currentcolor'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
    />
    <path
      d={
        'M17.236 17.68s2.09-2.147 6.729-4.632c-.177-2.253-.066-3.098 1.06-3.799 1.988.503 2.385 2.871 2.385 2.871 3.667 1.237 5.125 6.229 3.755 6.936s-5.805.192-8.514-.736'
      }
      fill={'currentcolor'}
    />
    <path
      d={
        'M17.236 17.68s2.09-2.147 6.729-4.632c-.177-2.253-.066-3.098 1.06-3.799 1.988.503 2.385 2.871 2.385 2.871 3.667 1.237 5.125 6.229 3.755 6.936s-5.805.192-8.514-.736'
      }
      stroke={'currentcolor'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
    />
    <path
      d={'M14.688 28.408a1.97 1.97 0 1 0 0-3.939 1.97 1.97 0 0 0 0 3.94'}
      fill={'currentcolor'}
      stroke={'currentcolor'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
    />
  </svg>
);
const ForwardRef = forwardRef(SvgUcBrowser);
const Memo = memo(ForwardRef);

export default Memo;
