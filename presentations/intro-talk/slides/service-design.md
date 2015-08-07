### Service Design (1)

_Guidelines for our many loosely coupled services._

 * REST APIs for all requests
 * RabbitMQ messages for events
 * JSON Schema validation

<center>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   version="1.1"
   width="577.49518"
   height="293.72736"
   id="svg2">
  <defs
     id="defs4">
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mstart"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(0.4,0,0,0.4,4,0)"
         id="path5199"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker5671"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.8,0,0,-0.8,-10,0)"
         id="path5196"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Lstart"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(0.8,0,0,0.8,10,0)"
         id="path5193"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mend"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4048"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mend-9"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path6294-2"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <path
       d="m 251.37646,1280.199 c 24.33622,32.8983 59.3224,73.2045 94.39875,106.4195"
       transform="translate(0,702.36215)"
       id="path7235-14"
       style="fill:none;stroke:none" />
    <path
       d="m 417.193,1423.0345 c 24.95118,-15.18 84.14272,-66.644 103.23758,-94.0452"
       transform="translate(0,702.36215)"
       id="path7211-59"
       style="fill:none;stroke:none" />
    <path
       d="m 64.06095,1972.2176 c 35.96516,71.8882 38.83121,64.6814 33.5,121"
       id="path7200-0"
       style="fill:none;stroke:none" />
    <path
       d="m 127,1169.5 c 14.35038,12.4758 36.6232,25.0774 46.5,36.75"
       transform="translate(0,702.36215)"
       id="path7189-7"
       style="fill:none;stroke:none" />
    <path
       d="m 224.5064,1846.0895 c 2.26662,21.2383 -1.95841,40.8674 0.35355,61.3389"
       id="path7166-0"
       style="fill:none;stroke:none" />
    <path
       d="m 456.43743,1138.4241 c 28.4362,5.7057 49.00039,20.5567 51.97234,48.7903"
       transform="translate(0,702.36215)"
       id="path7161-7"
       style="fill:none;stroke:none" />
    <path
       d="m 275.77164,1927.2959 c 35.31392,7.8399 75.72672,12.6374 98.6414,42.4264"
       id="path7150-8"
       style="fill:none;stroke:none" />
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3381"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3383"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3377"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3379"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3373"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3375"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3369"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3371"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3365"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3367"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3361"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3363"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mend-08"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path6294-0"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <filter
       color-interpolation-filters="sRGB"
       id="filter4522">
      <feTurbulence
         id="feTurbulence4524"
         type="fractalNoise"
         numOctaves="7"
         baseFrequency="0.02"
         seed="55"
         result="result0" />
      <feDiffuseLighting
         id="feDiffuseLighting4526"
         surfaceScale="4"
         diffuseConstant="1"
         kernelUnitLength="1"
         result="result1"
         in="result0">
        <feDistantLight
           id="feDistantLight4528"
           azimuth="235"
           elevation="60" />
      </feDiffuseLighting>
      <feSpecularLighting
         id="feSpecularLighting4530"
         in="result0"
         surfaceScale="3"
         specularConstant="1"
         specularExponent="25"
         kernelUnitLength="1"
         result="result3">
        <feDistantLight
           id="feDistantLight4532"
           azimuth="235"
           elevation="55" />
      </feSpecularLighting>
      <feComposite
         in2="SourceGraphic"
         operator="arithmetic"
         k1="1"
         k2="0"
         k3="0"
         k4="0"
         in="result1"
         result="result2"
         id="feComposite4534" />
      <feComposite
         in2="result3"
         operator="arithmetic"
         k1="0"
         k2="1"
         k3="1"
         k4="0"
         in="result2"
         result="result4"
         id="feComposite4536" />
      <feComposite
         in2="SourceAlpha"
         operator="in"
         in="result4"
         result="fbSourceGraphic"
         id="feComposite4538" />
      <feDisplacementMap
         in2="result0"
         scale="7"
         xChannelSelector="R"
         yChannelSelector="G"
         id="feDisplacementMap4540" />
    </filter>
    <path
       d="m 251.37646,1280.199 c 24.33622,32.8983 59.3224,73.2045 94.39875,106.4195"
       transform="translate(0,702.36215)"
       id="path7235-1"
       style="fill:none;stroke:none" />
    <path
       d="m 417.193,1423.0345 c 24.95118,-15.18 84.14272,-66.644 103.23758,-94.0452"
       transform="translate(0,702.36215)"
       id="path7211-5"
       style="fill:none;stroke:none" />
    <path
       d="m 64.06095,1972.2176 c 35.96516,71.8882 38.83121,64.6814 33.5,121"
       id="path7200-5"
       style="fill:none;stroke:none" />
    <path
       d="m 127,1169.5 c 14.35038,12.4758 36.6232,25.0774 46.5,36.75"
       transform="translate(0,702.36215)"
       id="path7189-6"
       style="fill:none;stroke:none" />
    <path
       d="m 224.5064,1846.0895 c 2.26662,21.2383 -1.95841,40.8674 0.35355,61.3389"
       id="path7166-2"
       style="fill:none;stroke:none" />
    <path
       d="m 456.43743,1138.4241 c 28.4362,5.7057 49.00039,20.5567 51.97234,48.7903"
       transform="translate(0,702.36215)"
       id="path7161-2"
       style="fill:none;stroke:none" />
    <path
       d="m 275.77164,1927.2959 c 35.31392,7.8399 75.72672,12.6374 98.6414,42.4264"
       id="path7150-9"
       style="fill:none;stroke:none" />
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4074"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4076"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4070"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4072"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4066"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4068"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4062"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4064"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4058"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4060"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4054"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4056"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mend-0"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path6294-4"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <filter
       color-interpolation-filters="sRGB"
       id="filter5200">
      <feTurbulence
         id="feTurbulence5202"
         type="fractalNoise"
         numOctaves="7"
         baseFrequency="0.02"
         seed="55"
         result="result0" />
      <feDiffuseLighting
         id="feDiffuseLighting5204"
         surfaceScale="4"
         diffuseConstant="1"
         kernelUnitLength="1"
         result="result1"
         in="result0">
        <feDistantLight
           id="feDistantLight5206"
           azimuth="235"
           elevation="60" />
      </feDiffuseLighting>
      <feSpecularLighting
         id="feSpecularLighting5208"
         in="result0"
         surfaceScale="3"
         specularConstant="1"
         specularExponent="25"
         kernelUnitLength="1"
         result="result3">
        <feDistantLight
           id="feDistantLight5210"
           azimuth="235"
           elevation="55" />
      </feSpecularLighting>
      <feComposite
         in2="SourceGraphic"
         operator="arithmetic"
         k1="1"
         k2="0"
         k3="0"
         k4="0"
         in="result1"
         result="result2"
         id="feComposite5212" />
      <feComposite
         in2="result3"
         operator="arithmetic"
         k1="0"
         k2="1"
         k3="1"
         k4="0"
         in="result2"
         result="result4"
         id="feComposite5214" />
      <feComposite
         in2="SourceAlpha"
         operator="in"
         in="result4"
         result="fbSourceGraphic"
         id="feComposite5216" />
      <feDisplacementMap
         in2="result0"
         scale="7"
         xChannelSelector="R"
         yChannelSelector="G"
         id="feDisplacementMap5218" />
    </filter>
    <filter
       color-interpolation-filters="sRGB"
       id="filter4927-9">
      <feTurbulence
         id="feTurbulence4929-3"
         type="fractalNoise"
         numOctaves="7"
         baseFrequency="0.02"
         seed="55"
         result="result0" />
      <feDiffuseLighting
         id="feDiffuseLighting4931-6"
         surfaceScale="4"
         diffuseConstant="1"
         kernelUnitLength="1"
         result="result1"
         in="result0">
        <feDistantLight
           id="feDistantLight4933-1"
           azimuth="235"
           elevation="60" />
      </feDiffuseLighting>
      <feSpecularLighting
         id="feSpecularLighting4935-5"
         in="result0"
         surfaceScale="3"
         specularConstant="1"
         specularExponent="25"
         kernelUnitLength="1"
         result="result3">
        <feDistantLight
           id="feDistantLight4937-6"
           azimuth="235"
           elevation="55" />
      </feSpecularLighting>
      <feComposite
         in2="SourceGraphic"
         operator="arithmetic"
         k1="1"
         k2="0"
         k3="0"
         k4="0"
         in="result1"
         result="result2"
         id="feComposite4939-9" />
      <feComposite
         in2="result3"
         operator="arithmetic"
         k1="0"
         k2="1"
         k3="1"
         k4="0"
         in="result2"
         result="result4"
         id="feComposite4941-2" />
      <feComposite
         in2="SourceAlpha"
         operator="in"
         in="result4"
         result="fbSourceGraphic"
         id="feComposite4943-5" />
      <feDisplacementMap
         in2="result0"
         scale="7"
         xChannelSelector="R"
         yChannelSelector="G"
         id="feDisplacementMap4945-8" />
    </filter>
    <filter
       color-interpolation-filters="sRGB"
       id="filter4927">
      <feTurbulence
         id="feTurbulence4929"
         type="fractalNoise"
         numOctaves="7"
         baseFrequency="0.02"
         seed="55"
         result="result0" />
      <feDiffuseLighting
         id="feDiffuseLighting4931"
         surfaceScale="4"
         diffuseConstant="1"
         kernelUnitLength="1"
         result="result1"
         in="result0">
        <feDistantLight
           id="feDistantLight4933"
           azimuth="235"
           elevation="60" />
      </feDiffuseLighting>
      <feSpecularLighting
         id="feSpecularLighting4935"
         in="result0"
         surfaceScale="3"
         specularConstant="1"
         specularExponent="25"
         kernelUnitLength="1"
         result="result3">
        <feDistantLight
           id="feDistantLight4937"
           azimuth="235"
           elevation="55" />
      </feSpecularLighting>
      <feComposite
         in2="SourceGraphic"
         operator="arithmetic"
         k1="1"
         k2="0"
         k3="0"
         k4="0"
         in="result1"
         result="result2"
         id="feComposite4939" />
      <feComposite
         in2="result3"
         operator="arithmetic"
         k1="0"
         k2="1"
         k3="1"
         k4="0"
         in="result2"
         result="result4"
         id="feComposite4941" />
      <feComposite
         in2="SourceAlpha"
         operator="in"
         in="result4"
         result="fbSourceGraphic"
         id="feComposite4943" />
      <feDisplacementMap
         in2="result0"
         scale="7"
         xChannelSelector="R"
         yChannelSelector="G"
         id="feDisplacementMap4945" />
    </filter>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Lend"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.8,0,0,-0.8,-10,0)"
         id="path6288"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow2Lend"
       style="overflow:visible">
      <path
         d="M 8.7185878,4.0337352 -2.2072895,0.01601326 8.7185884,-4.0017078 c -1.7454984,2.3720609 -1.7354408,5.6174519 -6e-7,8.035443 z"
         transform="matrix(-1.1,0,0,-1.1,-1.1,0)"
         id="path6306"
         style="fill-rule:evenodd;stroke-width:0.625;stroke-linejoin:round" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mend-8"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path6294"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
  </defs>
  <metadata
     id="metadata7">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     transform="translate(-6.9777259,-730.90928)"
     id="layer1">
    <g
       transform="matrix(1.2922355,0,0,1.2922355,-23.095456,-278.39618)"
       id="g6092-3-6-3">
      <g
         transform="translate(-36.25,12.75)"
         id="g5228-7-5-3">
        <path
           d="m 79,266 28.5,-28.5 7.97789,29.77388"
           transform="translate(0,702.36215)"
           id="path5220-9-0-0"
           style="fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" />
        <path
           d="m 107,237.5 6.74343,-25.16682 -22.545109,6.04094"
           transform="translate(0,702.36215)"
           id="path5222-6-2-5"
           style="fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" />
        <path
           d="m 114,212.5 9,18"
           transform="translate(0,702.36215)"
           id="path5224-3-5-4"
           style="fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" />
        <path
           d="m 131,201.5 a 12.75,12.25 0 1 1 -25.5,0 12.75,12.25 0 1 1 25.5,0 z"
           transform="translate(1.75,701.61215)"
           id="path5226-7-5-8"
           style="color:#000000;fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" />
      </g>
      <path
         d="m 81.75,951.1122 23.25,-2.25005 5.5972,-20.88902"
         id="path6086-5-9-6"
         style="fill:none;stroke:#ffffff;stroke-width:3.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" />
      <text
         x="30"
         y="1000.3621"
         id="text6088-6-3-7"
         xml:space="preserve"
         style="font-size:18px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:DejaVu Sans;-inkscape-font-specification:DejaVu Sans"><tspan
           x="30"
           y="1000.3621"
           id="tspan6090-6-9-6"
           style="fill:#ffffff;fill-opacity:1">Consumer</tspan></text>
    </g>
    <g
       transform="matrix(2.6826905,0,0,2.6826905,139.96085,-1383.9788)"
       id="g5342-5-7-6-8"
       style="fill:#ffffff;fill-opacity:1">
      <path
         d="m 131.09203,838.77085 29.8198,0 0,29.81981 -7.50365,10 -32.31615,0 0,-32.31225 z m -10,8 31.8198,0 0,31.81981 -31.8198,0 z"
         id="rect5234-6-7-9-3-3"
         style="color:#000000;fill:none;stroke:#ffffff;stroke-width:2.0874567;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" />
      <path
         d="m 152.77926,144.62967 8.06544,-8.06543"
         transform="translate(0,702.36215)"
         id="path5340-64-9-9-5"
         style="fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-width:2.23656058;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" />
    </g>
    <text
       x="253.8875"
       y="852.91364"
       id="text6033-5-5"
       xml:space="preserve"
       style="font-size:21.9134655px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:DejaVu Sans;-inkscape-font-specification:DejaVu Sans"><tspan
         x="253.8875"
         y="852.91364"
         id="tspan6035-2-5"
         style="fill:#ffffff;fill-opacity:1" /></text>
    <text
       x="470.20859"
       y="1008.5314"
       id="text6088-6-3-7-6"
       xml:space="preserve"
       style="font-size:27.99529266px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:DejaVu Sans;-inkscape-font-specification:DejaVu Sans"><tspan
         x="470.20859"
         y="1008.5314"
         id="tspan6090-6-9-6-9"
         style="fill:#ffffff;fill-opacity:1">Queue</tspan></text>
    <text
       x="233.38641"
       y="780.74622"
       id="text6170"
       xml:space="preserve"
       style="font-size:26.27815628px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"><tspan
         x="233.38641"
         y="780.74622"
         id="tspan6172" /></text>
    <g
       transform="translate(0,111.11678)"
       id="g4082">
      <path
         d="m 296.0625,795.71875 c -49.45344,-0.17966 -99.37839,3.66567 -150,13.1875 l 0.75,4.03125 c 100.67609,-18.93699 198.75157,-15.3759 295.78125,-2.125 L 443.125,806.75 c -48.64955,-6.64385 -97.60906,-10.85159 -147.0625,-11.03125 z"
         id="path3888"
         style="font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-indent:0;text-align:start;text-decoration:none;line-height:normal;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;text-anchor:start;baseline-shift:baseline;color:#000000;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:4.0999999;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate;font-family:Sans;-inkscape-font-specification:Sans" />
      <path
         d="m 426.60797,806.57167 -9.23412,7.01505 29.54559,-4.2412 -27.32651,-12.00797 7.01504,9.23412 z"
         id="path4088"
         style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#ffffff;stroke-width:1.63999996pt;stroke-opacity:1" />
    </g>
    <g
       transform="translate(0,111.11678)"
       id="g4090">
      <path
         d="m 430.40625,824.67468 0.5,4.0625 12.1875,-1.46875 -0.5,-4.09375 z m -282.875,5.4375 0.84375,0.125 0.65625,-4.0625 -0.84375,-0.125 z m 258.4375,-2.625 0.46875,4.0625 12.21875,-1.375 -0.4375,-4.0625 z m -245.40625,4.625 4.6875,0.65625 0.0312,0 7.5,1 0.53125,-4.0625 -7.5,-1 0,0.0312 -4.65625,-0.6875 z m 225.25,-2.5625 -0.0312,0 -4.25,0.375 0.375,4.09375 4.28125,-0.40625 8,-0.78125 -0.40625,-4.0625 z m -18.8125,1.6875 -0.0312,0 -9.375,0.75 -0.53125,0.0312 0.3125,4.09375 0.53125,-0.0312 9.40625,-0.75 0,-0.0312 2.34375,-0.1875 -0.34375,-4.09375 z m -181.9375,3.9375 7,0.75 0.0312,0 5.21875,0.46875 0.375,-4.09375 -5.1875,-0.46875 -0.0312,0 -7,-0.71875 z m 153.84375,-1.90625 -0.0312,0 -6.3125,0.375 0.21875,4.09375 6.34375,-0.375 0.0312,0 5.9375,-0.375 -0.28125,-4.09375 z m -129.3125,4.125 0.5,0.0625 0.0312,0 9.03125,0.59375 0.0312,0 2.75,0.15625 0.21875,-4.09375 -2.71875,-0.15625 -0.0312,0 -8.96875,-0.59375 -0.0312,0 -0.46875,-0.0312 z M 311,834.70593 l -0.0312,0 -2.9375,0.0937 0.15625,4.09375 2.9375,-0.0937 0.0312,0 9.28125,-0.40625 0.0312,0 0.0312,0 -0.21875,-4.09375 -0.0312,0 z m -76.78125,4.09375 3.15625,0.15625 9.125,0.28125 0.0312,0 0.0312,0 0.0937,-4.09375 -0.0312,0 -9.09375,-0.28125 -3.125,-0.15625 z m 58.25,-3.5625 -9,0.15625 0.0625,4.125 9.03125,-0.15625 3.3125,-0.0937 -0.125,-4.09375 z m -33.59375,4.25 5.96875,0.0625 0.0312,0 6.34375,0.0312 0,-4.09375 -6.3125,-0.0312 -0.0312,0 -5.9375,-0.0625 z"
         id="path3890"
         style="font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-indent:0;text-align:start;text-decoration:none;line-height:normal;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;text-anchor:start;baseline-shift:baseline;color:#000000;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:4.0999999;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate;font-family:Sans;-inkscape-font-specification:Sans" />
      <path
         d="m 164.03643,830.75802 9.43041,-6.74887 -29.65452,3.39693 26.97298,12.78235 -6.74887,-9.43041 z"
         id="path4096"
         style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#ffffff;stroke-width:1.63999996pt;stroke-opacity:1" />
    </g>
    <text
       x="222.85715"
       y="235.71429"
       transform="translate(0,552.36218)"
       id="text3892"
       xml:space="preserve"
       style="font-size:16px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"><tspan
         x="222.85715"
         y="235.71429"
         id="tspan3894" /></text>
    <text
       x="222.14285"
       y="932.76465"
       id="text3896"
       xml:space="preserve"
       style="font-size:16px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"><tspan
         x="222.14285"
         y="932.76465"
         id="tspan3898">JSON REST API</tspan></text>
    <g
       transform="matrix(1.5742694,0,0,1.5742694,-110.01733,-669.66418)"
       id="g6081-5-2-7-6">
      <path
         d="m 257.38687,168.98067 a 29.698485,29.698485 0 1 1 -59.39697,0 29.698485,29.698485 0 1 1 59.39697,0 z"
         transform="matrix(0.5756846,0,0,0.5756846,116.05713,816.84321)"
         id="path5524-5-3-3-3"
         style="color:#000000;fill:none;stroke:#ffffff;stroke-width:3.47412443;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" />
      <text
         x="202.93965"
         y="950.53876"
         id="text5526-9-5-5-9"
         xml:space="preserve"
         style="font-size:18px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"><tspan
           x="202.93965"
           y="950.53876"
           id="tspan5528-9-4-1-4"
           style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;fill:#ffffff;fill-opacity:1;font-family:DejaVu Sans;-inkscape-font-specification:DejaVu Sans">RabbitMQ</tspan></text>
    </g>
    <g
       transform="translate(0,111.11678)"
       id="g6580">
      <path
         d="m 321,655.01843 -0.59375,3.25 c 64.75023,11.79411 120.71799,38.2206 162.625,88.71875 l 2.53125,-2.09375 C 443.09431,693.71906 386.27673,666.90844 321,655.01843 z"
         id="path4531"
         style="font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-indent:0;text-align:start;text-decoration:none;line-height:normal;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;text-anchor:start;baseline-shift:baseline;color:#000000;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:3.29999995;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate;font-family:Sans;-inkscape-font-specification:Sans" />
      <path
         d="m 333.70061,659.01333 7.67588,-5.31045 -23.90879,2.35366 21.54336,10.63267 -5.31045,-7.67588 z"
         id="path6586"
         style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#ffffff;stroke-width:1.31999998pt;stroke-opacity:1" />
    </g>
    <g
       transform="translate(0,111.11678)"
       id="g6570">
      <path
         d="m 235.15625,657.75 -0.0312,0 -0.40625,0.0937 0.65625,3.21875 0.375,-0.0937 0.0625,0 2.78125,-0.5 -0.59375,-3.25 z m -6.1875,1.34375 -0.0312,0 -0.75,0.1875 0.84375,3.21875 0.6875,-0.1875 0.0312,0 2.4375,-0.5625 -0.75,-3.21875 z m -6.09375,1.625 -0.0312,0 -1.0625,0.34375 0.9375,3.15625 1.03125,-0.3125 0.0312,0 2.09375,-0.59375 -0.90625,-3.1875 z m -5.96875,1.875 -0.0312,0 -0.0312,0.0312 -1.40625,0.5 1.0625,3.09375 1.40625,-0.46875 0.0312,-0.0312 1.65625,-0.53125 -1,-3.125 z m -5.875,2.125 -0.0312,0 0,0.0312 -1.8125,0.71875 1.21875,3.0625 1.78125,-0.71875 0.0312,0 1.21875,-0.46875 -1.15625,-3.09375 z m -5.78125,2.34375 0,0.0312 -0.0312,0 -2.1875,0.96875 1.34375,3 2.15625,-0.9375 0.0312,-0.0312 0.8125,-0.34375 -1.28125,-3.03125 z m -5.625,2.5625 -0.0312,0 0,0.0312 -2.5625,1.25 1.4375,2.96875 2.53125,-1.25 0.0312,0 0.375,-0.1875 -1.375,-3 z m -8.25,4.21875 -0.0312,0 -0.25,0.15625 1.59375,2.875 0.21875,-0.125 0.0312,0 2.65625,-1.40625 -1.5625,-2.9375 z M 186,676.875 l -0.0312,0 -0.65625,0.40625 1.71875,2.84375 0.625,-0.40625 0.0312,0 2.15625,-1.25 -1.65625,-2.84375 z m -5.21875,3.1875 -0.0312,0 -0.0312,0.0312 -1.0625,0.6875 1.78125,2.78125 1.0625,-0.6875 0.0312,-0.0312 1.65625,-1 L 182.5,679 z m -5.15625,3.34375 -0.0312,0.0312 -1.5,1.03125 1.90625,2.71875 1.4375,-1.03125 0.0312,-0.0312 1.21875,-0.78125 -1.8125,-2.75 z m -5,3.46875 -0.0312,0.0312 -1.90625,1.40625 1.9375,2.65625 1.875,-1.375 0.0312,-0.0312 0.75,-0.5 -1.875,-2.71875 z m -4.90625,3.625 -0.0312,0 -2.3125,1.8125 2.03125,2.59375 2.28125,-1.75 0.0312,-0.0312 0.25,-0.21875 -1.9375,-2.65625 z m -7.53125,5.9375 2.09375,2.5625 2.5625,-2.09375 -2.09375,-2.5625 z m -5.09375,4.28125 2.15625,2.5 2.5,-2.15625 -2.125,-2.5 z m -4.96875,4.375 2.1875,2.46875 2.46875,-2.1875 -2.1875,-2.46875 z m -4.875,4.5 2.25,2.40625 2.40625,-2.21875 -2.21875,-2.4375 z m -4.46875,4.3125 -0.0312,0.0312 -0.28125,0.28125 2.34375,2.34375 0.25,-0.28125 0.0312,0 2.0625,-2 -2.3125,-2.375 z M 134.6875,718 l -0.0312,0.0312 -0.875,0.90625 2.375,2.28125 0.875,-0.875 0,-0.0312 1.4375,-1.4375 -2.34375,-2.3125 z m -3.96875,4.09375 0,0.0312 -1.5,1.59375 2.40625,2.25 1.46875,-1.5625 0.0312,-0.0312 0.75,-0.78125 -2.375,-2.28125 z m -3.84375,4.09375 0,0.0312 -2.15625,2.34375 2.4375,2.21875 2.15625,-2.34375 0.0625,-0.0625 -2.40625,-2.25 z m -6.59375,7.3125 2.46875,2.1875 2.21875,-2.46875 -2.46875,-2.1875 z m -4.21875,4.84375 0,0.0312 -0.125,0.125 2.53125,2.15625 0.125,-0.15625 -0.0312,0 2.03125,-2.34375 L 118.125,736 z m -3.34375,3.96875 -0.0312,0.0312 -1,1.25 2.53125,2.09375 1.03125,-1.25 -0.0312,0 1.09375,-1.28125 -2.5,-2.125 z m -5.25,6.34375 2.5625,2.125 2.09375,-2.5625 -2.5625,-2.09375 z m -4.15625,5.1875 2.59375,2.03125 2.0625,-2.5625 -2.59375,-2.0625 z m -2.8125,3.5 0,0.0312 -1.3125,1.625 2.625,2.03125 1.28125,-1.625 -0.0312,0 0.78125,-0.9375 -2.59375,-2.0625 z m -5.375,6.84375 2.59375,2.0625 2.03125,-2.59375 -2.59375,-2.0625 z"
         id="path4533"
         style="font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-indent:0;text-align:start;text-decoration:none;line-height:normal;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;text-anchor:start;baseline-shift:baseline;color:#000000;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:3.29999995;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate;font-family:Sans;-inkscape-font-specification:Sans" />
      <path
         d="m 104.54485,754.80942 -1.14681,-9.26309 -8.998541,22.27546 19.408441,-14.15918 -9.26309,1.14681 z"
         id="path6576"
         style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#ffffff;stroke-width:1.31999998pt;stroke-opacity:1" />
      <path
         d="m 225.56013,661.01475 -5.39364,7.61765 21.65776,-10.39765 -23.88176,-2.61364 7.61764,5.39364 z"
         id="path6578"
         style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#ffffff;stroke-width:1.31999998pt;stroke-opacity:1" />
    </g>
    <text
       x="774.46997"
       y="373.50708"
       transform="matrix(0.79520415,0.60634178,-0.60634178,0.79520415,0,0)"
       id="text3896-3"
       xml:space="preserve"
       style="font-size:16px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"><tspan
         x="774.46997"
         y="373.50708"
         id="tspan3898-6">Publish Events</tspan></text>
    <text
       x="-450.88284"
       y="705.80188"
       transform="matrix(0.75488736,-0.65585446,0.65585446,0.75488736,0,0)"
       id="text6644"
       xml:space="preserve"
       style="font-size:16px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"><tspan
         x="-450.88284"
         y="705.80188"
         id="tspan6646">Listen</tspan></text>
  </g>
