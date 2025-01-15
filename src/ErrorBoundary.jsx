import React from "react";

// Error Boundary Component with Reset
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "red", textAlign: "center" }}>
          <h2>Something went wrong!</h2>
          <p>{this.state.error.toString()}</p>
          <button onClick={this.resetErrorBoundary} style={buttonStyle}>
            Reset
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#333",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ErrorBoundary;
