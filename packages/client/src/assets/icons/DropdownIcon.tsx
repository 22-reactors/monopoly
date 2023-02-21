import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

function DropdownIcon(props: Props) {
  return (
    <svg
      {...props}
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L4 4L7 1" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}

export default DropdownIcon;
