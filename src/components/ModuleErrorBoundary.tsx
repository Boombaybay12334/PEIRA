import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ModuleErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <p role="alert" className="module-island__error">
          The interactive view could not load. The text and table version remains available below.
        </p>
      );
    }

    return this.props.children;
  }
}
