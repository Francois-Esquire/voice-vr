import AFRAME from 'aframe';
import React from 'react';

import { vertex as vertexShader, fragment as fragmentShader } from './shaders';

const {
  THREE: {
    ShaderMaterial,
    DataTexture,
    RGBAFormat,
    NearestFilter,
    DoubleSide,
    // UniformsUtils,
    // ShaderLib,
  },
} = AFRAME;

export default function useVoiceComponent() {
  React.useEffect(() => {
    AFRAME.registerComponent('voice', {
      schema: {
        id: {
          type: 'string',
          default: '#voice-texture-map',
        },
        peak: {
          type: 'number',
          default: 5.0,
        },
        depth: {
          type: 'number',
          default: -25.0,
        },
        reverb: {
          type: 'number',
          default: 1.0,
        },
        streaming: {
          type: 'boolean',
          default: false,
        },
      },
      init() {
        const mesh = this.el.getObject3D('mesh');

        this.canvas = document.getElementById(this.data.id);
        this.ctx = this.canvas.getContext('2d');

        const data = this.getImageData();
        const textureSize = Math.sqrt(data.length / 4);

        this.texture = new DataTexture(
          new Uint8Array(data.length),
          textureSize,
          textureSize,
          RGBAFormat,
        );
        this.texture.magFilter = NearestFilter;
        this.texture.needsUpdate = true;

        this.material = new ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            texture: { type: 't', value: this.texture },
          },
          // lights: true,
          // uniforms: UniformsUtils.merge([
          //   ShaderLib.standard.uniforms,
          //   {
          //     texture: { type: 't', value: this.texture },
          //   },
          // ]),
        });
        this.material.side = DoubleSide;
        mesh.material = this.material;
      },
      tick() {
        this.update();
      },
      update() {
        if (this.data.streaming) {
          const data = this.getImageData();

          data.forEach((val, i) => {
            this.texture.image.data[i] = val;
          });

          this.texture.needsUpdate = true;
        }
      },
      getImageData() {
        const { data } = this.ctx.getImageData(
          0,
          0,
          this.canvas.width,
          this.canvas.height,
        );

        return data;
      },
    });
  }, []);
}
