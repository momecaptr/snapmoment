import * as React from 'react';
import { Ref, SVGProps, forwardRef } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill={'none'} height={64} ref={ref} width={96} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <g clipPath={'url(#a)'}>
      <path
        d={
          'M7.652.5h80.696c3.96 0 7.152 3.14 7.152 6.99v49.02c0 3.85-3.192 6.99-7.152 6.99H7.652C3.692 63.5.5 60.36.5 56.51V7.49C.5 3.64 3.692.5 7.652.5Z'
        }
        fill={'#171717'}
        stroke={'#333'}
      />
      <path
        clipRule={'evenodd'}
        d={
          'm50.906 21.418-4.876 1.046v-3.953l4.876-1.028v3.935Zm10.142 2.19c-1.904 0-3.128.891-3.808 1.512l-.253-1.202h-4.274v22.598l4.857-1.027.02-5.485c.699.504 1.729 1.221 3.438 1.221 3.478 0 6.645-2.79 6.645-8.934-.02-5.62-3.225-8.683-6.625-8.683ZM59.882 36.96c-1.146 0-1.826-.407-2.293-.91l-.019-7.19c.505-.563 1.205-.95 2.312-.95 1.768 0 2.992 1.976 2.992 4.515 0 2.597-1.205 4.535-2.992 4.535Zm23.1-4.477c0-4.961-2.408-8.876-7.013-8.876-4.624 0-7.421 3.915-7.421 8.838 0 5.833 3.302 8.78 8.043 8.78 2.312 0 4.06-.524 5.382-1.26v-3.877c-1.322.66-2.837 1.066-4.76 1.066-1.885 0-3.556-.659-3.77-2.946h9.501c0-.106.007-.349.015-.628.011-.38.024-.829.024-1.097Zm-9.597-1.84c0-2.19 1.34-3.102 2.565-3.102 1.185 0 2.448.911 2.448 3.101h-5.013ZM46.03 23.936h4.877v16.959H46.03V23.937Zm-5.536 0 .31 1.435c1.147-2.094 3.42-1.667 4.042-1.435v4.458c-.602-.213-2.545-.485-3.692 1.008v11.493h-4.857V23.937h4.197Zm-9.404-4.205-4.74 1.007-.02 15.525c0 2.868 2.157 4.98 5.032 4.98 1.593 0 2.759-.29 3.4-.639v-3.934c-.622.252-3.692 1.143-3.692-1.725v-6.88h3.692v-4.129h-3.692l.02-4.205Zm-11.482 8.082c-1.03 0-1.651.29-1.651 1.046 0 .826 1.07 1.189 2.397 1.639 2.164.734 5.012 1.7 5.024 5.28 0 3.47-2.778 5.466-6.82 5.466a13.5 13.5 0 0 1-5.303-1.105v-4.613c1.632.892 3.691 1.55 5.304 1.55 1.088 0 1.865-.29 1.865-1.181 0-.915-1.16-1.332-2.56-1.837-2.133-.768-4.823-1.737-4.823-4.966 0-3.43 2.623-5.485 6.567-5.485 1.613 0 3.206.252 4.818.892v4.554c-1.476-.795-3.341-1.24-4.818-1.24Z'
        }
        fill={'#6461FC'}
        fillRule={'evenodd'}
      />
    </g>
    <defs>
      <clipPath id={'a'}>
        <path d={'M0 0h96v64H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);

export default ForwardRef;
