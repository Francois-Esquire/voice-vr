import { glsl } from '../tools';

export const vertex = glsl`
varying vec2 vUv;

uniform sampler2D texture;

void main() {

  vUv = uv;

  vec3 sound = texture2D(texture, uv).rgb;

  vec3 newPosition = position + (normal * clamp(sound, 0., 1.));

  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

}
`;

export const fragment = glsl`
varying vec2 vUv;

void main() {

  vec3 color = mix(vec3( vUv, 1. ), vec3(1), .1 );
  gl_FragColor = vec4( color.rgb, 1.0 );

}
`;
