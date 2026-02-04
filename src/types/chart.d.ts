// Temporary type declarations until packages are installed
// Run: npm install react-chartjs-2 chart.js
// Then you can remove this file

declare module 'react-chartjs-2' {
  import { Component, ReactNode } from 'react';
  
  export interface ChartProps {
    data: any;
    options?: any;
    type?: string;
    redraw?: boolean;
    getDatasetAtEvent?: (event: any) => void;
    getElementAtEvent?: (event: any) => void;
    getElementsAtEvent?: (event: any) => void;
    plugins?: any[];
    updateMode?: 'active' | 'hide' | 'show' | 'none' | 'default' | 'resize';
    fallbackContent?: ReactNode;
  }
  
  export class Line extends Component<ChartProps> {}
  export class Bar extends Component<ChartProps> {}
  export class Pie extends Component<ChartProps> {}
  export class Doughnut extends Component<ChartProps> {}
  export class Radar extends Component<ChartProps> {}
  export class PolarArea extends Component<ChartProps> {}
  export class Bubble extends Component<ChartProps> {}
  export class Scatter extends Component<ChartProps> {}
}

declare module 'chart.js' {
  export interface ChartOptions {
    responsive?: boolean;
    maintainAspectRatio?: boolean;
    plugins?: any;
    scales?: any;
    [key: string]: any;
  }
  
  // Chart instance interface
  interface IChart {
    destroy(): void;
    update(mode?: string): void;
    render(): void;
    stop(): void;
    resize(): void;
    clear(): void;
    toBase64Image(): string;
    generateLegend(): any;
    getElementAtEvent(e: any): any;
    getElementsAtEvent(e: any): any[];
    getDatasetAtEvent(e: any): any;
  }
  
  // Chart class with static methods
  export class Chart {
    constructor(ctx: any, config: any);
    destroy(): void;
    update(mode?: string): void;
    render(): void;
    stop(): void;
    resize(): void;
    clear(): void;
    toBase64Image(): string;
    generateLegend(): any;
    getElementAtEvent(e: any): any;
    getElementsAtEvent(e: any): any[];
    getDatasetAtEvent(e: any): any;
  }
  
  // Add static methods via namespace merge
  export namespace Chart {
    export function register(...components: any[]): void;
    export function unregister(...components: any[]): void;
  }
  
  export const CategoryScale: any;
  export const LinearScale: any;
  export const LogarithmicScale: any;
  export const RadialLinearScale: any;
  export const TimeScale: any;
  export const TimeSeriesScale: any;
  export const PointElement: any;
  export const LineElement: any;
  export const BarElement: any;
  export const ArcElement: any;
  export const Title: any;
  export const Tooltip: any;
  export const Legend: any;
  export const Filler: any;
  export const SubTitle: any;
}
