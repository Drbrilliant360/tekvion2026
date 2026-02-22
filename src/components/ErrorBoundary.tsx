import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  lang: string;
}

// Simple static translations for error boundary (can't use hooks in class components)
const strings: Record<string, Record<string, string>> = {
  en: {
    title: "Something went wrong",
    message: "An unexpected error occurred. Please try again.",
    errorDetails: "Error details",
    tryAgain: "Try Again",
    goHome: "Go Home",
  },
  ar: {
    title: "حدث خطأ ما",
    message: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
    errorDetails: "تفاصيل الخطأ",
    tryAgain: "حاول مرة أخرى",
    goHome: "الصفحة الرئيسية",
  },
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const lang = localStorage.getItem("i18nextLng") || "en";
    this.state = { hasError: false, lang: lang.startsWith("ar") ? "ar" : "en" };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    const lang = localStorage.getItem("i18nextLng") || "en";
    return { hasError: true, error, lang: lang.startsWith("ar") ? "ar" : "en" };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      const s = strings[this.state.lang] || strings.en;
      const isRtl = this.state.lang === "ar";

      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4" dir={isRtl ? "rtl" : "ltr"}>
          <div className="text-center max-w-md">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-3xl font-bold font-display text-foreground mb-3">{s.title}</h1>
            <p className="text-muted-foreground mb-2">{s.message}</p>
            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                  {s.errorDetails}
                </summary>
                <pre className="mt-2 p-3 bg-muted rounded-lg text-xs text-muted-foreground overflow-auto max-h-32">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                {s.tryAgain}
              </button>
              <button
                onClick={() => window.location.href = "/"}
                className="px-6 py-3 bg-muted text-foreground font-semibold rounded-full hover:bg-muted/80 transition-colors text-sm"
              >
                {s.goHome}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
