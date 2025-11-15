import type { SVGProps } from 'react';

// Ce composant Logo n'est plus utilisé dans l'en-tête, 
// mais il est conservé ici au cas où il serait utilisé ailleurs.
export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <g fill="currentColor">
        <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z" />
        <path d="M172.4 150.36a8 8 0 0 0-8.8 2.8l-19.83 34.33a8 8 0 0 0 13.86 8l19.83-34.33a8 8 0 0 0-5.06-10.8Z" />
        <path d="m100.24 117.89l-20-34.64a8 8 0 1 0-13.86 8l20 34.64a8 8 0 1 0 13.86-8Z" />
        <path d="M166.19 63a8 8 0 0 0-10.39 3.61L94.61 183.6a8 8 0 0 0 13.86 8l61.19-117a8 8 0 0 0-3.47-11.6Z" />
      </g>
    </svg>
  );
}
