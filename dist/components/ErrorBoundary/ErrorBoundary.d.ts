import { default as React, Component, ErrorInfo, ReactNode } from 'react';

export interface ErrorBoundaryProps {
    /** Child components to wrap */
    children: ReactNode;
    /** Custom fallback component to render on error */
    fallback?: ReactNode;
    /** Callback function called when an error occurs */
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    /** Whether to show detailed error information in development */
    showDetails?: boolean;
}
export interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}
export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState>;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    handleRetry: () => void;
    render(): string | number | boolean | import("react/jsx-runtime").JSX.Element | Iterable<React.ReactNode>;
}
export default ErrorBoundary;
//# sourceMappingURL=ErrorBoundary.d.ts.map