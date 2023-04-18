import style from './themeToggle.module.scss';
import cn from 'classnames';
import { type FC, useEffect, useState } from 'react';
import { THEME_LIST, ThemeNames } from './data';
import { type toggleThemeArgs } from './typings';

export const ThemeToggle: FC = () => {
  const [themeName, setThemeName] = useState<string | null>(null);

  const getClassName = (currentThemeName: string): string => {
    return cn(themeName === currentThemeName ? 'themetoggle__icon_selected' :'themetoggle__icon', 
  );
  };

  /** Переключатель темы. */
  const toggleTheme = ({ currentThemeName }: toggleThemeArgs) => {
    const themeNameIsValid = currentThemeName && Object.values(ThemeNames).includes(currentThemeName as ThemeNames);

    if (!themeNameIsValid) {
      return;
    }

    setThemeName(currentThemeName);
    localStorage.setItem('theme', currentThemeName);
    document.documentElement.dataset.theme = currentThemeName;
  };

  useEffect(() => {
    const defaultTheme = document.documentElement.dataset.theme;

    if (!themeName) {
      const initialThemeName = localStorage.getItem('theme') ?? defaultTheme;

      if (initialThemeName) {
        setThemeName(initialThemeName);
        document.documentElement.dataset.theme = initialThemeName;
      }
    }
  }, []);

  const themeList = THEME_LIST.map(theme => (
    <svg
      onClick={() => {
        toggleTheme({ currentThemeName: theme.name });
      }}
      key={theme.name}
      className={style[getClassName(theme.name)]} 
      data-testid={theme.name}
      viewBox={theme.viewBox}
      width="25px">
      <path d={theme.svgPath} ></path>
    </svg>
  ));

  return (
    <div className={style.themetoggle__wrapper}>
      <div data-testid="themetoggle" className={style.themetoggle} title="Переключатель темы">
        {themeList}
      </div>
    </div>
  );
};

export default ThemeToggle;