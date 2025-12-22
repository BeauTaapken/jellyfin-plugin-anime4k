import { PRESETS } from '../presets';
import { getSelectedPreset, setPreset } from '../upscaler';
import actionsheet from './action-sheet';
import { BaseTemplate } from './base-template';

export class PlayerButtonTemplate extends BaseTemplate {
  public render(): Element | undefined {
    const el = super.render();
    if (!el) return;

    el.addEventListener('click', () => {
      const selectedPreset = getSelectedPreset();
      const menuItems = Object.entries(PRESETS).map(([label, preset]) => ({
        id: label,
        name: label,
        selected: preset === selectedPreset,
      }));

      actionsheet.show({
        title: 'Presets',
        items: menuItems,
        callback: (preset) => {
          setPreset(PRESETS[preset]);
        },
      });
    });

    return el;
  }

  getTemplate(): string {
    return `
      <button id="anime4kButton" class="autoSize paper-icon-button-light" is="paper-icon-button-light" title="Anime4K">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             viewBox="0 0 24 24">
          <path fill="currentColor"
                d="M11 9h2v2h-2zm-2 2h2v2H9zm4 0h2v2h-2zm2-2h2v2h-2zM7 9h2v2H7zm12-6H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M9 18H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2zm2-7h-2v2h2v2h-2v-2h-2v2h-2v-2h-2v2H9v-2H7v2H5v-2h2v-2H5V5h14z">
          </path>
        </svg>
      </button>
    `;
  }
}
