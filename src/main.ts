import * as Anime4KJS from '../Anime4KJS/src';

interface Anime4KPreset {
  label: string;
  obj: object;
}

const PRESETS: Anime4KPreset[] = [
  { label: 'Disabled', obj: Anime4KJS.ANIME4KJS_EMPTY },
  { label: 'Mode A Fast', obj: Anime4KJS.ANIME4K_LOWEREND_MODE_A_FAST },
  { label: 'Mode B Fast', obj: Anime4KJS.ANIME4K_LOWEREND_MODE_B_FAST },
  { label: 'Mode C Fast', obj: Anime4KJS.ANIME4K_LOWEREND_MODE_C_FAST },
  { label: 'Mode A', obj: Anime4KJS.ANIME4K_LOWEREND_MODE_A },
  { label: 'Mode B', obj: Anime4KJS.ANIME4K_LOWEREND_MODE_B },
  { label: 'Mode C', obj: Anime4KJS.ANIME4K_LOWEREND_MODE_C },
  { label: 'Mode A+A Fast', obj: Anime4KJS.ANIME4K_HIGHEREND_MODE_A_FAST },
  { label: 'Mode B+B Fast', obj: Anime4KJS.ANIME4K_HIGHEREND_MODE_B_FAST },
  { label: 'Mode C+A Fast', obj: Anime4KJS.ANIME4K_HIGHEREND_MODE_C_FAST },
  { label: 'Mode A+A', obj: Anime4KJS.ANIME4K_HIGHEREND_MODE_A },
  { label: 'Mode B+B', obj: Anime4KJS.ANIME4K_HIGHEREND_MODE_B },
  { label: 'Mode C+A', obj: Anime4KJS.ANIME4K_HIGHEREND_MODE_C },
  { label: 'Mode Simple S', obj: Anime4KJS.ANIME4KJS_SIMPLE_S_2X },
  { label: 'Mode Simple M', obj: Anime4KJS.ANIME4KJS_SIMPLE_M_2X },
  { label: 'Mode Simple L', obj: Anime4KJS.ANIME4KJS_SIMPLE_L_2X },
  { label: 'Mode Simple VL', obj: Anime4KJS.ANIME4KJS_SIMPLE_VL_2X },
  { label: 'Mode Simple UL', obj: Anime4KJS.ANIME4KJS_SIMPLE_UL_2X },
];

let canvas: HTMLCanvasElement | undefined;
let upscaler: Anime4KJS.VideoUpscaler | undefined;

function attachCanvas(video: HTMLVideoElement): void {
  if (canvas && upscaler) return;

  canvas = document.createElement('canvas');
  canvas.classList.add('htmlvideoplayer');
  canvas.style.height = 'auto';
  // move the video out of view instead of disabling it because otherwise the subtitles are automatically turned off
  video.style.position = 'absolute';
  video.style.left = '-9999px';
  video.before(canvas);

  upscaler = new Anime4KJS.VideoUpscaler(30, Anime4KJS.ANIME4K_LOWEREND_MODE_A_FAST);
  upscaler.attachVideo(video, canvas);
}

function upscalerStart(): void {
  console.log('anime4k: start');
  upscaler?.start();
}

function upscalerStop(): void {
  console.log('anime4k: stop');
  upscaler?.stop();
}

function upscalerPause(): void {
  console.log('anime4k: pause');
  upscaler?.stop();
  if (canvas) canvas.style.visibility = 'visible';
}

function upscalerLoadFrame(): void {
  console.log('anime4k: loadframe');
  upscalerStart();
  upscalerPause();
}

function isVideoPlayer(element: HTMLElement | EventTarget | null | undefined): boolean {
  return element instanceof HTMLVideoElement && element.classList.contains('htmlvideoplayer');
}

function isVideoPlaying(video: HTMLVideoElement) {
  return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
}

function init(): void {
  if (!Anime4KJS.VideoUpscaler.isSupported()) {
    console.error('Video upscaling is not supported!');
    return;
  }

  document.addEventListener(
    'play',
    (e) => {
      const element = e.target;
      if (element instanceof HTMLVideoElement && element.classList.contains('htmlvideoplayer')) {
        attachCanvas(element);
        upscalerStart();
      }
    },
    true,
  );

  document.addEventListener(
    'pause',
    (e) => {
      if (isVideoPlayer(e.target)) {
        upscalerPause();
      }
    },
    true,
  );

  document.addEventListener(
    'ended',
    (e) => {
      if (isVideoPlayer(e.target)) {
        upscalerStop();
      }
    },
    true,
  );

  document.addEventListener(
    'seeking',
    (e) => {
      if (isVideoPlayer(e.target)) {
        upscalerPause();
      }
    },
    true,
  );

  document.addEventListener(
    'seeked',
    (e) => {
      if (isVideoPlayer(e.target)) {
        const video = e.target as HTMLVideoElement;
        if (isVideoPlaying(video)) {
          upscalerStart();
        } else {
          upscalerLoadFrame();
        }
      }
    },
    true,
  );
}

init();
