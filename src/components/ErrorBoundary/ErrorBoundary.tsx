/**
 * ErrorBoundary Component
 * 
 * React error boundary for graceful error handling in PowerTimeline components.
 * Provides fallback UI and error reporting capabilities.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';

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

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Call the onError callback if provided
    this.props.onError?.(error, errorInfo);

    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('PowerTimeline Error Boundary caught an error:', error);
      console.error('Error Info:', errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div
          style={{
            padding: '20px',
            border: '2px solid #ff6b6b',
            borderRadius: '8px',
            backgroundColor: '#fff5f5',
            color: '#c92a2a',
            fontFamily: 'system-ui, sans-serif',
          }}
          role="alert"
          aria-live="assertive"
        >
          <h3 style={{ margin: '0 0 12px 0', fontSize: '18px' }}>
            ⚠️ Timeline Error
          </h3>
          
          <p style={{ margin: '0 0 16px 0', fontSize: '14px' }}>
            Something went wrong while rendering the timeline. This could be due to:
          </p>
          
          <ul style={{ margin: '0 0 16px 20px', fontSize: '14px' }}>
            <li>Invalid data format or missing required properties</li>
            <li>Incompatible time ranges or malformed dates</li>
            <li>Browser compatibility issues with SVG rendering</li>
            <li>Memory constraints with large datasets</li>
          </ul>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={this.handleRetry}
              style={{
                padding: '8px 16px',
                backgroundColor: '#228be6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Try Again
            </button>
            
            {this.props.showDetails && this.state.error && (
              <details style={{ fontSize: '12px' }}>
                <summary style={{ cursor: 'pointer', color: '#868e96' }}>
                  Show Error Details
                </summary>
                <pre
                  style={{
                    marginTop: '8px',
                    padding: '8px',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    overflow: 'auto',
                    maxHeight: '200px',
                    fontSize: '11px',
                  }}
                >
                  {this.state.error.message}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
