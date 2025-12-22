import * as Anime4KJS from '../Anime4KJS/src';
import type Anime4KShader from '../Anime4KJS/src/glsl/shader';

export type Anime4KPreset = (new (gl: WebGLRenderingContext) => Anime4KShader)[];

export const PRESETS: Record<string, Anime4KPreset> = {
  Disabled: Anime4KJS.ANIME4KJS_EMPTY,
  'Mode A Fast': Anime4KJS.ANIME4K_LOWEREND_MODE_A_FAST,
  'Mode B Fast': Anime4KJS.ANIME4K_LOWEREND_MODE_B_FAST,
  'Mode C Fast': Anime4KJS.ANIME4K_LOWEREND_MODE_C_FAST,
  'Mode A': Anime4KJS.ANIME4K_LOWEREND_MODE_A,
  'Mode B': Anime4KJS.ANIME4K_LOWEREND_MODE_B,
  'Mode C': Anime4KJS.ANIME4K_LOWEREND_MODE_C,
  'Mode A+A Fast': Anime4KJS.ANIME4K_HIGHEREND_MODE_A_FAST,
  'Mode B+B Fast': Anime4KJS.ANIME4K_HIGHEREND_MODE_B_FAST,
  'Mode C+A Fast': Anime4KJS.ANIME4K_HIGHEREND_MODE_C_FAST,
  'Mode A+A': Anime4KJS.ANIME4K_HIGHEREND_MODE_A,
  'Mode B+B': Anime4KJS.ANIME4K_HIGHEREND_MODE_B,
  'Mode C+A': Anime4KJS.ANIME4K_HIGHEREND_MODE_C,
  'Mode Simple S': Anime4KJS.ANIME4KJS_SIMPLE_S_2X,
  'Mode Simple M': Anime4KJS.ANIME4KJS_SIMPLE_M_2X,
  'Mode Simple L': Anime4KJS.ANIME4KJS_SIMPLE_L_2X,
  'Mode Simple VL': Anime4KJS.ANIME4KJS_SIMPLE_VL_2X,
  'Mode Simple UL': Anime4KJS.ANIME4KJS_SIMPLE_UL_2X,
};
