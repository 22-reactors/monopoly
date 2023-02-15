import { CornerCard, TCornerCard } from './cards/cornerCard'
import { MainCard, TMainCard } from './cards/commonCard/mainCard'
import { NoPriceCard, TNoPriceCard } from './cards/noPriceCard'
import { TWithImageCard, WithImageCard } from './cards/withImageCard'

export type TCard = CornerCard | NoPriceCard | MainCard | WithImageCard
export type TCardInitProps =
  | TCornerCard
  | TNoPriceCard
  | TWithImageCard
  | TMainCard
export type TCardInit = (props: TCardInitProps) => Promise<TCard> | TCard
export type TAssetCard = MainCard | WithImageCard
