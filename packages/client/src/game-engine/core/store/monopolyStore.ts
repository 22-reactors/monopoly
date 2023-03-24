import { localStorageService } from '../../../service/store/storage';
import { MonopolyConfig, userStartProps } from '../../config/monopolyConfig';
import { IUserConfig } from '../chip/chips';
import { TCardSetting } from '../types/card';

export function getUserConfigStore(): IUserConfig[] {
  return localStorageService().get('userConfig');
}

export function getCardsStore(): TCardSetting[] {
  return localStorageService().get('cards') ?? [];
}

export function initMonopolyStore(userConfig: IUserConfig[]): void {
  updateUserConfigStore(userConfig);
  updateCardsStore(MonopolyConfig.cards);
}

export function reinitMonopolyStore(): void {
  const userConfig: IUserConfig[] = getUserConfigStore();

  //Сбасываем прогрессы игроков до стартовых
  userConfig.forEach(user => {
    user.chipPosition = userStartProps.startChipPosition;
    user.userMoney = userStartProps.startMoney;
    user.score = userStartProps.startScore;
  });

  updateUserConfigStore(userConfig);
  updateCardsStore(MonopolyConfig.cards);
}

export function updateUserConfigStore(newState: IUserConfig[]): void {
  localStorageService().set('userConfig', newState);
}

export function updateCardsStore(newState: TCardSetting[]): void {
  localStorageService().set('cards', newState);
}
