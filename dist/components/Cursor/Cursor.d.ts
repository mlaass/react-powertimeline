import { default as React } from 'react';

export interface CursorProps {
    /** Whether the cursor is visible */
    visible: boolean;
    /** X position in pixels */
    x: number;
    /** Height of the timeline */
    height: number;
    /** Optional styling */
    style?: {
        color?: string;
        width?: number;
        opacity?: number;
        dashArray?: string;
    };
}
export declare const Cursor: React.FC<CursorProps>;
export default Cursor;
//# sourceMappingURL=Cursor.d.ts.map