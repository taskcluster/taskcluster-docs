### Kleene &#42;-Scopes

 * Scopes ending with `*` are special
 * Scope `'create-task:*'` allows any `workerType`
 * The scope `'*'` rules them all

<br>
<center>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   width="720.5"
   height="293.72736"
   id="svg2"
   version="1.1"
   inkscape:version="0.48.3.1 r9886"
   sodipodi:docname="scopes-client-kleene.svg">
  <defs
     id="defs4">
    <marker
       inkscape:stockid="StopM"
       orient="auto"
       refY="0"
       refX="0"
       id="StopM"
       style="overflow:visible">
      <path
         id="path5365"
         d="M 0,5.65 0,-5.65"
         style="fill:none;stroke:#000000;stroke-width:1pt"
         transform="scale(0.4,0.4)"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="DistanceEnd"
       refX="0"
       refY="0"
       orient="auto"
       inkscape:stockid="DistanceEnd">
      <g
         id="g2301">
        <path
           style="fill:none;stroke:#ffffff;stroke-width:1.14999998;stroke-linecap:square"
           d="M 0,0 -2,0"
           id="path2316"
           inkscape:connector-curvature="0" />
        <path
           style="fill:#000000;fill-rule:evenodd;stroke:none"
           d="M 0,0 -13,4 -9,0 -13,-4 0,0 z"
           id="path2312"
           inkscape:connector-curvature="0" />
        <path
           style="fill:none;stroke:#000000;stroke-width:1;stroke-linecap:square"
           d="M 0,-4 0,40"
           id="path2314"
           inkscape:connector-curvature="0" />
      </g>
    </marker>
    <marker
       inkscape:stockid="Arrow1Mstart"
       orient="auto"
       refY="0"
       refX="0"
       id="Arrow1Mstart"
       style="overflow:visible">
      <path
         id="path5199"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         transform="matrix(0.4,0,0,0.4,4,0)"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       inkscape:stockid="Arrow1Lend"
       orient="auto"
       refY="0"
       refX="0"
       id="marker5671"
       style="overflow:visible">
      <path
         id="path5196"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         transform="matrix(-0.8,0,0,-0.8,-10,0)"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       inkscape:stockid="Arrow1Lstart"
       orient="auto"
       refY="0"
       refX="0"
       id="Arrow1Lstart"
       style="overflow:visible">
      <path
         id="path5193"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         transform="matrix(0.8,0,0,0.8,10,0)"
         inkscape:connector-curvature="0" />
    </marker>
    <inkscape:perspective
       id="perspective3161"
       inkscape:persp3d-origin="300 : 166.66667 : 1"
       inkscape:vp_z="600 : 250 : 1"
       inkscape:vp_y="0 : 1000 : 0"
       inkscape:vp_x="0 : 250 : 1"
       sodipodi:type="inkscape:persp3d" />
    <marker
       style="overflow:visible"
       id="Arrow1Mend"
       refX="0"
       refY="0"
       orient="auto"
       inkscape:stockid="Arrow1Mend">
      <path
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         id="path4048"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow1Mend-9"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6294-2"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <path
       style="fill:none;stroke:none"
       id="path7235-14"
       transform="translate(0,702.36215)"
       d="m 251.37646,1280.199 c 24.33622,32.8983 59.3224,73.2045 94.39875,106.4195"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7211-59"
       transform="translate(0,702.36215)"
       d="m 417.193,1423.0345 c 24.95118,-15.18 84.14272,-66.644 103.23758,-94.0452"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7200-0"
       d="m 64.06095,1972.2176 c 35.96516,71.8882 38.83121,64.6814 33.5,121"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7189-7"
       transform="translate(0,702.36215)"
       d="m 127,1169.5 c 14.35038,12.4758 36.6232,25.0774 46.5,36.75"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7166-0"
       d="m 224.5064,1846.0895 c 2.26662,21.2383 -1.95841,40.8674 0.35355,61.3389"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7161-7"
       transform="translate(0,702.36215)"
       d="m 456.43743,1138.4241 c 28.4362,5.7057 49.00039,20.5567 51.97234,48.7903"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7150-8"
       d="m 275.77164,1927.2959 c 35.31392,7.8399 75.72672,12.6374 98.6414,42.4264"
       inkscape:connector-curvature="0" />
    <marker
       style="overflow:visible"
       id="marker3381"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3383"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3377"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3379"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3373"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3375"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3369"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3371"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3365"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3367"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3361"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3363"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow1Mend-08"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6294-0"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <filter
       id="filter4522"
       color-interpolation-filters="sRGB">
      <feTurbulence
         result="result0"
         seed="55"
         baseFrequency="0.02"
         numOctaves="7"
         type="fractalNoise"
         id="feTurbulence4524" />
      <feDiffuseLighting
         in="result0"
         result="result1"
         kernelUnitLength="1"
         diffuseConstant="1"
         surfaceScale="4"
         id="feDiffuseLighting4526">
        <feDistantLight
           elevation="60"
           azimuth="235"
           id="feDistantLight4528" />
      </feDiffuseLighting>
      <feSpecularLighting
         result="result3"
         kernelUnitLength="1"
         specularExponent="25"
         specularConstant="1"
         surfaceScale="3"
         in="result0"
         id="feSpecularLighting4530">
        <feDistantLight
           elevation="55"
           azimuth="235"
           id="feDistantLight4532" />
      </feSpecularLighting>
      <feComposite
         id="feComposite4534"
         result="result2"
         in="result1"
         k4="0"
         k3="0"
         k2="0"
         k1="1"
         operator="arithmetic"
         in2="SourceGraphic" />
      <feComposite
         id="feComposite4536"
         result="result4"
         in="result2"
         k4="0"
         k3="1"
         k2="1"
         k1="0"
         operator="arithmetic"
         in2="result3" />
      <feComposite
         id="feComposite4538"
         result="fbSourceGraphic"
         in="result4"
         operator="in"
         in2="SourceAlpha" />
      <feDisplacementMap
         id="feDisplacementMap4540"
         yChannelSelector="G"
         xChannelSelector="R"
         scale="7"
         in2="result0" />
    </filter>
    <path
       style="fill:none;stroke:none"
       id="path7235-1"
       transform="translate(0,702.36215)"
       d="m 251.37646,1280.199 c 24.33622,32.8983 59.3224,73.2045 94.39875,106.4195"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7211-5"
       transform="translate(0,702.36215)"
       d="m 417.193,1423.0345 c 24.95118,-15.18 84.14272,-66.644 103.23758,-94.0452"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7200-5"
       d="m 64.06095,1972.2176 c 35.96516,71.8882 38.83121,64.6814 33.5,121"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7189-6"
       transform="translate(0,702.36215)"
       d="m 127,1169.5 c 14.35038,12.4758 36.6232,25.0774 46.5,36.75"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7166-2"
       d="m 224.5064,1846.0895 c 2.26662,21.2383 -1.95841,40.8674 0.35355,61.3389"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7161-2"
       transform="translate(0,702.36215)"
       d="m 456.43743,1138.4241 c 28.4362,5.7057 49.00039,20.5567 51.97234,48.7903"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7150-9"
       d="m 275.77164,1927.2959 c 35.31392,7.8399 75.72672,12.6374 98.6414,42.4264"
       inkscape:connector-curvature="0" />
    <marker
       style="overflow:visible"
       id="marker4074"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4076"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4070"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4072"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4066"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4068"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4062"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4064"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4058"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4060"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4054"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4056"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow1Mend-0"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6294-4"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <filter
       id="filter5200"
       color-interpolation-filters="sRGB">
      <feTurbulence
         result="result0"
         seed="55"
         baseFrequency="0.02"
         numOctaves="7"
         type="fractalNoise"
         id="feTurbulence5202" />
      <feDiffuseLighting
         in="result0"
         result="result1"
         kernelUnitLength="1"
         diffuseConstant="1"
         surfaceScale="4"
         id="feDiffuseLighting5204">
        <feDistantLight
           elevation="60"
           azimuth="235"
           id="feDistantLight5206" />
      </feDiffuseLighting>
      <feSpecularLighting
         result="result3"
         kernelUnitLength="1"
         specularExponent="25"
         specularConstant="1"
         surfaceScale="3"
         in="result0"
         id="feSpecularLighting5208">
        <feDistantLight
           elevation="55"
           azimuth="235"
           id="feDistantLight5210" />
      </feSpecularLighting>
      <feComposite
         id="feComposite5212"
         result="result2"
         in="result1"
         k4="0"
         k3="0"
         k2="0"
         k1="1"
         operator="arithmetic"
         in2="SourceGraphic" />
      <feComposite
         id="feComposite5214"
         result="result4"
         in="result2"
         k4="0"
         k3="1"
         k2="1"
         k1="0"
         operator="arithmetic"
         in2="result3" />
      <feComposite
         id="feComposite5216"
         result="fbSourceGraphic"
         in="result4"
         operator="in"
         in2="SourceAlpha" />
      <feDisplacementMap
         id="feDisplacementMap5218"
         yChannelSelector="G"
         xChannelSelector="R"
         scale="7"
         in2="result0" />
    </filter>
    <filter
       id="filter4927-9"
       color-interpolation-filters="sRGB">
      <feTurbulence
         result="result0"
         seed="55"
         baseFrequency="0.02"
         numOctaves="7"
         type="fractalNoise"
         id="feTurbulence4929-3" />
      <feDiffuseLighting
         in="result0"
         result="result1"
         kernelUnitLength="1"
         diffuseConstant="1"
         surfaceScale="4"
         id="feDiffuseLighting4931-6">
        <feDistantLight
           elevation="60"
           azimuth="235"
           id="feDistantLight4933-1" />
      </feDiffuseLighting>
      <feSpecularLighting
         result="result3"
         kernelUnitLength="1"
         specularExponent="25"
         specularConstant="1"
         surfaceScale="3"
         in="result0"
         id="feSpecularLighting4935-5">
        <feDistantLight
           elevation="55"
           azimuth="235"
           id="feDistantLight4937-6" />
      </feSpecularLighting>
      <feComposite
         id="feComposite4939-9"
         result="result2"
         in="result1"
         k4="0"
         k3="0"
         k2="0"
         k1="1"
         operator="arithmetic"
         in2="SourceGraphic" />
      <feComposite
         id="feComposite4941-2"
         result="result4"
         in="result2"
         k4="0"
         k3="1"
         k2="1"
         k1="0"
         operator="arithmetic"
         in2="result3" />
      <feComposite
         id="feComposite4943-5"
         result="fbSourceGraphic"
         in="result4"
         operator="in"
         in2="SourceAlpha" />
      <feDisplacementMap
         id="feDisplacementMap4945-8"
         yChannelSelector="G"
         xChannelSelector="R"
         scale="7"
         in2="result0" />
    </filter>
    <filter
       id="filter4927"
       color-interpolation-filters="sRGB">
      <feTurbulence
         result="result0"
         seed="55"
         baseFrequency="0.02"
         numOctaves="7"
         type="fractalNoise"
         id="feTurbulence4929" />
      <feDiffuseLighting
         in="result0"
         result="result1"
         kernelUnitLength="1"
         diffuseConstant="1"
         surfaceScale="4"
         id="feDiffuseLighting4931">
        <feDistantLight
           elevation="60"
           azimuth="235"
           id="feDistantLight4933" />
      </feDiffuseLighting>
      <feSpecularLighting
         result="result3"
         kernelUnitLength="1"
         specularExponent="25"
         specularConstant="1"
         surfaceScale="3"
         in="result0"
         id="feSpecularLighting4935">
        <feDistantLight
           elevation="55"
           azimuth="235"
           id="feDistantLight4937" />
      </feSpecularLighting>
      <feComposite
         id="feComposite4939"
         result="result2"
         in="result1"
         k4="0"
         k3="0"
         k2="0"
         k1="1"
         operator="arithmetic"
         in2="SourceGraphic" />
      <feComposite
         id="feComposite4941"
         result="result4"
         in="result2"
         k4="0"
         k3="1"
         k2="1"
         k1="0"
         operator="arithmetic"
         in2="result3" />
      <feComposite
         id="feComposite4943"
         result="fbSourceGraphic"
         in="result4"
         operator="in"
         in2="SourceAlpha" />
      <feDisplacementMap
         id="feDisplacementMap4945"
         yChannelSelector="G"
         xChannelSelector="R"
         scale="7"
         in2="result0" />
    </filter>
    <marker
       style="overflow:visible"
       id="Arrow1Lend"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6288"
         transform="matrix(-0.8,0,0,-0.8,-10,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow2Lend"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke-width:0.625;stroke-linejoin:round"
         id="path6306"
         transform="matrix(-1.1,0,0,-1.1,-1.1,0)"
         d="M 8.7185878,4.0337352 -2.2072895,0.01601326 8.7185884,-4.0017078 c -1.7454984,2.3720609 -1.7354408,5.6174519 -6e-7,8.035443 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow1Mend-8"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6294"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow1Mend-9-5"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6294-2-5"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <path
       style="fill:none;stroke:none"
       id="path7235-14-2"
       transform="translate(0,702.36215)"
       d="m 251.37646,1280.199 c 24.33622,32.8983 59.3224,73.2045 94.39875,106.4195"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7211-59-6"
       transform="translate(0,702.36215)"
       d="m 417.193,1423.0345 c 24.95118,-15.18 84.14272,-66.644 103.23758,-94.0452"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7200-0-4"
       d="m 64.06095,1972.2176 c 35.96516,71.8882 38.83121,64.6814 33.5,121"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7189-7-3"
       transform="translate(0,702.36215)"
       d="m 127,1169.5 c 14.35038,12.4758 36.6232,25.0774 46.5,36.75"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7166-0-9"
       d="m 224.5064,1846.0895 c 2.26662,21.2383 -1.95841,40.8674 0.35355,61.3389"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7161-7-7"
       transform="translate(0,702.36215)"
       d="m 456.43743,1138.4241 c 28.4362,5.7057 49.00039,20.5567 51.97234,48.7903"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7150-8-6"
       d="m 275.77164,1927.2959 c 35.31392,7.8399 75.72672,12.6374 98.6414,42.4264"
       inkscape:connector-curvature="0" />
    <marker
       style="overflow:visible"
       id="marker3381-4"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3383-1"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3377-6"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3379-1"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3373-9"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3375-6"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3369-6"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3371-2"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3365-1"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3367-4"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3361-3"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3363-7"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow1Mend-08-5"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6294-0-0"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <filter
       id="filter4522-1"
       color-interpolation-filters="sRGB">
      <feTurbulence
         result="result0"
         seed="55"
         baseFrequency="0.02"
         numOctaves="7"
         type="fractalNoise"
         id="feTurbulence4524-9" />
      <feDiffuseLighting
         in="result0"
         result="result1"
         kernelUnitLength="1"
         diffuseConstant="1"
         surfaceScale="4"
         id="feDiffuseLighting4526-4">
        <feDistantLight
           elevation="60"
           azimuth="235"
           id="feDistantLight4528-4" />
      </feDiffuseLighting>
      <feSpecularLighting
         result="result3"
         kernelUnitLength="1"
         specularExponent="25"
         specularConstant="1"
         surfaceScale="3"
         in="result0"
         id="feSpecularLighting4530-8">
        <feDistantLight
           elevation="55"
           azimuth="235"
           id="feDistantLight4532-1" />
      </feSpecularLighting>
      <feComposite
         id="feComposite4534-4"
         result="result2"
         in="result1"
         k4="0"
         k3="0"
         k2="0"
         k1="1"
         operator="arithmetic"
         in2="SourceGraphic" />
      <feComposite
         id="feComposite4536-8"
         result="result4"
         in="result2"
         k4="0"
         k3="1"
         k2="1"
         k1="0"
         operator="arithmetic"
         in2="result3" />
      <feComposite
         id="feComposite4538-6"
         result="fbSourceGraphic"
         in="result4"
         operator="in"
         in2="SourceAlpha" />
      <feDisplacementMap
         id="feDisplacementMap4540-6"
         yChannelSelector="G"
         xChannelSelector="R"
         scale="7"
         in2="result0" />
    </filter>
    <path
       style="fill:none;stroke:none"
       id="path7235-1-9"
       transform="translate(0,702.36215)"
       d="m 251.37646,1280.199 c 24.33622,32.8983 59.3224,73.2045 94.39875,106.4195"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7211-5-5"
       transform="translate(0,702.36215)"
       d="m 417.193,1423.0345 c 24.95118,-15.18 84.14272,-66.644 103.23758,-94.0452"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7200-5-5"
       d="m 64.06095,1972.2176 c 35.96516,71.8882 38.83121,64.6814 33.5,121"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7189-6-5"
       transform="translate(0,702.36215)"
       d="m 127,1169.5 c 14.35038,12.4758 36.6232,25.0774 46.5,36.75"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7166-2-8"
       d="m 224.5064,1846.0895 c 2.26662,21.2383 -1.95841,40.8674 0.35355,61.3389"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7161-2-0"
       transform="translate(0,702.36215)"
       d="m 456.43743,1138.4241 c 28.4362,5.7057 49.00039,20.5567 51.97234,48.7903"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7150-9-4"
       d="m 275.77164,1927.2959 c 35.31392,7.8399 75.72672,12.6374 98.6414,42.4264"
       inkscape:connector-curvature="0" />
    <marker
       style="overflow:visible"
       id="marker4074-8"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4076-4"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4070-2"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4072-0"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4066-2"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4068-8"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4062-6"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4064-1"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4058-1"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4060-9"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4054-6"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4056-2"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow1Mend-0-7"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6294-4-2"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <filter
       id="filter5200-3"
       color-interpolation-filters="sRGB">
      <feTurbulence
         result="result0"
         seed="55"
         baseFrequency="0.02"
         numOctaves="7"
         type="fractalNoise"
         id="feTurbulence5202-1" />
      <feDiffuseLighting
         in="result0"
         result="result1"
         kernelUnitLength="1"
         diffuseConstant="1"
         surfaceScale="4"
         id="feDiffuseLighting5204-3">
        <feDistantLight
           elevation="60"
           azimuth="235"
           id="feDistantLight5206-3" />
      </feDiffuseLighting>
      <feSpecularLighting
         result="result3"
         kernelUnitLength="1"
         specularExponent="25"
         specularConstant="1"
         surfaceScale="3"
         in="result0"
         id="feSpecularLighting5208-7">
        <feDistantLight
           elevation="55"
           azimuth="235"
           id="feDistantLight5210-7" />
      </feSpecularLighting>
      <feComposite
         id="feComposite5212-0"
         result="result2"
         in="result1"
         k4="0"
         k3="0"
         k2="0"
         k1="1"
         operator="arithmetic"
         in2="SourceGraphic" />
      <feComposite
         id="feComposite5214-0"
         result="result4"
         in="result2"
         k4="0"
         k3="1"
         k2="1"
         k1="0"
         operator="arithmetic"
         in2="result3" />
      <feComposite
         id="feComposite5216-3"
         result="fbSourceGraphic"
         in="result4"
         operator="in"
         in2="SourceAlpha" />
      <feDisplacementMap
         id="feDisplacementMap5218-0"
         yChannelSelector="G"
         xChannelSelector="R"
         scale="7"
         in2="result0" />
    </filter>
    <filter
       id="filter4927-9-6"
       color-interpolation-filters="sRGB">
      <feTurbulence
         result="result0"
         seed="55"
         baseFrequency="0.02"
         numOctaves="7"
         type="fractalNoise"
         id="feTurbulence4929-3-7" />
      <feDiffuseLighting
         in="result0"
         result="result1"
         kernelUnitLength="1"
         diffuseConstant="1"
         surfaceScale="4"
         id="feDiffuseLighting4931-6-2">
        <feDistantLight
           elevation="60"
           azimuth="235"
           id="feDistantLight4933-1-4" />
      </feDiffuseLighting>
      <feSpecularLighting
         result="result3"
         kernelUnitLength="1"
         specularExponent="25"
         specularConstant="1"
         surfaceScale="3"
         in="result0"
         id="feSpecularLighting4935-5-2">
        <feDistantLight
           elevation="55"
           azimuth="235"
           id="feDistantLight4937-6-1" />
      </feSpecularLighting>
      <feComposite
         id="feComposite4939-9-8"
         result="result2"
         in="result1"
         k4="0"
         k3="0"
         k2="0"
         k1="1"
         operator="arithmetic"
         in2="SourceGraphic" />
      <feComposite
         id="feComposite4941-2-5"
         result="result4"
         in="result2"
         k4="0"
         k3="1"
         k2="1"
         k1="0"
         operator="arithmetic"
         in2="result3" />
      <feComposite
         id="feComposite4943-5-7"
         result="fbSourceGraphic"
         in="result4"
         operator="in"
         in2="SourceAlpha" />
      <feDisplacementMap
         id="feDisplacementMap4945-8-4"
         yChannelSelector="G"
         xChannelSelector="R"
         scale="7"
         in2="result0" />
    </filter>
    <filter
       id="filter4927-6"
       color-interpolation-filters="sRGB">
      <feTurbulence
         result="result0"
         seed="55"
         baseFrequency="0.02"
         numOctaves="7"
         type="fractalNoise"
         id="feTurbulence4929-6" />
      <feDiffuseLighting
         in="result0"
         result="result1"
         kernelUnitLength="1"
         diffuseConstant="1"
         surfaceScale="4"
         id="feDiffuseLighting4931-5">
        <feDistantLight
           elevation="60"
           azimuth="235"
           id="feDistantLight4933-7" />
      </feDiffuseLighting>
      <feSpecularLighting
         result="result3"
         kernelUnitLength="1"
         specularExponent="25"
         specularConstant="1"
         surfaceScale="3"
         in="result0"
         id="feSpecularLighting4935-3">
        <feDistantLight
           elevation="55"
           azimuth="235"
           id="feDistantLight4937-4" />
      </feSpecularLighting>
      <feComposite
         id="feComposite4939-0"
         result="result2"
         in="result1"
         k4="0"
         k3="0"
         k2="0"
         k1="1"
         operator="arithmetic"
         in2="SourceGraphic" />
      <feComposite
         id="feComposite4941-1"
         result="result4"
         in="result2"
         k4="0"
         k3="1"
         k2="1"
         k1="0"
         operator="arithmetic"
         in2="result3" />
      <feComposite
         id="feComposite4943-2"
         result="fbSourceGraphic"
         in="result4"
         operator="in"
         in2="SourceAlpha" />
      <feDisplacementMap
         id="feDisplacementMap4945-9"
         yChannelSelector="G"
         xChannelSelector="R"
         scale="7"
         in2="result0" />
    </filter>
    <marker
       style="overflow:visible"
       id="Arrow1Lend-8"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6288-7"
         transform="matrix(-0.8,0,0,-0.8,-10,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow2Lend-0"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke-width:0.625;stroke-linejoin:round"
         id="path6306-4"
         transform="matrix(-1.1,0,0,-1.1,-1.1,0)"
         d="M 8.7185878,4.0337352 -2.2072895,0.01601326 8.7185884,-4.0017078 c -1.7454984,2.3720609 -1.7354408,5.6174519 -6e-7,8.035443 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow1Mend-86"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6294-46"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow1Mend-9-0"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6294-2-1"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <path
       style="fill:none;stroke:none"
       id="path7235-14-9"
       transform="translate(0,702.36215)"
       d="m 251.37646,1280.199 c 24.33622,32.8983 59.3224,73.2045 94.39875,106.4195"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7211-59-4"
       transform="translate(0,702.36215)"
       d="m 417.193,1423.0345 c 24.95118,-15.18 84.14272,-66.644 103.23758,-94.0452"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7200-0-3"
       d="m 64.06095,1972.2176 c 35.96516,71.8882 38.83121,64.6814 33.5,121"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7189-7-8"
       transform="translate(0,702.36215)"
       d="m 127,1169.5 c 14.35038,12.4758 36.6232,25.0774 46.5,36.75"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7166-0-0"
       d="m 224.5064,1846.0895 c 2.26662,21.2383 -1.95841,40.8674 0.35355,61.3389"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7161-7-2"
       transform="translate(0,702.36215)"
       d="m 456.43743,1138.4241 c 28.4362,5.7057 49.00039,20.5567 51.97234,48.7903"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7150-8-7"
       d="m 275.77164,1927.2959 c 35.31392,7.8399 75.72672,12.6374 98.6414,42.4264"
       inkscape:connector-curvature="0" />
    <marker
       style="overflow:visible"
       id="marker3381-3"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3383-4"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3377-7"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3379-4"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3373-1"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3375-2"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3369-9"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3371-9"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3365-8"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3367-0"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3361-1"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3363-73"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow1Mend-08-9"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6294-0-6"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <filter
       id="filter4522-3"
       color-interpolation-filters="sRGB">
      <feTurbulence
         result="result0"
         seed="55"
         baseFrequency="0.02"
         numOctaves="7"
         type="fractalNoise"
         id="feTurbulence4524-1" />
      <feDiffuseLighting
         in="result0"
         result="result1"
         kernelUnitLength="1"
         diffuseConstant="1"
         surfaceScale="4"
         id="feDiffuseLighting4526-7">
        <feDistantLight
           elevation="60"
           azimuth="235"
           id="feDistantLight4528-5" />
      </feDiffuseLighting>
      <feSpecularLighting
         result="result3"
         kernelUnitLength="1"
         specularExponent="25"
         specularConstant="1"
         surfaceScale="3"
         in="result0"
         id="feSpecularLighting4530-3">
        <feDistantLight
           elevation="55"
           azimuth="235"
           id="feDistantLight4532-5" />
      </feSpecularLighting>
      <feComposite
         id="feComposite4534-41"
         result="result2"
         in="result1"
         k4="0"
         k3="0"
         k2="0"
         k1="1"
         operator="arithmetic"
         in2="SourceGraphic" />
      <feComposite
         id="feComposite4536-2"
         result="result4"
         in="result2"
         k4="0"
         k3="1"
         k2="1"
         k1="0"
         operator="arithmetic"
         in2="result3" />
      <feComposite
         id="feComposite4538-9"
         result="fbSourceGraphic"
         in="result4"
         operator="in"
         in2="SourceAlpha" />
      <feDisplacementMap
         id="feDisplacementMap4540-3"
         yChannelSelector="G"
         xChannelSelector="R"
         scale="7"
         in2="result0" />
    </filter>
    <path
       style="fill:none;stroke:none"
       id="path7235-1-91"
       transform="translate(0,702.36215)"
       d="m 251.37646,1280.199 c 24.33622,32.8983 59.3224,73.2045 94.39875,106.4195"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7211-5-6"
       transform="translate(0,702.36215)"
       d="m 417.193,1423.0345 c 24.95118,-15.18 84.14272,-66.644 103.23758,-94.0452"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7200-5-7"
       d="m 64.06095,1972.2176 c 35.96516,71.8882 38.83121,64.6814 33.5,121"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7189-6-53"
       transform="translate(0,702.36215)"
       d="m 127,1169.5 c 14.35038,12.4758 36.6232,25.0774 46.5,36.75"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7166-2-9"
       d="m 224.5064,1846.0895 c 2.26662,21.2383 -1.95841,40.8674 0.35355,61.3389"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7161-2-2"
       transform="translate(0,702.36215)"
       d="m 456.43743,1138.4241 c 28.4362,5.7057 49.00039,20.5567 51.97234,48.7903"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7150-9-8"
       d="m 275.77164,1927.2959 c 35.31392,7.8399 75.72672,12.6374 98.6414,42.4264"
       inkscape:connector-curvature="0" />
    <marker
       style="overflow:visible"
       id="marker4074-1"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4076-2"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4070-24"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4072-1"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4066-5"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4068-5"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4062-7"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4064-6"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4058-7"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4060-5"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4054-5"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4056-0"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow1Mend-0-78"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6294-4-4"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <filter
       id="filter5200-8"
       color-interpolation-filters="sRGB">
      <feTurbulence
         result="result0"
         seed="55"
         baseFrequency="0.02"
         numOctaves="7"
         type="fractalNoise"
         id="feTurbulence5202-9" />
      <feDiffuseLighting
         in="result0"
         result="result1"
         kernelUnitLength="1"
         diffuseConstant="1"
         surfaceScale="4"
         id="feDiffuseLighting5204-6">
        <feDistantLight
           elevation="60"
           azimuth="235"
           id="feDistantLight5206-2" />
      </feDiffuseLighting>
      <feSpecularLighting
         result="result3"
         kernelUnitLength="1"
         specularExponent="25"
         specularConstant="1"
         surfaceScale="3"
         in="result0"
         id="feSpecularLighting5208-5">
        <feDistantLight
           elevation="55"
           azimuth="235"
           id="feDistantLight5210-0" />
      </feSpecularLighting>
      <feComposite
         id="feComposite5212-4"
         result="result2"
         in="result1"
         k4="0"
         k3="0"
         k2="0"
         k1="1"
         operator="arithmetic"
         in2="SourceGraphic" />
      <feComposite
         id="feComposite5214-2"
         result="result4"
         in="result2"
         k4="0"
         k3="1"
         k2="1"
         k1="0"
         operator="arithmetic"
         in2="result3" />
      <feComposite
         id="feComposite5216-0"
         result="fbSourceGraphic"
         in="result4"
         operator="in"
         in2="SourceAlpha" />
      <feDisplacementMap
         id="feDisplacementMap5218-8"
         yChannelSelector="G"
         xChannelSelector="R"
         scale="7"
         in2="result0" />
    </filter>
    <filter
       id="filter4927-9-7"
       color-interpolation-filters="sRGB">
      <feTurbulence
         result="result0"
         seed="55"
         baseFrequency="0.02"
         numOctaves="7"
         type="fractalNoise"
         id="feTurbulence4929-3-4" />
      <feDiffuseLighting
         in="result0"
         result="result1"
         kernelUnitLength="1"
         diffuseConstant="1"
         surfaceScale="4"
         id="feDiffuseLighting4931-6-9">
        <feDistantLight
           elevation="60"
           azimuth="235"
           id="feDistantLight4933-1-49" />
      </feDiffuseLighting>
      <feSpecularLighting
         result="result3"
         kernelUnitLength="1"
         specularExponent="25"
         specularConstant="1"
         surfaceScale="3"
         in="result0"
         id="feSpecularLighting4935-5-6">
        <feDistantLight
           elevation="55"
           azimuth="235"
           id="feDistantLight4937-6-7" />
      </feSpecularLighting>
      <feComposite
         id="feComposite4939-9-9"
         result="result2"
         in="result1"
         k4="0"
         k3="0"
         k2="0"
         k1="1"
         operator="arithmetic"
         in2="SourceGraphic" />
      <feComposite
         id="feComposite4941-2-6"
         result="result4"
         in="result2"
         k4="0"
         k3="1"
         k2="1"
         k1="0"
         operator="arithmetic"
         in2="result3" />
      <feComposite
         id="feComposite4943-5-5"
         result="fbSourceGraphic"
         in="result4"
         operator="in"
         in2="SourceAlpha" />
      <feDisplacementMap
         id="feDisplacementMap4945-8-8"
         yChannelSelector="G"
         xChannelSelector="R"
         scale="7"
         in2="result0" />
    </filter>
    <filter
       id="filter4927-7"
       color-interpolation-filters="sRGB">
      <feTurbulence
         result="result0"
         seed="55"
         baseFrequency="0.02"
         numOctaves="7"
         type="fractalNoise"
         id="feTurbulence4929-8" />
      <feDiffuseLighting
         in="result0"
         result="result1"
         kernelUnitLength="1"
         diffuseConstant="1"
         surfaceScale="4"
         id="feDiffuseLighting4931-3">
        <feDistantLight
           elevation="60"
           azimuth="235"
           id="feDistantLight4933-3" />
      </feDiffuseLighting>
      <feSpecularLighting
         result="result3"
         kernelUnitLength="1"
         specularExponent="25"
         specularConstant="1"
         surfaceScale="3"
         in="result0"
         id="feSpecularLighting4935-54">
        <feDistantLight
           elevation="55"
           azimuth="235"
           id="feDistantLight4937-60" />
      </feSpecularLighting>
      <feComposite
         id="feComposite4939-1"
         result="result2"
         in="result1"
         k4="0"
         k3="0"
         k2="0"
         k1="1"
         operator="arithmetic"
         in2="SourceGraphic" />
      <feComposite
         id="feComposite4941-0"
         result="result4"
         in="result2"
         k4="0"
         k3="1"
         k2="1"
         k1="0"
         operator="arithmetic"
         in2="result3" />
      <feComposite
         id="feComposite4943-7"
         result="fbSourceGraphic"
         in="result4"
         operator="in"
         in2="SourceAlpha" />
      <feDisplacementMap
         id="feDisplacementMap4945-88"
         yChannelSelector="G"
         xChannelSelector="R"
         scale="7"
         in2="result0" />
    </filter>
    <marker
       style="overflow:visible"
       id="Arrow1Lend-4"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6288-0"
         transform="matrix(-0.8,0,0,-0.8,-10,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow2Lend-4"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke-width:0.625;stroke-linejoin:round"
         id="path6306-3"
         transform="matrix(-1.1,0,0,-1.1,-1.1,0)"
         d="M 8.7185878,4.0337352 -2.2072895,0.01601326 8.7185884,-4.0017078 c -1.7454984,2.3720609 -1.7354408,5.6174519 -6e-7,8.035443 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow1Mend-94"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6294-5"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow1Mend-8-0"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6294-7"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow2Lend-5"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke-width:0.625;stroke-linejoin:round"
         id="path6306-5"
         transform="matrix(-1.1,0,0,-1.1,-1.1,0)"
         d="M 8.7185878,4.0337352 -2.2072895,0.01601326 8.7185884,-4.0017078 c -1.7454984,2.3720609 -1.7354408,5.6174519 -6e-7,8.035443 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow1Lend-0"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6288-1"
         transform="matrix(-0.8,0,0,-0.8,-10,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <filter
       id="filter4927-72"
       color-interpolation-filters="sRGB">
      <feTurbulence
         result="result0"
         seed="55"
         baseFrequency="0.02"
         numOctaves="7"
         type="fractalNoise"
         id="feTurbulence4929-33" />
      <feDiffuseLighting
         in="result0"
         result="result1"
         kernelUnitLength="1"
         diffuseConstant="1"
         surfaceScale="4"
         id="feDiffuseLighting4931-51">
        <feDistantLight
           elevation="60"
           azimuth="235"
           id="feDistantLight4933-70" />
      </feDiffuseLighting>
      <feSpecularLighting
         result="result3"
         kernelUnitLength="1"
         specularExponent="25"
         specularConstant="1"
         surfaceScale="3"
         in="result0"
         id="feSpecularLighting4935-7">
        <feDistantLight
           elevation="55"
           azimuth="235"
           id="feDistantLight4937-63" />
      </feSpecularLighting>
      <feComposite
         id="feComposite4939-05"
         result="result2"
         in="result1"
         k4="0"
         k3="0"
         k2="0"
         k1="1"
         operator="arithmetic"
         in2="SourceGraphic" />
      <feComposite
         id="feComposite4941-9"
         result="result4"
         in="result2"
         k4="0"
         k3="1"
         k2="1"
         k1="0"
         operator="arithmetic"
         in2="result3" />
      <feComposite
         id="feComposite4943-3"
         result="fbSourceGraphic"
         in="result4"
         operator="in"
         in2="SourceAlpha" />
      <feDisplacementMap
         id="feDisplacementMap4945-0"
         yChannelSelector="G"
         xChannelSelector="R"
         scale="7"
         in2="result0" />
    </filter>
    <filter
       id="filter4927-9-2"
       color-interpolation-filters="sRGB">
      <feTurbulence
         result="result0"
         seed="55"
         baseFrequency="0.02"
         numOctaves="7"
         type="fractalNoise"
         id="feTurbulence4929-3-6" />
      <feDiffuseLighting
         in="result0"
         result="result1"
         kernelUnitLength="1"
         diffuseConstant="1"
         surfaceScale="4"
         id="feDiffuseLighting4931-6-7">
        <feDistantLight
           elevation="60"
           azimuth="235"
           id="feDistantLight4933-1-9" />
      </feDiffuseLighting>
      <feSpecularLighting
         result="result3"
         kernelUnitLength="1"
         specularExponent="25"
         specularConstant="1"
         surfaceScale="3"
         in="result0"
         id="feSpecularLighting4935-5-9">
        <feDistantLight
           elevation="55"
           azimuth="235"
           id="feDistantLight4937-6-6" />
      </feSpecularLighting>
      <feComposite
         id="feComposite4939-9-3"
         result="result2"
         in="result1"
         k4="0"
         k3="0"
         k2="0"
         k1="1"
         operator="arithmetic"
         in2="SourceGraphic" />
      <feComposite
         id="feComposite4941-2-8"
         result="result4"
         in="result2"
         k4="0"
         k3="1"
         k2="1"
         k1="0"
         operator="arithmetic"
         in2="result3" />
      <feComposite
         id="feComposite4943-5-8"
         result="fbSourceGraphic"
         in="result4"
         operator="in"
         in2="SourceAlpha" />
      <feDisplacementMap
         id="feDisplacementMap4945-8-3"
         yChannelSelector="G"
         xChannelSelector="R"
         scale="7"
         in2="result0" />
    </filter>
    <filter
       id="filter5200-81"
       color-interpolation-filters="sRGB">
      <feTurbulence
         result="result0"
         seed="55"
         baseFrequency="0.02"
         numOctaves="7"
         type="fractalNoise"
         id="feTurbulence5202-3" />
      <feDiffuseLighting
         in="result0"
         result="result1"
         kernelUnitLength="1"
         diffuseConstant="1"
         surfaceScale="4"
         id="feDiffuseLighting5204-7">
        <feDistantLight
           elevation="60"
           azimuth="235"
           id="feDistantLight5206-6" />
      </feDiffuseLighting>
      <feSpecularLighting
         result="result3"
         kernelUnitLength="1"
         specularExponent="25"
         specularConstant="1"
         surfaceScale="3"
         in="result0"
         id="feSpecularLighting5208-2">
        <feDistantLight
           elevation="55"
           azimuth="235"
           id="feDistantLight5210-4" />
      </feSpecularLighting>
      <feComposite
         id="feComposite5212-8"
         result="result2"
         in="result1"
         k4="0"
         k3="0"
         k2="0"
         k1="1"
         operator="arithmetic"
         in2="SourceGraphic" />
      <feComposite
         id="feComposite5214-8"
         result="result4"
         in="result2"
         k4="0"
         k3="1"
         k2="1"
         k1="0"
         operator="arithmetic"
         in2="result3" />
      <feComposite
         id="feComposite5216-35"
         result="fbSourceGraphic"
         in="result4"
         operator="in"
         in2="SourceAlpha" />
      <feDisplacementMap
         id="feDisplacementMap5218-6"
         yChannelSelector="G"
         xChannelSelector="R"
         scale="7"
         in2="result0" />
    </filter>
    <marker
       style="overflow:visible"
       id="Arrow1Mend-0-4"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6294-4-44"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4054-1"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4056-6"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4058-4"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4060-94"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4062-0"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4064-7"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4066-29"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4068-2"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4070-3"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4072-6"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker4074-81"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4076-7"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <path
       style="fill:none;stroke:none"
       id="path7150-9-6"
       d="m 275.77164,1927.2959 c 35.31392,7.8399 75.72672,12.6374 98.6414,42.4264"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7161-2-8"
       transform="translate(0,702.36215)"
       d="m 456.43743,1138.4241 c 28.4362,5.7057 49.00039,20.5567 51.97234,48.7903"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7166-2-5"
       d="m 224.5064,1846.0895 c 2.26662,21.2383 -1.95841,40.8674 0.35355,61.3389"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7189-6-9"
       transform="translate(0,702.36215)"
       d="m 127,1169.5 c 14.35038,12.4758 36.6232,25.0774 46.5,36.75"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7200-5-4"
       d="m 64.06095,1972.2176 c 35.96516,71.8882 38.83121,64.6814 33.5,121"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7211-5-2"
       transform="translate(0,702.36215)"
       d="m 417.193,1423.0345 c 24.95118,-15.18 84.14272,-66.644 103.23758,-94.0452"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7235-1-5"
       transform="translate(0,702.36215)"
       d="m 251.37646,1280.199 c 24.33622,32.8983 59.3224,73.2045 94.39875,106.4195"
       inkscape:connector-curvature="0" />
    <filter
       id="filter4522-9"
       color-interpolation-filters="sRGB">
      <feTurbulence
         result="result0"
         seed="55"
         baseFrequency="0.02"
         numOctaves="7"
         type="fractalNoise"
         id="feTurbulence4524-5" />
      <feDiffuseLighting
         in="result0"
         result="result1"
         kernelUnitLength="1"
         diffuseConstant="1"
         surfaceScale="4"
         id="feDiffuseLighting4526-76">
        <feDistantLight
           elevation="60"
           azimuth="235"
           id="feDistantLight4528-8" />
      </feDiffuseLighting>
      <feSpecularLighting
         result="result3"
         kernelUnitLength="1"
         specularExponent="25"
         specularConstant="1"
         surfaceScale="3"
         in="result0"
         id="feSpecularLighting4530-36">
        <feDistantLight
           elevation="55"
           azimuth="235"
           id="feDistantLight4532-4" />
      </feSpecularLighting>
      <feComposite
         id="feComposite4534-47"
         result="result2"
         in="result1"
         k4="0"
         k3="0"
         k2="0"
         k1="1"
         operator="arithmetic"
         in2="SourceGraphic" />
      <feComposite
         id="feComposite4536-9"
         result="result4"
         in="result2"
         k4="0"
         k3="1"
         k2="1"
         k1="0"
         operator="arithmetic"
         in2="result3" />
      <feComposite
         id="feComposite4538-3"
         result="fbSourceGraphic"
         in="result4"
         operator="in"
         in2="SourceAlpha" />
      <feDisplacementMap
         id="feDisplacementMap4540-9"
         yChannelSelector="G"
         xChannelSelector="R"
         scale="7"
         in2="result0" />
    </filter>
    <marker
       style="overflow:visible"
       id="Arrow1Mend-08-8"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6294-0-9"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3361-4"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3363-5"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3365-5"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3367-3"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3369-3"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3371-5"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3373-3"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3375-8"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3377-5"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3379-3"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker3381-1"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path3383-2"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <path
       style="fill:none;stroke:none"
       id="path7150-8-4"
       d="m 275.77164,1927.2959 c 35.31392,7.8399 75.72672,12.6374 98.6414,42.4264"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7161-7-3"
       transform="translate(0,702.36215)"
       d="m 456.43743,1138.4241 c 28.4362,5.7057 49.00039,20.5567 51.97234,48.7903"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7166-0-8"
       d="m 224.5064,1846.0895 c 2.26662,21.2383 -1.95841,40.8674 0.35355,61.3389"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7189-7-4"
       transform="translate(0,702.36215)"
       d="m 127,1169.5 c 14.35038,12.4758 36.6232,25.0774 46.5,36.75"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7200-0-1"
       d="m 64.06095,1972.2176 c 35.96516,71.8882 38.83121,64.6814 33.5,121"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7211-59-7"
       transform="translate(0,702.36215)"
       d="m 417.193,1423.0345 c 24.95118,-15.18 84.14272,-66.644 103.23758,-94.0452"
       inkscape:connector-curvature="0" />
    <path
       style="fill:none;stroke:none"
       id="path7235-14-4"
       transform="translate(0,702.36215)"
       d="m 251.37646,1280.199 c 24.33622,32.8983 59.3224,73.2045 94.39875,106.4195"
       inkscape:connector-curvature="0" />
    <marker
       style="overflow:visible"
       id="Arrow1Mend-9-4"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path6294-2-19"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow1Mend-6"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path4048-9"
         transform="matrix(-0.4,0,0,-0.4,-4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow1Lstart-7"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path5193-1"
         transform="matrix(0.8,0,0,0.8,10,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="marker5671-5"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path5196-5"
         transform="matrix(-0.8,0,0,-0.8,-10,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
    <marker
       style="overflow:visible"
       id="Arrow1Mstart-5"
       orient="auto"
       refY="0"
       refX="0">
      <path
         style="fill-rule:evenodd;stroke:#000000;stroke-width:1pt"
         id="path5199-2"
         transform="matrix(0.4,0,0,0.4,4,0)"
         d="M 0,0 5,-5 -12.5,0 5,5 0,0 z"
         inkscape:connector-curvature="0" />
    </marker>
  </defs>
  <sodipodi:namedview
     id="base"
     pagecolor="#333333"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscape:pageopacity="0.66666667"
     inkscape:pageshadow="2"
     inkscape:zoom="1.4"
     inkscape:cx="431.53524"
     inkscape:cy="109.01293"
     inkscape:document-units="px"
     inkscape:current-layer="layer1"
     showgrid="false"
     inkscape:window-width="1920"
     inkscape:window-height="1025"
     inkscape:window-x="0"
     inkscape:window-y="27"
     inkscape:window-maximized="1"
     fit-margin-top="10"
     fit-margin-left="10"
     fit-margin-right="10"
     fit-margin-bottom="10" />
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
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1"
     transform="translate(-6.9777259,-730.90928)">
    <text
       style="font-size:21.9134655px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:DejaVu Sans;-inkscape-font-specification:DejaVu Sans"
       xml:space="preserve"
       id="text6033-5-5"
       y="852.91364"
       x="253.8875"
       sodipodi:linespacing="125%"><tspan
         style="fill:#ffffff;fill-opacity:1"
         id="tspan6035-2-5"
         y="852.91364"
         x="253.8875" /></text>
    <text
       xml:space="preserve"
       style="font-size:26.27815628px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"
       x="233.38641"
       y="780.74622"
       id="text6170"
       sodipodi:linespacing="125%"><tspan
         sodipodi:role="line"
         id="tspan6172"
         x="233.38641"
         y="780.74622" /></text>
    <text
       xml:space="preserve"
       style="font-size:16px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"
       x="222.85715"
       y="235.71429"
       id="text3892"
       sodipodi:linespacing="125%"
       transform="translate(0,552.36218)"><tspan
         sodipodi:role="line"
         id="tspan3894"
         x="222.85715"
         y="235.71429" /></text>
    <g
       transform="matrix(1.6049079,0,0,1.6049079,-37.127972,-658.92674)"
       id="g6092-3-6-3">
      <g
         transform="translate(-36.25,12.75)"
         id="g5228-7-5-3">
        <path
           inkscape:connector-curvature="0"
           d="m 79,266 28.5,-28.5 7.97789,29.77388"
           transform="translate(0,702.36215)"
           id="path5220-9-0-0"
           style="fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" />
        <path
           inkscape:connector-curvature="0"
           d="m 107,237.5 6.74343,-25.16682 -22.545109,6.04094"
           transform="translate(0,702.36215)"
           id="path5222-6-2-5"
           style="fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" />
        <path
           inkscape:connector-curvature="0"
           d="m 114,212.5 9,18"
           transform="translate(0,702.36215)"
           id="path5224-3-5-4"
           style="fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" />
        <path
           inkscape:connector-curvature="0"
           d="m 131,201.5 a 12.75,12.25 0 1 1 -25.5,0 12.75,12.25 0 1 1 25.5,0 z"
           transform="translate(1.75,701.61215)"
           id="path5226-7-5-8"
           style="color:#000000;fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" />
      </g>
      <path
         inkscape:connector-curvature="0"
         d="m 81.75,951.1122 23.25,-2.25005 5.5972,-20.88902"
         id="path6086-5-9-6"
         style="fill:none;stroke:#ffffff;stroke-width:3.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" />
      <text
         sodipodi:linespacing="125%"
         x="48.197334"
         y="894.83136"
         id="text6088-6-3-7"
         xml:space="preserve"
         style="font-size:18px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:DejaVu Sans;-inkscape-font-specification:DejaVu Sans"><tspan
           x="48.197334"
           y="894.83136"
           id="tspan6090-6-9-6"
           style="fill:#ffffff;fill-opacity:1">Client</tspan></text>
    </g>
    <g
       transform="matrix(3.1973338,0,0,3.1973338,156.05818,-1887.0221)"
       id="g5342-5-7-6-8"
       style="fill:#ffffff;fill-opacity:1">
      <path
         inkscape:connector-curvature="0"
         d="m 131.09203,838.77085 29.8198,0 0,29.81981 -7.50365,10 -32.31615,0 0,-32.31225 z m -10,8 31.8198,0 0,31.81981 -31.8198,0 z"
         id="rect5234-6-7-9-3-3"
         style="color:#000000;fill:none;stroke:#ffffff;stroke-width:2.0874567;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" />
      <path
         inkscape:connector-curvature="0"
         d="m 152.77926,144.62967 8.06544,-8.06543"
         transform="translate(0,702.36215)"
         id="path5340-64-9-9-5"
         style="fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-width:2.23656058;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" />
    </g>
    <text
       sodipodi:linespacing="125%"
       x="253.02083"
       y="853.76337"
       id="text6033-5-5-6"
       xml:space="preserve"
       style="font-size:21.9134655px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:DejaVu Sans;-inkscape-font-specification:DejaVu Sans"><tspan
         x="253.02083"
         y="853.76337"
         id="tspan6035-2-5-3"
         style="fill:#ffffff;fill-opacity:1" /></text>
    <text
       sodipodi:linespacing="125%"
       x="541.83459"
       y="768.82355"
       id="text6088-6-3-7-6"
       xml:space="preserve"
       style="font-size:33.36586761px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:DejaVu Sans;-inkscape-font-specification:DejaVu Sans"><tspan
         x="541.83459"
         y="768.82355"
         id="tspan6090-6-9-6-9"
         style="fill:#ffffff;fill-opacity:1">Queue</tspan></text>
    <text
       sodipodi:linespacing="125%"
       x="232.51974"
       y="781.59595"
       id="text6170-5"
       xml:space="preserve"
       style="font-size:26.27815628px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"><tspan
         x="232.51974"
         y="781.59595"
         id="tspan6172-0" /></text>
    <g
       transform="matrix(1.1918385,0,0,1.1918385,-14.96633,-117.14909)"
       id="g4082">
      <path
         inkscape:connector-curvature="0"
         d="m 296.0625,795.71875 c -49.45344,-0.17966 -99.37839,3.66567 -150,13.1875 l 0.75,4.03125 c 100.67609,-18.93699 198.75157,-15.3759 295.78125,-2.125 L 443.125,806.75 c -48.64955,-6.64385 -97.60906,-10.85159 -147.0625,-11.03125 z"
         id="path3888"
         style="font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-indent:0;text-align:start;text-decoration:none;line-height:normal;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;text-anchor:start;baseline-shift:baseline;color:#000000;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:4.0999999;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate;font-family:Sans;-inkscape-font-specification:Sans" />
      <path
         inkscape:connector-curvature="0"
         d="m 426.60797,806.57167 -9.23412,7.01505 29.54559,-4.2412 -27.32651,-12.00797 7.01504,9.23412 z"
         id="path4088"
         style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#ffffff;stroke-width:1.63999996pt;stroke-opacity:1" />
    </g>
    <g
       transform="matrix(1.1918385,0,0,1.1918385,-14.96633,-117.14909)"
       id="g4090">
      <path
         inkscape:connector-curvature="0"
         d="m 430.40625,824.67468 0.5,4.0625 12.1875,-1.46875 -0.5,-4.09375 z m -282.875,5.4375 0.84375,0.125 0.65625,-4.0625 -0.84375,-0.125 z m 258.4375,-2.625 0.46875,4.0625 12.21875,-1.375 -0.4375,-4.0625 z m -245.40625,4.625 4.6875,0.65625 0.0312,0 7.5,1 0.53125,-4.0625 -7.5,-1 0,0.0312 -4.65625,-0.6875 z m 225.25,-2.5625 -0.0312,0 -4.25,0.375 0.375,4.09375 4.28125,-0.40625 8,-0.78125 -0.40625,-4.0625 z m -18.8125,1.6875 -0.0312,0 -9.375,0.75 -0.53125,0.0312 0.3125,4.09375 0.53125,-0.0312 9.40625,-0.75 0,-0.0312 2.34375,-0.1875 -0.34375,-4.09375 z m -181.9375,3.9375 7,0.75 0.0312,0 5.21875,0.46875 0.375,-4.09375 -5.1875,-0.46875 -0.0312,0 -7,-0.71875 z m 153.84375,-1.90625 -0.0312,0 -6.3125,0.375 0.21875,4.09375 6.34375,-0.375 0.0312,0 5.9375,-0.375 -0.28125,-4.09375 z m -129.3125,4.125 0.5,0.0625 0.0312,0 9.03125,0.59375 0.0312,0 2.75,0.15625 0.21875,-4.09375 -2.71875,-0.15625 -0.0312,0 -8.96875,-0.59375 -0.0312,0 -0.46875,-0.0312 z M 311,834.70593 l -0.0312,0 -2.9375,0.0937 0.15625,4.09375 2.9375,-0.0937 0.0312,0 9.28125,-0.40625 0.0312,0 0.0312,0 -0.21875,-4.09375 -0.0312,0 z m -76.78125,4.09375 3.15625,0.15625 9.125,0.28125 0.0312,0 0.0312,0 0.0937,-4.09375 -0.0312,0 -9.09375,-0.28125 -3.125,-0.15625 z m 58.25,-3.5625 -9,0.15625 0.0625,4.125 9.03125,-0.15625 3.3125,-0.0937 -0.125,-4.09375 z m -33.59375,4.25 5.96875,0.0625 0.0312,0 6.34375,0.0312 0,-4.09375 -6.3125,-0.0312 -0.0312,0 -5.9375,-0.0625 z"
         id="path3890"
         style="font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-indent:0;text-align:start;text-decoration:none;line-height:normal;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;text-anchor:start;baseline-shift:baseline;color:#000000;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:4.09999990000000025;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate;font-family:Sans;-inkscape-font-specification:Sans" />
      <path
         inkscape:connector-curvature="0"
         d="m 164.03643,830.75802 9.43041,-6.74887 -29.65452,3.39693 26.97298,12.78235 -6.74887,-9.43041 z"
         id="path4096"
         style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:#ffffff;stroke-width:1.63999995999999992pt;stroke-opacity:1" />
      <text
         xml:space="preserve"
         style="font-size:13.42463779px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"
         x="220.38083"
         y="855.521"
         id="text11006"
         sodipodi:linespacing="125%"><tspan
           sodipodi:role="line"
           id="tspan11008"
           x="220.38083"
           y="855.521" /></text>
    </g>
    <text
       sodipodi:linespacing="125%"
       x="221.99048"
       y="788.92621"
       id="text3892-3"
       xml:space="preserve"
       style="font-size:16px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"><tspan
         x="221.99048"
         y="788.92621"
         id="tspan3894-4" /></text>
    <text
       sodipodi:linespacing="125%"
       x="228.33896"
       y="862.12244"
       id="text3896"
       xml:space="preserve"
       style="font-size:19.06941414px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"><tspan
         x="228.33896"
         y="862.12244"
         id="tspan3898">HMAC Signed Request</tspan></text>
    <text
       xml:space="preserve"
       style="font-size:13.58609581px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"
       x="19.063658"
       y="944.73999"
       id="text10142"
       sodipodi:linespacing="125%"><tspan
         sodipodi:role="line"
         id="tspan10144"
         x="19.063658"
         y="944.73999">client scopes = {</tspan><tspan
         sodipodi:role="line"
         x="19.063658"
         y="961.7226"
         id="tspan10148"
         style="font-weight:bold;-inkscape-font-specification:Monospace Bold">  create-task:worker-&#42;,</tspan><tspan
         sodipodi:role="line"
         x="19.063658"
         y="978.7052"
         id="tspan10150">  route:jonasfj.&#42;,</tspan><tspan
         sodipodi:role="line"
         x="19.063658"
         y="995.68787"
         id="tspan10219">  ...</tspan><tspan
         sodipodi:role="line"
         x="19.063658"
         y="1012.6705"
         id="tspan10146">}</tspan></text>
    <text
       xml:space="preserve"
       style="font-size:16.38615227px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"
       x="181.59737"
       y="836.50201"
       id="text10199"
       sodipodi:linespacing="125%"
       transform="scale(1.0153871,0.98484607)"><tspan
         sodipodi:role="line"
         id="tspan10201"
         x="181.59737"
         y="836.50201">(Creating a Task on worker-A)</tspan></text>
    <text
       xml:space="preserve"
       style="font-size:13.58609581px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Monospace;-inkscape-font-specification:Monospace"
       x="535.82971"
       y="958.31281"
       id="text10203"
       sodipodi:linespacing="125%"><tspan
         sodipodi:role="line"
         x="535.82971"
         y="958.31281"
         id="tspan10207">Required scopes = {</tspan><tspan
         sodipodi:role="line"
         x="535.82971"
         y="975.29541"
         id="tspan10215">  create-task:worker-A</tspan><tspan
         sodipodi:role="line"
         x="535.82971"
         y="992.27802"
         id="tspan10213">}</tspan></text>
    <g
       id="g10922"
       transform="matrix(1.1918385,0,0,1.1918385,-51.857472,-138.02684)">
      <path
         style="font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-indent:0;text-align:start;text-decoration:none;line-height:normal;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;text-anchor:start;baseline-shift:baseline;color:#000000;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:4.59961646999999996;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate;font-family:Sans;-inkscape-font-specification:Sans;stroke-miterlimit:4;stroke-dasharray:none"
         d="m 484,779.21875 4.59375,0 0,-4.59375 -4.59375,0 z m 0,9.21875 4.59375,0 0,-4.625 -4.59375,0 z m 0,9.1875 4.59375,0 0,-4.59375 -4.59375,0 z m 0,9.1875 4.59375,0 0,-4.59375 -4.59375,0 z m 0,9.21875 4.59375,0 0,-4.59375 -4.59375,0 z m 0,9.1875 4.59375,0 0,-4.59375 -4.59375,0 z m 0,9.21875 4.59375,0 0,-4.625 -4.59375,0 z m 0,9.1875 4.59375,0 0,-4.59375 -4.59375,0 z m 0,9.1875 4.59375,0 0,-4.59375 -4.59375,0 z m 0,9.21875 4.59375,0 0,-4.59375 -4.59375,0 z m 0,9.1875 4.59375,0 0,-4.59375 -4.59375,0 z m 0,9.21875 4.59375,0 0,-4.625 -4.59375,0 z m 0,9.1875 4.59375,0 0,-4.59375 -4.59375,0 z m 0,9.1875 4.59375,0 0,-4.59375 -4.59375,0 z m 0,9.21875 4.59375,0 0,-4.59375 -4.59375,0 z m 0,9.1875 4.59375,0 0,-4.59375 -4.59375,0 z m 0,9.21875 4.59375,0 0,-4.625 -4.59375,0 z m 0,9.1875 4.59375,0 0,-4.59375 -4.59375,0 z m 0,9.1875 4.59375,0 0,-4.59375 -4.59375,0 z m 0,9.21875 4.59375,0 0,-4.59375 -4.59375,0 z"
         id="path10221"
         inkscape:connector-curvature="0" />
    </g>
  </g>
</svg>

</center>