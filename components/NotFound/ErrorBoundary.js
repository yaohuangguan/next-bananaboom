import React from "react";
import Link from "next/link";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  };
  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return (
        <div className="d-flex justify-content-center container">
          <h1>
            页面发生了错误，请返回主页。 Something went wrong. Please click{" "}
            <Link href="/">
              <a> TAKE ME BACK </a>
            </Link>{" "}
          </h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
