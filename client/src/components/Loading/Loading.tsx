import * as React from "react";
import "./Loading.css";
const Loading = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={160}
    height={160}
    className="pl"
    {...props}
  >
    <defs>
      <mask id="b">
        <path fill="url(#a)" d="M0 0h160v160H0z" />
      </mask>
      <mask id="c">
        <path fill="url(#a)" d="M28 28h104v104H28z" />
      </mask>
      <linearGradient id="a" x1={0} x2={0} y1={0} y2={1}>
        <stop offset="0%" />
        <stop offset="100%" stopColor="#fff" />
      </linearGradient>
    </defs>
    <g className="pl__ring-rotate">
      <circle
        cx={80}
        cy={80}
        r={72}
        fill="none"
        stroke="hsl(223,90%,55%)"
        strokeDasharray="452.39 452.39"
        strokeDashoffset={452}
        strokeLinecap="round"
        strokeWidth={16}
        className="pl__ring-stroke"
        transform="rotate(-45 80 80)"
      />
    </g>
    <g className="pl__ring-rotate" mask="url(#b)">
      <circle
        cx={80}
        cy={80}
        r={72}
        fill="none"
        stroke="hsl(193,90%,55%)"
        strokeDasharray="452.39 452.39"
        strokeDashoffset={452}
        strokeLinecap="round"
        strokeWidth={16}
        className="pl__ring-stroke"
        transform="rotate(-45 80 80)"
      />
    </g>
    <g
      stroke="hsl(223,10%,90%)"
      strokeDasharray="12 12"
      strokeDashoffset={12}
      strokeLinecap="round"
      strokeWidth={4}
    >
      <path
        d="m109.698 50.302 8.486-8.486M122 80h12M109.698 109.698l8.486 8.486M80 122v12M50.302 109.698l-8.486 8.486M38 80H26M50.302 50.302l-8.486-8.486M80 38V26"
        className="pl__tick"
      />
    </g>
    <g
      stroke="hsl(223,90%,80%)"
      strokeDasharray="12 12"
      strokeDashoffset={12}
      strokeLinecap="round"
      strokeWidth={4}
      mask="url(#b)"
    >
      <path
        d="m109.698 50.302 8.486-8.486M122 80h12M109.698 109.698l8.486 8.486M80 122v12M50.302 109.698l-8.486 8.486M38 80H26M50.302 50.302l-8.486-8.486M80 38V26"
        className="pl__tick"
      />
    </g>
    <g className="pl__arrows">
      <path
        fill="hsl(3,90%,55%)"
        d="M117.117 45.708 96.115 86.357c-.687 1.33-2.446 1.654-3.463.637L73.006 67.348c-1.016-1.016-.692-2.776.637-3.463l40.649-21.002a2.078 2.078 0 0 1 2.825 2.825Z"
      />
      <path
        fill="hsl(223,10%,90%)"
        d="m42.884 114.3 21.008-40.665c.685-1.325 2.438-1.648 3.45-.635L87 92.657c1.013 1.013.69 2.766-.635 3.45L45.7 117.116a2.072 2.072 0 0 1-2.817-2.816Z"
      />
    </g>
    <g className="pl__arrows" mask="url(#c)">
      <path
        fill="hsl(333,90%,55%)"
        d="M117.117 45.708 96.115 86.357c-.687 1.33-2.446 1.654-3.463.637L73.006 67.348c-1.016-1.016-.692-2.776.637-3.463l40.649-21.002a2.078 2.078 0 0 1 2.825 2.825Z"
      />
      <path
        fill="hsl(223,90%,80%)"
        d="m42.884 114.3 21.008-40.665c.685-1.325 2.438-1.648 3.45-.635L87 92.657c1.013 1.013.69 2.766-.635 3.45L45.7 117.116a2.072 2.072 0 0 1-2.817-2.816Z"
      />
    </g>
  </svg>
);
export default Loading;
