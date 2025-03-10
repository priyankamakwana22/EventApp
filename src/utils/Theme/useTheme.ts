// useTheme.ts
import {useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {themes} from './theme';
import {Theme} from './themeTypes';
import {StorageKeys} from '../storageKeys';

const STORAGE_KEY = 'theme';

export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(
    themes[systemColorScheme as 'light' | 'dark'] || themes.light,
  );

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(StorageKeys.THEME);
        if (savedTheme) {
          setTheme(themes[savedTheme as 'light' | 'dark']);
        } else {
          setTheme(themes[systemColorScheme as 'light' | 'dark']);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === themes.light ? 'dark' : 'light';
    setTheme(themes[newTheme]);
    await AsyncStorage.setItem(StorageKeys.THEME, newTheme);
  };

  return {theme, toggleTheme};
};
