import { localStorageService } from '../../../service/store/storage';
import { MonopolyConfig } from '../../config/monopolyConfig';
import { IUserConfig } from '../chip/chips';
import { TCardSetting } from '../types/card';

export function getUserConfigStore(): IUserConfig[] {
  return localStorageService().get('userConfig');
}

export function getCardsStore(): TCardSetting[] {
  return localStorageService().get('cards');
}

export function initMonopolyStore(): void {
  if (localStorageService().get('userConfig') === null) {
    updateUserConfigStore(MonopolyConfig.userConfig);
  }

  if (localStorageService().get('cards') === null) {
    updateCardsStore(MonopolyConfig.cards);
  }
}

export function reinitMonopolyStore(): void {
  updateUserConfigStore(MonopolyConfig.userConfig);
  updateCardsStore(MonopolyConfig.cards);
}

export function updateUserConfigStore(newState: IUserConfig[]): void {
  localStorageService().set('userConfig', newState);
}

export function updateCardsStore(newState: TCardSetting[]): void {
  localStorageService().set('cards', newState);
}
