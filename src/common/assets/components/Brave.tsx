import type { SVGProps } from 'react';
import { Ref, forwardRef, memo } from 'react';
const SvgBrave = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'1em'}
    ref={ref}
    viewBox={'0 0 36 36'}
    width={'1em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#Brave_svg__a)'}>
      <path
        d={
          'm23.52 0 3.144 3.57s2.76-.768 4.063.537a113 113 0 0 1 2.376 2.457l-.843 2.072 1.073 3.07s-3.156 11.97-3.525 13.433c-.729 2.878-1.227 3.99-3.297 5.449a280 280 0 0 1-6.44 4.374c-.613.384-1.38 1.038-2.07 1.038s-1.454-.654-2.07-1.038a279 279 0 0 1-6.439-4.374c-2.07-1.46-2.568-2.571-3.295-5.45-.371-1.462-3.527-13.432-3.527-13.432l1.073-3.07L2.9 6.564s1.074-1.152 2.377-2.457 4.062-.537 4.062-.537L12.482 0zm-5.518 22.404c-.21 0-1.557.476-2.637 1.035-1.08.56-1.864.956-2.114 1.113-.25.156-.098.451.13.614.229.16 3.291 2.535 3.59 2.799.297.262.733.695 1.03.695s.735-.434 1.032-.695c.297-.263 3.36-2.639 3.589-2.8.227-.162.38-.457.13-.614s-1.033-.552-2.115-1.112c-1.08-.56-2.425-1.035-2.636-1.035m0-16.917s-.614.002-1.533.309c-.92.308-1.918.69-2.377.69-.46 0-3.871-.651-3.871-.651s-4.042 4.893-4.042 5.939c0 1.045.508 1.321 1.02 1.864l3.03 3.223c.288.305.885.767.534 1.6-.353.832-.87 1.89-.294 2.965.575 1.074 1.563 1.791 2.196 1.673.631-.12 2.118-.898 2.664-1.251.545-.356 2.276-1.785 2.276-2.331 0-.548-1.789-1.53-2.119-1.752-.33-.226-1.839-1.088-1.87-1.425-.03-.341-.018-.44.425-1.277.446-.838 1.247-1.956 1.114-2.7-.134-.742-1.425-1.13-2.348-1.479-.923-.348-2.699-1.007-2.92-1.11-.222-.102-.165-.2.508-.262.672-.065 2.579-.319 3.438-.079.86.24 2.328.605 2.448.799.119.195.224.2.1.868-.121.668-.75 3.872-.811 4.44-.06.57-.18.945.432 1.086.614.141 1.646.384 2 .384s1.386-.243 1.999-.384c.612-.14.493-.516.432-1.085-.06-.57-.69-3.774-.811-4.441-.123-.668-.018-.675.1-.868.12-.194 1.588-.558 2.448-.798s2.767.013 3.438.078c.674.063.73.16.508.262-.221.104-1.997.762-2.92 1.11-.923.35-2.214.735-2.347 1.479-.136.744.667 1.862 1.113 2.7.445.837.456.936.425 1.275-.03.339-1.538 1.203-1.87 1.425-.33.225-2.12 1.206-2.12 1.753s1.732 1.976 2.278 2.332c.546.354 2.032 1.132 2.663 1.25.633.119 1.62-.6 2.197-1.672.575-1.074.058-2.133-.293-2.965-.352-.833.244-1.295.532-1.6l3.03-3.223c.512-.543 1.02-.819 1.02-1.864s-4.042-5.94-4.042-5.94-3.411.654-3.87.654-1.458-.385-2.377-.692c-.92-.308-1.533-.309-1.533-.309'
        }
        fill={'currentcolor'}
      />
    </g>
    <defs>
      <clipPath id={'Brave_svg__a'}>
        <path d={'M0 0h36v36H0z'} fill={'currentcolor'} />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SvgBrave);
const Memo = memo(ForwardRef);

export default Memo;
