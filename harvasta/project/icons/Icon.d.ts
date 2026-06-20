import * as React from 'react';
export type IconName =
  | "AlignCenterHorizontalSimple"
  | "Bathtub"
  | "Campfire"
  | "CarSimple"
  | "CheckCircle"
  | "Cigarette"
  | "CirclesFour"
  | "Copy"
  | "DropSimple"
  | "HouseSimple"
  | "Lightbulb"
  | "Mountains"
  | "Rows"
  | "Tree"
  | "Vibrate"
  | "WashingMachine";
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
}
export declare const Icon: React.FC<IconProps>;
export default Icon;
