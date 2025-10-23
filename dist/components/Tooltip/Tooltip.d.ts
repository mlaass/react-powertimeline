import { default as React } from 'react';
import { Item } from '../../types';

export interface TooltipProps {
    /** Whether the tooltip is visible */
    visible: boolean;
    /** X position in pixels */
    x: number;
    /** Y position in pixels */
    y: number;
    /** The timeline item being hovered */
    item: Item | null;
    /** Additional context data */
    context?: {
        value?: number;
        timestamp?: Date;
        [key: string]: any;
    };
}
export declare const Tooltip: React.FC<TooltipProps>;
export default Tooltip;
//# sourceMappingURL=Tooltip.d.ts.map