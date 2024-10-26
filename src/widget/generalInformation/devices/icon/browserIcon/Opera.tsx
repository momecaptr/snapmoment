import * as React from 'react';
import { Ref, SVGProps, forwardRef } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill={'none'} height={36} ref={ref} width={36} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <g clipPath={'url(#a)'}>
      <path
        d={
          'M29.992 4.581A12.63 12.63 0 0 0 22.82 2.37h-.068c-2.145 0-4.162.544-5.924 1.503l.065-.033a15.477 15.477 0 0 0-4.799 3.987l-.024.031a14.723 14.723 0 0 0-2.368 4.277l-.031.104c-.576 1.585-.93 3.415-.974 5.323v.861a17.264 17.264 0 0 0 1.013 5.46l-.038-.12a14.853 14.853 0 0 0 2.422 4.41l-.022-.03a15.451 15.451 0 0 0 4.74 3.98l.081.04a12.247 12.247 0 0 0 5.851 1.467h.037-.002.039a12.69 12.69 0 0 0 7.216-2.238l-.043.029a18.07 18.07 0 0 1-5.391 3.34l-.123.043c-1.896.76-4.095 1.2-6.396 1.2h-.088.004c-.388 0-.676-.006-.864-.02a17.436 17.436 0 0 1-6.795-1.694l.105.045c-4.149-1.917-7.364-5.268-9.058-9.404l-.044-.118c-.85-2.011-1.345-4.35-1.345-6.804 0-2.527.525-4.932 1.47-7.111l-.045.115c1.832-4.355 5.228-7.749 9.466-9.54l.115-.044C13.048.528 15.435.003 17.944.003h.109a17.929 17.929 0 0 1 11.95 4.596l-.017-.015.008-.003ZM36 18v.091c0 2.606-.57 5.08-1.592 7.301l.045-.108a18.403 18.403 0 0 1-4.267 5.946l-.012.01a8.373 8.373 0 0 1-4.452 1.267h-.008a8.624 8.624 0 0 1-5.146-1.704l.022.016c2.234-.909 4.012-2.552 5.067-4.624l.026-.056c1.26-2.26 2.003-4.96 2.003-7.831 0-.108-.002-.216-.003-.323v.017c.001-.089.003-.194.003-.299 0-2.867-.738-5.559-2.035-7.9l.043.083a9.856 9.856 0 0 0-5.018-4.677l-.064-.024a8.691 8.691 0 0 1 5.1-1.668 8.567 8.567 0 0 1 4.576 1.326l-.036-.02a17.946 17.946 0 0 1 4.183 5.813l.045.113c.959 2.107 1.517 4.569 1.517 7.162v.095-.005L36 18Z'
        }
        fill={'#fff'}
      />
    </g>
    <defs>
      <clipPath id={'a'}>
        <path d={'M0 0h36v36H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);

export default ForwardRef;
