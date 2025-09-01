
import type React from 'react';

export interface FlexItemType {
  id: number;
  styles: React.CSSProperties;
}

export type FlexContainerStyle = React.CSSProperties;

export enum ControlTab {
    Container = 'Container',
    Items = 'Items'
}
