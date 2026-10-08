import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('ErrorBoundary caught a component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="w-full h-full flex items-center justify-center p-6 bg-slate-950/60 rounded-2xl border border-cyan-500/20 text-center">
          <div className="space-y-2">
            <div className="w-8 h-8 mx-auto rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-400">
              <span className="text-cyan-400 text-xs font-mono">3D</span>
            </div>
            <p className="font-mono text-xs text-cyan-300">3D ACCELERATION FALLBACK</p>
            <p className="font-mono text-[10px] text-slate-400">Rendering high-performance adaptive interface</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