</svg>
</center>


---

### Service Design (2)

_Guidelines for our many loosely coupled services._

 * Store state in Azure Table Storage
 * Redirect to S3 when possible
 * Scale through concurrency


<center>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   version="1.1"
   width="577.49518"
   height="293.72736"
   id="svg2">
  <defs
     id="defs4">
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mstart"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(0.4,0,0,0.4,4,0)"
         id="path5199"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker5671"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.8,0,0,-0.8,-10,0)"
         id="path5196"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Lstart"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(0.8,0,0,0.8,10,0)"
         id="path5193"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mend"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4048"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mend-9"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path6294-2"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <path
       d="m 251.37646,1280.199 c 24.33622,32.8983 59.3224,73.2045 94.39875,106.4195"
       transform="translate(0,702.36215)"
       id="path7235-14"
       style="fill:none;stroke:none" />
    <path
       d="m 417.193,1423.0345 c 24.95118,-15.18 84.14272,-66.644 103.23758,-94.0452"
       transform="translate(0,702.36215)"
       id="path7211-59"
       style="fill:none;stroke:none" />
    <path
       d="m 64.06095,1972.2176 c 35.96516,71.8882 38.83121,64.6814 33.5,121"
       id="path7200-0"
       style="fill:none;stroke:none" />
    <path
       d="m 127,1169.5 c 14.35038,12.4758 36.6232,25.0774 46.5,36.75"
       transform="translate(0,702.36215)"
       id="path7189-7"
       style="fill:none;stroke:none" />
    <path
       d="m 224.5064,1846.0895 c 2.26662,21.2383 -1.95841,40.8674 0.35355,61.3389"
       id="path7166-0"
       style="fill:none;stroke:none" />
    <path
       d="m 456.43743,1138.4241 c 28.4362,5.7057 49.00039,20.5567 51.97234,48.7903"
       transform="translate(0,702.36215)"
       id="path7161-7"
       style="fill:none;stroke:none" />
    <path
       d="m 275.77164,1927.2959 c 35.31392,7.8399 75.72672,12.6374 98.6414,42.4264"
       id="path7150-8"
       style="fill:none;stroke:none" />
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3381"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3383"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3377"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3379"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3373"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3375"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3369"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3371"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3365"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3367"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3361"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3363"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mend-08"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path6294-0"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <filter
       color-interpolation-filters="sRGB"
       id="filter4522">
      <feTurbulence
         id="feTurbulence4524"
         type="fractalNoise"
         numOctaves="7"
         baseFrequency="0.02"
         seed="55"
         result="result0" />
      <feDiffuseLighting
         id="feDiffuseLighting4526"
         surfaceScale="4"
         diffuseConstant="1"
         kernelUnitLength="1"
         result="result1"
         in="result0">
        <feDistantLight
           id="feDistantLight4528"
           azimuth="235"
           elevation="60" />
      </feDiffuseLighting>
      <feSpecularLighting
         id="feSpecularLighting4530"
         in="result0"
         surfaceScale="3"
         specularConstant="1"
         specularExponent="25"
         kernelUnitLength="1"
         result="result3">
        <feDistantLight
           id="feDistantLight4532"
           azimuth="235"
           elevation="55" />
      </feSpecularLighting>
      <feComposite
         in2="SourceGraphic"
         operator="arithmetic"
         k1="1"
         k2="0"
         k3="0"
         k4="0"
         in="result1"
         result="result2"
         id="feComposite4534" />
      <feComposite
         in2="result3"
         operator="arithmetic"
         k1="0"
         k2="1"
         k3="1"
         k4="0"
         in="result2"
         result="result4"
         id="feComposite4536" />
      <feComposite
         in2="SourceAlpha"
         operator="in"
         in="result4"
         result="fbSourceGraphic"
         id="feComposite4538" />
      <feDisplacementMap
         in2="result0"
         scale="7"
         xChannelSelector="R"
         yChannelSelector="G"
         id="feDisplacementMap4540" />
    </filter>
    <path
       d="m 251.37646,1280.199 c 24.33622,32.8983 59.3224,73.2045 94.39875,106.4195"
       transform="translate(0,702.36215)"
       id="path7235-1"
       style="fill:none;stroke:none" />
    <path
       d="m 417.193,1423.0345 c 24.95118,-15.18 84.14272,-66.644 103.23758,-94.0452"
       transform="translate(0,702.36215)"
       id="path7211-5"
       style="fill:none;stroke:none" />
    <path
       d="m 64.06095,1972.2176 c 35.96516,71.8882 38.83121,64.6814 33.5,121"
       id="path7200-5"
       style="fill:none;stroke:none" />
    <path
       d="m 127,1169.5 c 14.35038,12.4758 36.6232,25.0774 46.5,36.75"
       transform="translate(0,702.36215)"
       id="path7189-6"
       style="fill:none;stroke:none" />
    <path
       d="m 224.5064,1846.0895 c 2.26662,21.2383 -1.95841,40.8674 0.35355,61.3389"
       id="path7166-2"
       style="fill:none;stroke:none" />
    <path
       d="m 456.43743,1138.4241 c 28.4362,5.7057 49.00039,20.5567 51.97234,48.7903"
       transform="translate(0,702.36215)"
       id="path7161-2"
       style="fill:none;stroke:none" />
    <path
       d="m 275.77164,1927.2959 c 35.31392,7.8399 75.72672,12.6374 98.6414,42.4264"
       id="path7150-9"
       style="fill:none;stroke:none" />
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4074"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4076"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4070"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4072"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4066"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4068"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4062"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4064"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4058"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4060"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4054"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4056"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mend-0"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path6294-4"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <filter
       color-interpolation-filters="sRGB"
       id="filter5200">
      <feTurbulence
         id="feTurbulence5202"
         type="fractalNoise"
         numOctaves="7"
         baseFrequency="0.02"
         seed="55"
         result="result0" />
      <feDiffuseLighting
         id="feDiffuseLighting5204"
         surfaceScale="4"
         diffuseConstant="1"
         kernelUnitLength="1"
         result="result1"
         in="result0">
        <feDistantLight
           id="feDistantLight5206"
           azimuth="235"
           elevation="60" />
      </feDiffuseLighting>
      <feSpecularLighting
         id="feSpecularLighting5208"
         in="result0"
         surfaceScale="3"
         specularConstant="1"
         specularExponent="25"
         kernelUnitLength="1"
         result="result3">
        <feDistantLight
           id="feDistantLight5210"
           azimuth="235"
           elevation="55" />
      </feSpecularLighting>
      <feComposite
         in2="SourceGraphic"
         operator="arithmetic"
         k1="1"
         k2="0"
         k3="0"
         k4="0"
         in="result1"
         result="result2"
         id="feComposite5212" />
      <feComposite
         in2="result3"
         operator="arithmetic"
         k1="0"
         k2="1"
         k3="1"
         k4="0"
         in="result2"
         result="result4"
         id="feComposite5214" />
      <feComposite
         in2="SourceAlpha"
         operator="in"
         in="result4"
         result="fbSourceGraphic"
         id="feComposite5216" />
      <feDisplacementMap
         in2="result0"
         scale="7"
         xChannelSelector="R"
         yChannelSelector="G"
         id="feDisplacementMap5218" />
    </filter>
    <filter
       color-interpolation-filters="sRGB"
       id="filter4927-9">
      <feTurbulence
         id="feTurbulence4929-3"
         type="fractalNoise"
         numOctaves="7"
         baseFrequency="0.02"
         seed="55"
         result="result0" />
      <feDiffuseLighting
         id="feDiffuseLighting4931-6"
         surfaceScale="4"
         diffuseConstant="1"
         kernelUnitLength="1"
         result="result1"
         in="result0">
        <feDistantLight
           id="feDistantLight4933-1"
           azimuth="235"
           elevation="60" />
      </feDiffuseLighting>
      <feSpecularLighting
         id="feSpecularLighting4935-5"
         in="result0"
         surfaceScale="3"
         specularConstant="1"
         specularExponent="25"
         kernelUnitLength="1"
         result="result3">
        <feDistantLight
           id="feDistantLight4937-6"
           azimuth="235"
           elevation="55" />
      </feSpecularLighting>
      <feComposite
         in2="SourceGraphic"
         operator="arithmetic"
         k1="1"
         k2="0"
         k3="0"
         k4="0"
         in="result1"
         result="result2"
         id="feComposite4939-9" />
      <feComposite
         in2="result3"
         operator="arithmetic"
         k1="0"
         k2="1"
         k3="1"
         k4="0"
         in="result2"
         result="result4"
         id="feComposite4941-2" />
      <feComposite
         in2="SourceAlpha"
         operator="in"
         in="result4"
         result="fbSourceGraphic"
         id="feComposite4943-5" />
      <feDisplacementMap
         in2="result0"
         scale="7"
         xChannelSelector="R"
         yChannelSelector="G"
         id="feDisplacementMap4945-8" />
    </filter>
    <filter
       color-interpolation-filters="sRGB"
       id="filter4927">
      <feTurbulence
         id="feTurbulence4929"
         type="fractalNoise"
         numOctaves="7"
         baseFrequency="0.02"
         seed="55"
         result="result0" />
      <feDiffuseLighting
         id="feDiffuseLighting4931"
         surfaceScale="4"
         diffuseConstant="1"
         kernelUnitLength="1"
         result="result1"
         in="result0">
        <feDistantLight
           id="feDistantLight4933"
           azimuth="235"
           elevation="60" />
      </feDiffuseLighting>
      <feSpecularLighting
         id="feSpecularLighting4935"
         in="result0"
         surfaceScale="3"
         specularConstant="1"
         specularExponent="25"
         kernelUnitLength="1"
         result="result3">
        <feDistantLight
           id="feDistantLight4937"
           azimuth="235"
           elevation="55" />
      </feSpecularLighting>
      <feComposite
         in2="SourceGraphic"
         operator="arithmetic"
         k1="1"
         k2="0"
         k3="0"
         k4="0"
         in="result1"
         result="result2"
         id="feComposite4939" />
      <feComposite
         in2="result3"
         operator="arithmetic"
         k1="0"
         k2="1"
         k3="1"
         k4="0"
         in="result2"
         result="result4"
         id="feComposite4941" />
      <feComposite
         in2="SourceAlpha"
         operator="in"
         in="result4"
         result="fbSourceGraphic"
         id="feComposite4943" />
      <feDisplacementMap
         in2="result0"
         scale="7"
         xChannelSelector="R"
         yChannelSelector="G"
         id="feDisplacementMap4945" />
    </filter>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Lend"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.8,0,0,-0.8,-10,0)"
         id="path6288"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow2Lend"
       style="overflow:visible">
      <path
         d="M 8.7185878,4.0337352 -2.2072895,0.01601326 8.7185884,-4.0017078 c -1.7454984,2.3720609 -1.7354408,5.6174519 -6e-7,8.035443 z"
         transform="matrix(-1.1,0,0,-1.1,-1.1,0)"
         id="path6306"
         style="fill-rule:evenodd;stroke-width:0.625;stroke-linejoin:round" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mend-8"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path6294"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mend-9-5"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path6294-2-5"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <path
       d="m 251.37646,1280.199 c 24.33622,32.8983 59.3224,73.2045 94.39875,106.4195"
       transform="translate(0,702.36215)"
       id="path7235-14-2"
       style="fill:none;stroke:none" />
    <path
       d="m 417.193,1423.0345 c 24.95118,-15.18 84.14272,-66.644 103.23758,-94.0452"
       transform="translate(0,702.36215)"
       id="path7211-59-6"
       style="fill:none;stroke:none" />
    <path
       d="m 64.06095,1972.2176 c 35.96516,71.8882 38.83121,64.6814 33.5,121"
       id="path7200-0-4"
       style="fill:none;stroke:none" />
    <path
       d="m 127,1169.5 c 14.35038,12.4758 36.6232,25.0774 46.5,36.75"
       transform="translate(0,702.36215)"
       id="path7189-7-3"
       style="fill:none;stroke:none" />
    <path
       d="m 224.5064,1846.0895 c 2.26662,21.2383 -1.95841,40.8674 0.35355,61.3389"
       id="path7166-0-9"
       style="fill:none;stroke:none" />
    <path
       d="m 456.43743,1138.4241 c 28.4362,5.7057 49.00039,20.5567 51.97234,48.7903"
       transform="translate(0,702.36215)"
       id="path7161-7-7"
       style="fill:none;stroke:none" />
    <path
       d="m 275.77164,1927.2959 c 35.31392,7.8399 75.72672,12.6374 98.6414,42.4264"
       id="path7150-8-6"
       style="fill:none;stroke:none" />
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3381-4"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3383-1"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3377-6"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3379-1"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3373-9"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3375-6"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3369-6"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3371-2"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3365-1"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3367-4"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3361-3"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3363-7"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mend-08-5"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path6294-0-0"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <filter
       color-interpolation-filters="sRGB"
       id="filter4522-1">
      <feTurbulence
         id="feTurbulence4524-9"
         type="fractalNoise"
         numOctaves="7"
         baseFrequency="0.02"
         seed="55"
         result="result0" />
      <feDiffuseLighting
         id="feDiffuseLighting4526-4"
         surfaceScale="4"
         diffuseConstant="1"
         kernelUnitLength="1"
         result="result1"
         in="result0">
        <feDistantLight
           id="feDistantLight4528-4"
           azimuth="235"
           elevation="60" />
      </feDiffuseLighting>
      <feSpecularLighting
         id="feSpecularLighting4530-8"
         in="result0"
         surfaceScale="3"
         specularConstant="1"
         specularExponent="25"
         kernelUnitLength="1"
         result="result3">
        <feDistantLight
           id="feDistantLight4532-1"
           azimuth="235"
           elevation="55" />
      </feSpecularLighting>
      <feComposite
         in2="SourceGraphic"
         operator="arithmetic"
         k1="1"
         k2="0"
         k3="0"
         k4="0"
         in="result1"
         result="result2"
         id="feComposite4534-4" />
      <feComposite
         in2="result3"
         operator="arithmetic"
         k1="0"
         k2="1"
         k3="1"
         k4="0"
         in="result2"
         result="result4"
         id="feComposite4536-8" />
      <feComposite
         in2="SourceAlpha"
         operator="in"
         in="result4"
         result="fbSourceGraphic"
         id="feComposite4538-6" />
      <feDisplacementMap
         in2="result0"
         scale="7"
         xChannelSelector="R"
         yChannelSelector="G"
         id="feDisplacementMap4540-6" />
    </filter>
    <path
       d="m 251.37646,1280.199 c 24.33622,32.8983 59.3224,73.2045 94.39875,106.4195"
       transform="translate(0,702.36215)"
       id="path7235-1-9"
       style="fill:none;stroke:none" />
    <path
       d="m 417.193,1423.0345 c 24.95118,-15.18 84.14272,-66.644 103.23758,-94.0452"
       transform="translate(0,702.36215)"
       id="path7211-5-5"
       style="fill:none;stroke:none" />
    <path
       d="m 64.06095,1972.2176 c 35.96516,71.8882 38.83121,64.6814 33.5,121"
       id="path7200-5-5"
       style="fill:none;stroke:none" />
    <path
       d="m 127,1169.5 c 14.35038,12.4758 36.6232,25.0774 46.5,36.75"
       transform="translate(0,702.36215)"
       id="path7189-6-5"
       style="fill:none;stroke:none" />
    <path
       d="m 224.5064,1846.0895 c 2.26662,21.2383 -1.95841,40.8674 0.35355,61.3389"
       id="path7166-2-8"
       style="fill:none;stroke:none" />
    <path
       d="m 456.43743,1138.4241 c 28.4362,5.7057 49.00039,20.5567 51.97234,48.7903"
       transform="translate(0,702.36215)"
       id="path7161-2-0"
       style="fill:none;stroke:none" />
    <path
       d="m 275.77164,1927.2959 c 35.31392,7.8399 75.72672,12.6374 98.6414,42.4264"
       id="path7150-9-4"
       style="fill:none;stroke:none" />
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4074-8"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4076-4"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4070-2"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4072-0"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4066-2"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4068-8"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4062-6"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4064-1"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4058-1"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4060-9"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4054-6"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4056-2"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mend-0-7"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path6294-4-2"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <filter
       color-interpolation-filters="sRGB"
       id="filter5200-3">
      <feTurbulence
         id="feTurbulence5202-1"
         type="fractalNoise"
         numOctaves="7"
         baseFrequency="0.02"
         seed="55"
         result="result0" />
      <feDiffuseLighting
         id="feDiffuseLighting5204-3"
         surfaceScale="4"
         diffuseConstant="1"
         kernelUnitLength="1"
         result="result1"
         in="result0">
        <feDistantLight
           id="feDistantLight5206-3"
           azimuth="235"
           elevation="60" />
      </feDiffuseLighting>
      <feSpecularLighting
         id="feSpecularLighting5208-7"
         in="result0"
         surfaceScale="3"
         specularConstant="1"
         specularExponent="25"
         kernelUnitLength="1"
         result="result3">
        <feDistantLight
           id="feDistantLight5210-7"
           azimuth="235"
           elevation="55" />
      </feSpecularLighting>
      <feComposite
         in2="SourceGraphic"
         operator="arithmetic"
         k1="1"
         k2="0"
         k3="0"
         k4="0"
         in="result1"
         result="result2"
         id="feComposite5212-0" />
      <feComposite
         in2="result3"
         operator="arithmetic"
         k1="0"
         k2="1"
         k3="1"
         k4="0"
         in="result2"
         result="result4"
         id="feComposite5214-0" />
      <feComposite
         in2="SourceAlpha"
         operator="in"
         in="result4"
         result="fbSourceGraphic"
         id="feComposite5216-3" />
      <feDisplacementMap
         in2="result0"
         scale="7"
         xChannelSelector="R"
         yChannelSelector="G"
         id="feDisplacementMap5218-0" />
    </filter>
    <filter
       color-interpolation-filters="sRGB"
       id="filter4927-9-6">
      <feTurbulence
         id="feTurbulence4929-3-7"
         type="fractalNoise"
         numOctaves="7"
         baseFrequency="0.02"
         seed="55"
         result="result0" />
      <feDiffuseLighting
         id="feDiffuseLighting4931-6-2"
         surfaceScale="4"
         diffuseConstant="1"
         kernelUnitLength="1"
         result="result1"
         in="result0">
        <feDistantLight
           id="feDistantLight4933-1-4"
           azimuth="235"
           elevation="60" />
      </feDiffuseLighting>
      <feSpecularLighting
         id="feSpecularLighting4935-5-2"
         in="result0"
         surfaceScale="3"
         specularConstant="1"
         specularExponent="25"
         kernelUnitLength="1"
         result="result3">
        <feDistantLight
           id="feDistantLight4937-6-1"
           azimuth="235"
           elevation="55" />
      </feSpecularLighting>
      <feComposite
         in2="SourceGraphic"
         operator="arithmetic"
         k1="1"
         k2="0"
         k3="0"
         k4="0"
         in="result1"
         result="result2"
         id="feComposite4939-9-8" />
      <feComposite
         in2="result3"
         operator="arithmetic"
         k1="0"
         k2="1"
         k3="1"
         k4="0"
         in="result2"
         result="result4"
         id="feComposite4941-2-5" />
      <feComposite
         in2="SourceAlpha"
         operator="in"
         in="result4"
         result="fbSourceGraphic"
         id="feComposite4943-5-7" />
      <feDisplacementMap
         in2="result0"
         scale="7"
         xChannelSelector="R"
         yChannelSelector="G"
         id="feDisplacementMap4945-8-4" />
    </filter>
    <filter
       color-interpolation-filters="sRGB"
       id="filter4927-6">
      <feTurbulence
         id="feTurbulence4929-6"
         type="fractalNoise"
         numOctaves="7"
         baseFrequency="0.02"
         seed="55"
         result="result0" />
      <feDiffuseLighting
         id="feDiffuseLighting4931-5"
         surfaceScale="4"
         diffuseConstant="1"
         kernelUnitLength="1"
         result="result1"
         in="result0">
        <feDistantLight
           id="feDistantLight4933-7"
           azimuth="235"
           elevation="60" />
      </feDiffuseLighting>
      <feSpecularLighting
         id="feSpecularLighting4935-3"
         in="result0"
         surfaceScale="3"
         specularConstant="1"
         specularExponent="25"
         kernelUnitLength="1"
         result="result3">
        <feDistantLight
           id="feDistantLight4937-4"
           azimuth="235"
           elevation="55" />
      </feSpecularLighting>
      <feComposite
         in2="SourceGraphic"
         operator="arithmetic"
         k1="1"
         k2="0"
         k3="0"
         k4="0"
         in="result1"
         result="result2"
         id="feComposite4939-0" />
      <feComposite
         in2="result3"
         operator="arithmetic"
         k1="0"
         k2="1"
         k3="1"
         k4="0"
         in="result2"
         result="result4"
         id="feComposite4941-1" />
      <feComposite
         in2="SourceAlpha"
         operator="in"
         in="result4"
         result="fbSourceGraphic"
         id="feComposite4943-2" />
      <feDisplacementMap
         in2="result0"
         scale="7"
         xChannelSelector="R"
         yChannelSelector="G"
         id="feDisplacementMap4945-9" />
    </filter>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Lend-8"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.8,0,0,-0.8,-10,0)"
         id="path6288-7"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow2Lend-0"
       style="overflow:visible">
      <path
         d="M 8.7185878,4.0337352 -2.2072895,0.01601326 8.7185884,-4.0017078 c -1.7454984,2.3720609 -1.7354408,5.6174519 -6e-7,8.035443 z"
         transform="matrix(-1.1,0,0,-1.1,-1.1,0)"
         id="path6306-4"
         style="fill-rule:evenodd;stroke-width:0.625;stroke-linejoin:round" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mend-86"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path6294-46"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mend-9-0"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path6294-2-1"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <path
       d="m 251.37646,1280.199 c 24.33622,32.8983 59.3224,73.2045 94.39875,106.4195"
       transform="translate(0,702.36215)"
       id="path7235-14-9"
       style="fill:none;stroke:none" />
    <path
       d="m 417.193,1423.0345 c 24.95118,-15.18 84.14272,-66.644 103.23758,-94.0452"
       transform="translate(0,702.36215)"
       id="path7211-59-4"
       style="fill:none;stroke:none" />
    <path
       d="m 64.06095,1972.2176 c 35.96516,71.8882 38.83121,64.6814 33.5,121"
       id="path7200-0-3"
       style="fill:none;stroke:none" />
    <path
       d="m 127,1169.5 c 14.35038,12.4758 36.6232,25.0774 46.5,36.75"
       transform="translate(0,702.36215)"
       id="path7189-7-8"
       style="fill:none;stroke:none" />
    <path
       d="m 224.5064,1846.0895 c 2.26662,21.2383 -1.95841,40.8674 0.35355,61.3389"
       id="path7166-0-0"
       style="fill:none;stroke:none" />
    <path
       d="m 456.43743,1138.4241 c 28.4362,5.7057 49.00039,20.5567 51.97234,48.7903"
       transform="translate(0,702.36215)"
       id="path7161-7-2"
       style="fill:none;stroke:none" />
    <path
       d="m 275.77164,1927.2959 c 35.31392,7.8399 75.72672,12.6374 98.6414,42.4264"
       id="path7150-8-7"
       style="fill:none;stroke:none" />
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3381-3"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3383-4"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3377-7"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3379-4"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3373-1"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3375-2"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3369-9"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3371-9"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3365-8"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3367-0"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker3361-1"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path3363-73"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mend-08-9"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path6294-0-6"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <filter
       color-interpolation-filters="sRGB"
       id="filter4522-3">
      <feTurbulence
         id="feTurbulence4524-1"
         type="fractalNoise"
         numOctaves="7"
         baseFrequency="0.02"
         seed="55"
         result="result0" />
      <feDiffuseLighting
         id="feDiffuseLighting4526-7"
         surfaceScale="4"
         diffuseConstant="1"
         kernelUnitLength="1"
         result="result1"
         in="result0">
        <feDistantLight
           id="feDistantLight4528-5"
           azimuth="235"
           elevation="60" />
      </feDiffuseLighting>
      <feSpecularLighting
         id="feSpecularLighting4530-3"
         in="result0"
         surfaceScale="3"
         specularConstant="1"
         specularExponent="25"
         kernelUnitLength="1"
         result="result3">
        <feDistantLight
           id="feDistantLight4532-5"
           azimuth="235"
           elevation="55" />
      </feSpecularLighting>
      <feComposite
         in2="SourceGraphic"
         operator="arithmetic"
         k1="1"
         k2="0"
         k3="0"
         k4="0"
         in="result1"
         result="result2"
         id="feComposite4534-41" />
      <feComposite
         in2="result3"
         operator="arithmetic"
         k1="0"
         k2="1"
         k3="1"
         k4="0"
         in="result2"
         result="result4"
         id="feComposite4536-2" />
      <feComposite
         in2="SourceAlpha"
         operator="in"
         in="result4"
         result="fbSourceGraphic"
         id="feComposite4538-9" />
      <feDisplacementMap
         in2="result0"
         scale="7"
         xChannelSelector="R"
         yChannelSelector="G"
         id="feDisplacementMap4540-3" />
    </filter>
    <path
       d="m 251.37646,1280.199 c 24.33622,32.8983 59.3224,73.2045 94.39875,106.4195"
       transform="translate(0,702.36215)"
       id="path7235-1-91"
       style="fill:none;stroke:none" />
    <path
       d="m 417.193,1423.0345 c 24.95118,-15.18 84.14272,-66.644 103.23758,-94.0452"
       transform="translate(0,702.36215)"
       id="path7211-5-6"
       style="fill:none;stroke:none" />
    <path
       d="m 64.06095,1972.2176 c 35.96516,71.8882 38.83121,64.6814 33.5,121"
       id="path7200-5-7"
       style="fill:none;stroke:none" />
    <path
       d="m 127,1169.5 c 14.35038,12.4758 36.6232,25.0774 46.5,36.75"
       transform="translate(0,702.36215)"
       id="path7189-6-53"
       style="fill:none;stroke:none" />
    <path
       d="m 224.5064,1846.0895 c 2.26662,21.2383 -1.95841,40.8674 0.35355,61.3389"
       id="path7166-2-9"
       style="fill:none;stroke:none" />
    <path
       d="m 456.43743,1138.4241 c 28.4362,5.7057 49.00039,20.5567 51.97234,48.7903"
       transform="translate(0,702.36215)"
       id="path7161-2-2"
       style="fill:none;stroke:none" />
    <path
       d="m 275.77164,1927.2959 c 35.31392,7.8399 75.72672,12.6374 98.6414,42.4264"
       id="path7150-9-8"
       style="fill:none;stroke:none" />
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4074-1"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4076-2"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4070-24"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4072-1"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4066-5"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4068-5"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4062-7"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4064-6"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4058-7"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4060-5"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="marker4054-5"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path4056-0"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mend-0-78"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path6294-4-4"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <filter
       color-interpolation-filters="sRGB"
       id="filter5200-8">
      <feTurbulence
         id="feTurbulence5202-9"
         type="fractalNoise"
         numOctaves="7"
         baseFrequency="0.02"
         seed="55"
         result="result0" />
      <feDiffuseLighting
         id="feDiffuseLighting5204-6"
         surfaceScale="4"
         diffuseConstant="1"
         kernelUnitLength="1"
         result="result1"
         in="result0">
        <feDistantLight
           id="feDistantLight5206-2"
           azimuth="235"
           elevation="60" />
      </feDiffuseLighting>
      <feSpecularLighting
         id="feSpecularLighting5208-5"
         in="result0"
         surfaceScale="3"
         specularConstant="1"
         specularExponent="25"
         kernelUnitLength="1"
         result="result3">
        <feDistantLight
           id="feDistantLight5210-0"
           azimuth="235"
           elevation="55" />
      </feSpecularLighting>
      <feComposite
         in2="SourceGraphic"
         operator="arithmetic"
         k1="1"
         k2="0"
         k3="0"
         k4="0"
         in="result1"
         result="result2"
         id="feComposite5212-4" />
      <feComposite
         in2="result3"
         operator="arithmetic"
         k1="0"
         k2="1"
         k3="1"
         k4="0"
         in="result2"
         result="result4"
         id="feComposite5214-2" />
      <feComposite
         in2="SourceAlpha"
         operator="in"
         in="result4"
         result="fbSourceGraphic"
         id="feComposite5216-0" />
      <feDisplacementMap
         in2="result0"
         scale="7"
         xChannelSelector="R"
         yChannelSelector="G"
         id="feDisplacementMap5218-8" />
    </filter>
    <filter
       color-interpolation-filters="sRGB"
       id="filter4927-9-7">
      <feTurbulence
         id="feTurbulence4929-3-4"
         type="fractalNoise"
         numOctaves="7"
         baseFrequency="0.02"
         seed="55"
         result="result0" />
      <feDiffuseLighting
         id="feDiffuseLighting4931-6-9"
         surfaceScale="4"
         diffuseConstant="1"
         kernelUnitLength="1"
         result="result1"
         in="result0">
        <feDistantLight
           id="feDistantLight4933-1-49"
           azimuth="235"
           elevation="60" />
      </feDiffuseLighting>
      <feSpecularLighting
         id="feSpecularLighting4935-5-6"
         in="result0"
         surfaceScale="3"
         specularConstant="1"
         specularExponent="25"
         kernelUnitLength="1"
         result="result3">
        <feDistantLight
           id="feDistantLight4937-6-7"
           azimuth="235"
           elevation="55" />
      </feSpecularLighting>
      <feComposite
         in2="SourceGraphic"
         operator="arithmetic"
         k1="1"
         k2="0"
         k3="0"
         k4="0"
         in="result1"
         result="result2"
         id="feComposite4939-9-9" />
      <feComposite
         in2="result3"
         operator="arithmetic"
         k1="0"
         k2="1"
         k3="1"
         k4="0"
         in="result2"
         result="result4"
         id="feComposite4941-2-6" />
      <feComposite
         in2="SourceAlpha"
         operator="in"
         in="result4"
         result="fbSourceGraphic"
         id="feComposite4943-5-5" />
      <feDisplacementMap
         in2="result0"
         scale="7"
         xChannelSelector="R"
         yChannelSelector="G"
         id="feDisplacementMap4945-8-8" />
    </filter>
    <filter
       color-interpolation-filters="sRGB"
       id="filter4927-7">
      <feTurbulence
         id="feTurbulence4929-8"
         type="fractalNoise"
         numOctaves="7"
         baseFrequency="0.02"
         seed="55"
         result="result0" />
      <feDiffuseLighting
         id="feDiffuseLighting4931-3"
         surfaceScale="4"
         diffuseConstant="1"
         kernelUnitLength="1"
         result="result1"
         in="result0">
        <feDistantLight
           id="feDistantLight4933-3"
           azimuth="235"
           elevation="60" />
      </feDiffuseLighting>
      <feSpecularLighting
         id="feSpecularLighting4935-54"
         in="result0"
         surfaceScale="3"
         specularConstant="1"
         specularExponent="25"
         kernelUnitLength="1"
         result="result3">
        <feDistantLight
           id="feDistantLight4937-60"
           azimuth="235"
           elevation="55" />
      </feSpecularLighting>
      <feComposite
         in2="SourceGraphic"
         operator="arithmetic"
         k1="1"
         k2="0"
         k3="0"
         k4="0"
         in="result1"
         result="result2"
         id="feComposite4939-1" />
      <feComposite
         in2="result3"
         operator="arithmetic"
         k1="0"
         k2="1"
         k3="1"
         k4="0"
         in="result2"
         result="result4"
         id="feComposite4941-0" />
      <feComposite
         in2="SourceAlpha"
         operator="in"
         in="result4"
         result="fbSourceGraphic"
         id="feComposite4943-7" />
      <feDisplacementMap
         in2="result0"
         scale="7"
         xChannelSelector="R"
         yChannelSelector="G"
         id="feDisplacementMap4945-88" />
    </filter>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Lend-4"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.8,0,0,-0.8,-10,0)"
         id="path6288-0"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow2Lend-4"
       style="overflow:visible">
      <path
         d="M 8.7185878,4.0337352 -2.2072895,0.01601326 8.7185884,-4.0017078 c -1.7454984,2.3720609 -1.7354408,5.6174519 -6e-7,8.035443 z"
         transform="matrix(-1.1,0,0,-1.1,-1.1,0)"
         id="path6306-3"
         style="fill-rule:evenodd;stroke-width:0.625;stroke-linejoin:round" />
    </marker>
    <marker
       refX="0"
       refY="0"
       orient="auto"
       id="Arrow1Mend-94"
       style="overflow:visible">
      <path
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         id="path6294-5"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt" />
    </marker>
  </defs>
  <metadata
     id="metadata7">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     transform="translate(-6.9777259,-730.90928)"
     id="layer1">
    <text
       x="253.8875"
       y="852.91364"
       id="text6033-5-5"
       xml:space="preserve"
       style="font-size:21.9134655px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:DejaVu Sans;-inkscape-font-specification:DejaVu Sans"><tspan
         x="253.8875"
         y="852.91364"
         id="tspan6035-2-5"
         style="fill:#ffffff;fill-opacity:1" /></text>
    <text
       x="233.38641"
       y="780.74622"
       id="text6170"
       xml:space="preserve"
       style="font-size:26.27815628px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"><tspan
         x="233.38641"
         y="780.74622"
         id="tspan6172" /></text>
    <text
       x="222.85715"
       y="235.71429"
       transform="translate(0,552.36218)"
       id="text3892"
       xml:space="preserve"
       style="font-size:16px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"><tspan
         x="222.85715"
         y="235.71429"
         id="tspan3894" /></text>
    <g
       transform="translate(20.344079,-4.336477)"
       id="g7543">
      <text
         x="11.377486"
         y="790.21631"
         id="text6088-6-3-7-6"
         xml:space="preserve"
         style="font-size:26.63763046px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:DejaVu Sans;-inkscape-font-specification:DejaVu Sans"><tspan
           x="11.377486"
           y="790.21631"
           id="tspan6090-6-9-6-9"
           style="fill:#ffffff;fill-opacity:1">Queue</tspan></text>
      <g
         transform="translate(1.0714276,4.1725878)"
         id="g7532">
        <g
           transform="matrix(1.078947,0,0,1.078947,-97.298742,-85.762927)"
           id="g5342-5-7-6-8-8-9"
           style="fill:#ffffff;fill-opacity:1">
          <path
             d="m 131.09203,838.77085 29.8198,0 0,29.81981 -7.50365,10 -32.31615,0 0,-32.31225 z m -10,8 31.8198,0 0,31.81981 -31.8198,0 z"
             id="rect5234-6-7-9-3-3-8-1"
             style="color:#000000;fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dashoffset:0;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" />
          <path
             d="m 152.77926,144.62967 8.06544,-8.06543"
             transform="translate(0,702.36215)"
             id="path5340-64-9-9-5-6-8"
             style="fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" />
        </g>
        <g
           transform="matrix(1.078947,0,0,1.078947,-99.441597,30.308466)"
           id="g5342-5-7-6-8-8-9-2"
           style="fill:#ffffff;fill-opacity:1">
          <path
             d="m 131.09203,838.77085 29.8198,0 0,29.81981 -7.50365,10 -32.31615,0 0,-32.31225 z m -10,8 31.8198,0 0,31.81981 -31.8198,0 z"
             id="rect5234-6-7-9-3-3-8-1-9"
             style="color:#000000;fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dashoffset:0;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" />
          <path
             d="m 152.77926,144.62967 8.06544,-8.06543"
             transform="translate(0,702.36215)"
             id="path5340-64-9-9-5-6-8-1"
             style="fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" />
        </g>
        <g
           transform="matrix(1.078947,0,0,1.078947,-98.727304,-27.727229)"
           id="g5342-5-7-6-8-8-9-0"
           style="fill:#ffffff;fill-opacity:1">
          <path
             d="m 131.09203,838.77085 29.8198,0 0,29.81981 -7.50365,10 -32.31615,0 0,-32.31225 z m -10,8 31.8198,0 0,31.81981 -31.8198,0 z"
             id="rect5234-6-7-9-3-3-8-1-91"
             style="color:#000000;fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dashoffset:0;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" />
          <path
             d="m 152.77926,144.62967 8.06544,-8.06543"
             transform="translate(0,702.36215)"
             id="path5340-64-9-9-5-6-8-9"
             style="fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" />
        </g>
      </g>
      <rect
         width="78.571426"
         height="190"
         x="15.549154"
         y="807.91638"
         id="rect7530"
         style="color:#000000;fill:none;stroke:#ffffff;stroke-width:3.29999995;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:3.29999995, 9.89999986;stroke-dashoffset:0;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" />
    </g>
    <g
       transform="matrix(1.194828,0,0,1.194828,-248.26007,-45.283546)"
       id="g6041-5-3-7-2">
      <path
         d="m 645.62633,745.44661 10e-4,60.58372 c -5.1e-4,6.89428 -17.7925,12.50586 -39.74004,12.50586 -21.9475,0 -39.73953,-5.61158 -39.73412,-12.4848 l -0.002,-60.61178 m 79.4768,-0.059 c 0,6.92222 -17.79088,12.5338 -39.73838,12.5338 -21.94754,0 -39.73955,-5.61158 -39.73955,-12.5338 0,-6.92222 17.79092,-12.5338 39.73845,-12.5338 21.9475,0 39.73948,5.61158 39.73948,12.5338 z"
         id="path5057-3-3-8-2-86-3-5"
         style="color:#000000;fill:none;stroke:#ffffff;stroke-width:3.27672219;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" />
      <text
         x="525.1167"
         y="850.40265"
         id="text5485-7-7-0-8"
         xml:space="preserve"
         style="font-size:29.11111069px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"><tspan
           x="525.1167"
           y="850.40265"
           id="tspan5487-8-2-8-6"
           style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;fill:#ffffff;fill-opacity:1;font-family:DejaVu Sans;-inkscape-font-specification:DejaVu Sans">Azure Table</tspan></text>
    </g>
    <text
       x="865.59979"
       y="-18.467581"
       transform="matrix(0,1,-1,0,0,0)"
       id="text8503"
       xml:space="preserve"
       style="font-size:12.93062592px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"><tspan
         x="865.59979"
         y="-18.467581"
         id="tspan8505">REST API</tspan></text>
    <text
       x="175.6732"
       y="863.01227"
       id="text8507"
       xml:space="preserve"
       style="font-size:16px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"><tspan
         x="175.6732"
         y="863.01227"
         id="tspan8509">Load/Save state</tspan></text>
    <g
       id="g9448">
      <path
         d="m 202.94648,827.19053 0,2.40625 4.78125,-0.0312 0,-2.40625 z m -4.84375,0.0312 -2.375,0.0312 0.0312,2.40625 2.375,-0.0625 2.40625,0 0,-2.40625 z m 12.03125,2.375 4.78125,0.0312 0.0312,-2.40625 -4.8125,-0.0312 z m 7.1875,0.0625 1.28125,0 0.0312,0 3.46875,0.0937 0.0625,-2.40625 -3.5,-0.0625 -1.3125,-0.0312 z m -28.8125,-2.28125 0.0625,2.40625 4.78125,-0.0937 -0.0312,-2.40625 z m 36,2.4375 4.25,0.0937 0.0312,0 0.5,0 0.0937,-2.375 -0.53125,-0.0312 -0.0312,0 -4.25,-0.0937 z m -43.21875,-2.21875 0.0937,2.375 4.78125,-0.125 -0.0625,-2.40625 z m 50.40625,2.40625 4.78125,0.1875 0.0937,-2.40625 -4.78125,-0.15625 z m -54.40625,-2.3125 0,0.0312 -3.1875,0.125 0.0937,2.40625 3.1875,-0.15625 1.59375,-0.0312 -0.0625,-2.40625 z m 61.5625,2.59375 4.8125,0.21875 0.125,-2.375 -4.8125,-0.25 z m -71.9375,-2.125 0.0937,2.40625 4.78125,-0.21875 -0.0937,-2.40625 z m 79.15625,2.46875 2.8125,0.15625 1.9375,0.125 0.15625,-2.40625 -1.96875,-0.125 -2.84375,-0.15625 z m -86.375,-2.0625 0.125,2.40625 4.8125,-0.28125 -0.15625,-2.40625 z m 93.53125,2.46875 4.78125,0.3125 0.15625,-2.40625 -4.78125,-0.28125 z m -97,-2.25 -0.0312,0 -3.6875,0.25 0.15625,2.40625 3.6875,-0.28125 1.09375,-0.0625 -0.15625,-2.375 z m 104.15625,2.75 4.8125,0.34375 0.15625,-2.375 -4.78125,-0.375 z m -114.8125,-2 -0.0312,0 -0.25,0 0.21875,2.40625 0.21875,-0.0312 0.0312,0 4.5,-0.3125 -0.15625,-2.40625 z m 122,2.53125 1.15625,0.0937 0.0312,0 3.59375,0.3125 0.21875,-2.375 -3.625,-0.34375 -1.1875,-0.0937 z m -129.4375,-1.90625 0.1875,2.375 4.78125,-0.40625 -0.1875,-2.375 z m 136.59375,2.53125 3.875,0.34375 0.90625,0.0937 0.25,-2.375 -0.9375,-0.0937 -3.875,-0.34375 z m -139.875,-2.25 -3.90625,0.375 0.21875,2.375 3.90625,-0.375 0.875,-0.0625 -0.21875,-2.40625 z m 147.03125,2.9375 4.78125,0.5 0.25,-2.40625 -4.78125,-0.46875 z m -157.8125,-1.90625 -0.0312,0 -0.28125,0.0312 0.25,2.40625 0.28125,-0.0312 0.0312,0 4.46875,-0.4375 -0.25,-2.40625 z m 164.96875,2.65625 4.75,0.53125 0.28125,-2.375 -4.75,-0.5625 z m -172.4375,-1.8125 0.25,2.375 4.78125,-0.53125 -0.25,-2.375 z m -3.375,0.375 -0.0312,0 -3.75,0.46875 0.28125,2.375 3.75,-0.46875 0.0312,0 0.96875,-0.0937 -0.25,-2.40625 z m 182.96875,2.25 1.90625,0.21875 0.0312,0 2.8125,0.375 0.28125,-2.375 -2.8125,-0.375 -0.0312,0 -1.9375,-0.21875 z m -193.90625,-0.90625 0.28125,2.375 4.78125,-0.5625 -0.3125,-2.40625 z m 201.03125,1.8125 4.46875,0.5625 0.28125,0.0625 0.3125,-2.375 -0.25,-0.0625 -0.0312,0 -4.46875,-0.5625 z m 7.125,0.9375 4.75,0.6875 0.3125,-2.375 -4.75,-0.6875 z m 7.09375,1.03125 4.75,0.71875 0.375,-2.34375 -4.75,-0.75 z m 7.125,1.09375 2.3125,0.375 2.40625,0.40625 0.40625,-2.375 -2.4375,-0.40625 -2.3125,-0.375 z m 7.09375,1.15625 4.71875,0.8125 0.40625,-2.375 -4.71875,-0.78125 z m 7.0625,1.21875 4.71875,0.875 0.4375,-2.375 -4.71875,-0.84375 z m 7.09375,1.28125 0.0312,0.0312 4.65625,0.90625 0.46875,-2.375 -4.6875,-0.90625 -0.0312,0 z m 7.0625,1.375 2.34375,0.46875 0.0312,0 2.3125,0.46875 0.46875,-2.34375 -2.3125,-0.46875 -2.40625,-0.46875 z m 7.03125,1.4375 4.6875,0.96875 0.25,-1.1875 0.28125,-1.15625 -0.0312,0 -4.6875,-0.96875 z m 7.03125,1.46875 4.6875,1.03125 0.53125,-2.34375 -4.6875,-1.03125 z m 7.03125,1.53125 4.65625,1.09375 0.5625,-2.34375 -4.6875,-1.0625 z m 7,1.65625 2.1875,0.5 2.46875,0.59375 0.5625,-2.34375 -2.46875,-0.59375 -0.0312,0 -2.15625,-0.5 z m 7,1.65625 4.375,1.09375 0.0312,0 0.25,0.0625 0.59375,-2.34375 -0.28125,-0.0625 -4.40625,-1.0625 z m 6.96875,1.75 4.65625,1.1875 0.59375,-2.3125 -4.65625,-1.21875 z m 6.96875,1.78125 4.625,1.25 0.625,-2.3125 -4.625,-1.25 z m 6.9375,1.875 1.78125,0.46875 2.84375,0.8125 0.625,-2.3125 -2.8125,-0.8125 -0.0312,0 -1.78125,-0.46875 z m 6.9375,1.9375 3.90625,1.09375 0.65625,-2.3125 -3.9375,-1.09375 z"
         id="path8530"
         style="font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-indent:0;text-align:start;text-decoration:none;line-height:normal;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;text-anchor:start;baseline-shift:baseline;color:#000000;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:2.4000001;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate;font-family:Sans;-inkscape-font-specification:Sans" />
      <path
         d="m 410.90328,856.32105 -5.9387,3.28812 17.47224,0.0251 -14.82167,-9.25192 3.28813,5.93871 z"
         id="path9454"
         style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.96000004pt;stroke-opacity:1" />
    </g>
    <g
       id="g9462">
      <path
         d="m 294.13398,878.31553 0.0312,2.375 2.59375,0 2.1875,0 0,-2.40625 -2.1875,0 z m -7.125,0.0625 -0.0312,0 -0.0625,0 0.0625,2.375 0.0312,0 0.0312,0 4.71875,-0.0312 -0.0312,-2.40625 z m 14.34375,2.3125 4.78125,0.0312 0.0312,-2.40625 -4.8125,0 z m 7.1875,0.0625 4.78125,0.0937 0.0312,-2.40625 -4.78125,-0.0937 z m -28.8125,-2.25 0.0625,2.40625 4.78125,-0.0937 -0.0625,-2.40625 z m 36,2.375 0.4375,0.0312 0.0312,0 4.3125,0.125 0.0625,-2.40625 -4.3125,-0.125 -0.0312,0 -0.46875,-0.0312 z m -43.21875,-2.15625 0.0937,2.40625 4.6875,-0.15625 0.0937,0 -0.0625,-2.40625 -0.0937,0 z m 50.40625,2.375 2.96875,0.0937 1.8125,0.0625 0.0937,-2.375 -1.8125,-0.0937 -0.0312,0 -2.96875,-0.0937 z m -55.46875,-2.1875 -2.15625,0.0937 0.125,2.40625 2.125,-0.0937 0.0312,0 2.625,-0.0937 -0.0937,-2.40625 z m 62.625,2.46875 4.8125,0.1875 0.0937,-2.375 -4.78125,-0.21875 z m -71.96875,-2.03125 0.125,2.40625 4.78125,-0.25 -0.0937,-2.375 z m 79.15625,2.34375 4.78125,0.28125 0.15625,-2.40625 -4.8125,-0.25 z m -86.34375,-1.9375 0.125,2.40625 4.8125,-0.28125 -0.15625,-2.40625 z m 93.53125,2.34375 0.78125,0.0625 4,0.28125 0.15625,-2.40625 -4,-0.28125 -0.8125,-0.0312 z m -96.53125,-2.15625 -0.0312,0 -4.1875,0.3125 0.1875,2.375 4.15625,-0.28125 0.0312,0 0.59375,-0.0312 -0.15625,-2.40625 z m 103.71875,2.65625 3.25,0.21875 1.5,0.125 0.21875,-2.375 -1.53125,-0.125 -0.0312,0 -3.25,-0.25 z m -113.53125,-1.9375 -1.59375,0.125 0.21875,2.40625 1.5625,-0.15625 0.0312,0 3.15625,-0.21875 -0.15625,-2.40625 z m 120.6875,2.46875 4.78125,0.40625 0.1875,-2.40625 -4.78125,-0.375 z m -129.4375,-1.71875 0.1875,2.375 4.78125,-0.40625 -0.1875,-2.375 z m 136.59375,2.34375 4.78125,0.4375 0.21875,-2.375 -4.78125,-0.46875 z m -143.78125,-1.65625 0.21875,2.375 4.78125,-0.46875 -0.21875,-2.375 z m 150.9375,2.34375 1,0.0937 0.0312,0 3.71875,0.40625 0.28125,-2.375 -3.75,-0.40625 0,-0.0312 -0.0312,0 -1.03125,-0.0937 z m -154.5625,-2 -3.5625,0.40625 0.28125,2.375 3.53125,-0.375 1.21875,-0.125 -0.25,-2.40625 z m 161.71875,2.75 3.46875,0.375 1.28125,0.15625 0.28125,-2.375 -1.28125,-0.15625 -0.0312,0 -3.46875,-0.375 z m -171.5,-1.65625 -0.9375,0.125 0.28125,2.375 0.9375,-0.125 3.8125,-0.40625 -0.25,-2.40625 z m 178.625,2.5 4.78125,0.5625 0.28125,-2.375 -4.78125,-0.59375 z m -186.71875,-1.5 0.28125,2.375 4.78125,-0.59375 -0.3125,-2.375 z m 193.84375,2.375 4.78125,0.65625 0.3125,-2.40625 -4.75,-0.625 z m -201,-1.40625 0.34375,2.375 4.75,-0.65625 -0.34375,-2.375 z m 208.15625,2.375 1.15625,0.15625 0.0312,0 3.53125,0.53125 0.34375,-2.375 -3.53125,-0.53125 -0.0312,0 -1.1875,-0.15625 z m -212.46875,-1.8125 0,0.0312 -2.8125,0.40625 0.34375,2.375 2.8125,-0.4375 0,0.0312 1.9375,-0.28125 -0.34375,-2.375 z m 219.5625,2.84375 3.625,0.53125 0.34375,-2.375 -3.625,-0.53125 z m -229.3125,-1.375 -0.0312,0 -0.1875,0.0312 0.40625,2.375 0.15625,-0.0312 4.5625,-0.6875 -0.34375,-2.375 z m -7.3125,1.1875 0.375,2.375 4.75,-0.78125 -0.40625,-2.34375 z m -7.125,1.21875 0.4375,2.375 4.625,-0.8125 0.0625,-0.0312 -0.375,-2.34375 -0.0937,0 z m -5.09375,0.90625 -2,0.375 0.4375,2.34375 1.96875,-0.375 0,0.0312 2.75,-0.5 -0.40625,-2.34375 z m -9.0625,1.71875 0.4375,2.34375 4.71875,-0.875 -0.4375,-2.375 z m -7.09375,1.40625 0.46875,2.34375 4.71875,-0.9375 -0.46875,-2.34375 z m -3.3125,0.6875 -0.0312,0 -3.71875,0.78125 0.5,2.34375 3.71875,-0.78125 0.96875,-0.1875 -0.46875,-2.375 z m -9.71875,2.09375 -0.0312,0 -1.03125,0.21875 0.53125,2.34375 1.03125,-0.21875 3.625,-0.78125 -0.5,-2.34375 z m -8.09375,1.84375 0.53125,2.34375 4.6875,-1.09375 -0.53125,-2.34375 z m -7.03125,1.65625 0.5625,2.34375 4.6875,-1.125 -0.5625,-2.34375 z m -4.28125,1.0625 -0.0312,0 -2.6875,0.6875 0.59375,2.3125 2.6875,-0.6875 1.96875,-0.46875 -0.5625,-2.34375 z m -9.6875,2.46875 0.59375,2.3125 4.65625,-1.1875 -0.59375,-2.3125 z"
         style="font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-indent:0;text-align:start;text-decoration:none;line-height:normal;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;text-anchor:start;baseline-shift:baseline;color:#000000;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:2.4000001;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate;font-family:Sans;-inkscape-font-specification:Sans" />
      <path
         d="m 403.06802,886.79067 -5.48066,4.00529 17.3381,-2.16108 -15.86273,-7.32488 4.00529,5.48067 z"
         id="path9466"
         style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.96000004pt;stroke-opacity:1" />
    </g>
    <g
       id="g9456">
      <path
         d="m 340.22773,912.72178 0.0312,2.40625 1.9375,-0.0312 2.84375,0 0,-2.375 -2.84375,-0.0312 -0.0312,0 z m -7.1875,0.0312 0,2.40625 4.8125,-0.0312 -0.0312,-2.40625 z m 14.40625,2.375 4.78125,0 0.0312,-2.40625 -4.8125,0 z m 7.1875,0 4.8125,0.0312 0,-2.40625 -4.8125,-0.0312 z m 7.1875,0.0312 4.8125,0.0312 0.0312,-2.375 -4.8125,-0.0625 z m -36,-2.3125 0.0312,2.40625 4.8125,-0.0625 -0.0312,-2.40625 z m 43.21875,2.375 4.78125,0.0312 0.0312,-2.375 -4.8125,-0.0625 z m -50.40625,-2.25 0.0312,2.40625 4.8125,-0.0937 -0.0625,-2.40625 z m 57.59375,2.3125 3.125,0.0312 1.6875,0.0312 0,-2.40625 -1.65625,-0.0312 -3.125,-0.0312 z m 7.1875,0.0937 4.8125,0.0312 0.0312,-2.375 -4.8125,-0.0625 z m -68.59375,-2.3125 -0.0312,0 -3.375,0.0937 0.0625,2.40625 3.375,-0.125 0.0312,0 1.375,0 -0.0312,-2.40625 z m 75.8125,2.375 4.78125,0.0625 0.0312,-2.40625 -4.78125,-0.0625 z m 7.1875,0.0937 0.65625,0 4.15625,0.0312 0.0312,-2.375 -4.15625,-0.0625 -0.65625,0 z m 7.21875,0.0625 4.78125,0.0625 0.0312,-2.40625 -4.8125,-0.0625 z m -99.3125,-2.28125 -1.53125,0.0625 0.0937,2.40625 1.5,-0.0625 0.0312,0 3.25,-0.0937 -0.0625,-2.40625 z m 106.5,2.34375 4.8125,0.0625 0,-2.40625 -4.78125,-0.0312 z m -115.21875,-2 0.0937,2.40625 4.78125,-0.1875 -0.0937,-2.40625 z m -7.21875,0.375 0.125,2.375 4.8125,-0.21875 -0.125,-2.40625 z m -7.1875,0.40625 0.15625,2.40625 4.78125,-0.3125 -0.15625,-2.40625 z m -4.21875,0.25 -0.0312,0 -2.9375,0.25 0.15625,2.375 2.96875,-0.21875 1.8125,-0.125 -0.15625,-2.375 z m -9.1875,0.6875 -1,0.0937 0.21875,2.40625 0.96875,-0.0937 3.8125,-0.28125 -0.1875,-2.40625 z m -8.15625,0.75 0.21875,2.375 4.78125,-0.40625 -0.21875,-2.40625 z m -7.1875,0.71875 0.25,2.375 4.78125,-0.5 -0.25,-2.375 z m -3.1875,0.3125 -3.96875,0.46875 0.28125,2.40625 3.9375,-0.46875 0.0312,0 0.78125,-0.0937 -0.25,-2.375 z m -9.375,1.125 -0.0312,0 -1.75,0.21875 0.3125,2.40625 1.75,-0.25 0.0312,0 2.96875,-0.34375 -0.28125,-2.40625 z m -8.90625,1.1875 0.3125,2.375 4.75,-0.625 -0.3125,-2.375 z m -7.15625,1.0625 0.375,2.375 4.75,-0.71875 -0.375,-2.375 z m -2.96875,0.4375 -0.0312,0 -4.125,0.6875 0.40625,2.375 4.09375,-0.6875 0.0312,0 0.59375,-0.0937 -0.375,-2.375 z m -9.6875,1.625 -0.0312,0 -1.53125,0.28125 0.40625,2.375 1.53125,-0.28125 0.0312,0 3.15625,-0.53125 -0.375,-2.375 z m -8.65625,1.59375 0.4375,2.375 4.71875,-0.875 -0.4375,-2.375 z m -7.09375,1.40625 0.46875,2.34375 4.71875,-0.9375 -0.46875,-2.34375 z m -4.03125,0.8125 -0.0312,0 -3,0.65625 0.53125,2.34375 2.96875,-0.65625 0.0312,0 1.65625,-0.34375 -0.46875,-2.34375 z m -10.0625,2.1875 0.53125,2.375 4.6875,-1.03125 -0.53125,-2.34375 z m -7.03125,1.6875 0.5625,2.3125 4.65625,-1.09375 -0.53125,-2.34375 z m -3.28125,0.78125 -0.0312,0 -3.6875,0.9375 0.59375,2.3125 3.65625,-0.9375 0.0312,0 0.9375,-0.21875 -0.53125,-2.34375 z m -10.46875,2.65625 -0.25,0.0625 0.625,2.3125 0.21875,-0.0625 0.0312,0 4.375,-1.125 -0.59375,-2.3125 z m -7.1875,1.9375 0.625,2.34375 4.625,-1.28125 -0.625,-2.3125 z m -3.4375,0.9375 -0.0312,0.0312 -3.5,1 0.6875,2.3125 3.46875,-1.03125 0,0.0312 1.125,-0.3125 -0.625,-2.3125 z m -10.4375,3.03125 0.65625,2.3125 4.625,-1.34375 -0.65625,-2.3125 z m -6.90625,2.125 0.71875,2.28125 4.59375,-1.40625 -0.71875,-2.28125 z m -4.5625,1.40625 -0.0312,0 -2.28125,0.75 0.71875,2.28125 2.28125,-0.75 0.0312,0 2.25,-0.6875 -0.6875,-2.3125 z m -9.15625,2.96875 0.71875,2.28125 4.5625,-1.46875 -0.71875,-2.28125 z m -6.84375,2.3125 0.78125,2.28125 4.53125,-1.5625 -0.78125,-2.28125 z m -6.8125,2.34375 0.78125,2.25 4.53125,-1.5625 -0.78125,-2.25 z"
         style="font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-indent:0;text-align:start;text-decoration:none;line-height:normal;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;text-anchor:start;baseline-shift:baseline;color:#000000;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:2.4000001;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate;font-family:Sans;-inkscape-font-specification:Sans" />
      <path
         d="m 408.5101,914.45651 -4.83661,4.76311 16.83626,-4.67123 -16.76276,-4.92849 4.76311,4.83661 z"
         id="path9460"
         style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.96000004pt;stroke-opacity:1" />
    </g>
  </g>
</svg>
</center>