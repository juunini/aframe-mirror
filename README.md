<div align="center">
  <h1>aframe-mirror</h1>

  <img src="https://github.com/juunini/aframe-mirror/blob/main/sample.png" alt="sample image" />
</div>

## Introduce

The mirror component for [A-Frame](https://aframe.io/).  
You can use it to create a reflective object.  

Support `aframe@1.3.0`

## API

|Property|Description|type|Default Value|
|-|-|-|-|
|**color**|Mixed with given color|color(string)|`#7f7f7f`|
|**textureWidth**|Width of video (in pixels), if defining a video texture width|number|`window.innerWidth * window.devicePixelRatio`|
|**textureHeight**|Height of video (in pixels), if defining a video texture height|number|`window.innerHeight * window.devicePixelRatio`|

## Install

```sh
# npm
$ npm install aframe-mirror

# yarn
$ yarn add aframe-mirror

# pnpm
$ pnpm install aframe-mirror
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/aframe-mirror@latest/index.js"></script>
```

## Usage

```tsx
import 'aframe';
import 'aframe-mirror';
import { Scene, Box, Plane } from '@belivvr/aframe-react';

export default function App() {
  return (
    <Scene>
      <Box
        position={{ x: -1, y: 0.5, z: -3 }}
        rotation={{ x: 0, y: 45, z: 0 }}
        color="blue"
      />

      <Plane
        position={{ x: -1, y: 0.5, z: -8 }}
        scale={{ x: 10, y: 10, z: 10 }}
        mirror
      />
    </Scene>
  );
}
```

or

```html
<script src="https://aframe.io/releases/1.3.0/aframe.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/aframe-mirror@latest/index.js"></script>

<a-scene>
  <a-box position="-1 0.5 -3" rotation="0 45 0" color="blue"></a-box>
  <a-plane position="-1 0.5 -8" scale="10 10 10" mirror></a-plane>
</a-scene>
```
