import Logger from '../utils/Logger';
import GwClasses from '../data/models/GwClass';

export class ColorThemes {

    static GW_CLASS_THEMES = {
      [GwClasses.PLACEHOLDER]: {
        primary: "#222222",
        soft:    "#f2f2f2",
        border:  "#1a1a1a",
        dark:    "#111111"
      },

      [GwClasses.Warrior]: {
        primary: "#b08968",
        soft:    "#d4a373",
        border:  "#8c6f4e",
        dark:    "#7a5c3d"
      },

      [GwClasses.Ranger]: {
        primary: "#7cb518",
        soft:    "#a3e635",
        border:  "#5a8c13",
        dark:    "#466d0f"
      },

      [GwClasses.Monk]: {
        primary: "#3b82f6",
        soft:    "#60a5fa",
        border:  "#2f66c4",
        dark:    "#264fa3"
      },

      [GwClasses.Necromancer]: {
        primary: "#133a2f",
        soft:    "#1e4e3e",
        border:  "#0f2c23",
        dark:    "#0b1f18"
      },

      [GwClasses.Mesmer]: {
        primary: "#8b5cf6",
        soft:    "#a78bfa",
        border:  "#6b39d1",
        dark:    "#5529b0"
      },

      [GwClasses.Elementalist]: {
        primary: "#ef4444",
        soft:    "#f87171",
        border:  "#c53030",
        dark:    "#9b1c1c"
      },

      [GwClasses.Assassin]: {
        primary: "#b08968",
        soft:    "#d4a373",
        border:  "#8c6f4e",
        dark:    "#7a5c3d"
      },

      [GwClasses.Ritualist]: {
        primary: "#14b8a6",
        soft:    "#5eead4",
        border:  "#0f8e82",
        dark:    "#0b6b62"
      },

      [GwClasses.Paragon]: {
        primary: "#d2b48c",
        soft:    "#e6cfae",
        border:  "#b89770",
        dark:    "#9e805c"
      },

      [GwClasses.Dervish]: {
        primary: "#c19a6b",
        soft:    "#dabfa5",
        border:  "#9e7c52",
        dark:    "#856545"
      }
    };

  static GetGwClassColorTheme(){

  }
}

export default ColorThemes;