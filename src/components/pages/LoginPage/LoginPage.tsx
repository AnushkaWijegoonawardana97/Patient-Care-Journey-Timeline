import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Label } from "@/components/atoms/Label/Label";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { Chrome, Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { useAuth } from "@/hooks/useAuth";
import type { ApiError } from "@/types/api";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsync, isLoginLoading } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      await loginAsync({ email, password, rememberMe });
      navigate("/dashboard");
    } catch (error) {
      // Handle ApiError from the API interceptor
      const apiError = error as ApiError;
      const message =
        apiError?.message ||
        (error instanceof Error ? error.message : "Login failed. Please try again.");
      setErrorMessage(message);
    }
  };

  const formContent = (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Error Message */}
      {errorMessage && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
          {errorMessage}
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@rayahealth.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoginLoading}
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="at least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          disabled={isLoginLoading}
        />
      </div>

      {/* Remember Me and Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
            disabled={isLoginLoading}
          />
          <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
            Remember me
          </Label>
        </div>
        <Link to="#" className="text-sm text-secondary-success dark:text-secondary-accent hover:text-secondary-emphasis dark:hover:text-secondary-success">
          Forgot Password?
        </Link>
      </div>

      {/* Login Button */}
      <Button type="submit" className="w-full" disabled={isLoginLoading}>
        {isLoginLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          "Log In"
        )}
      </Button>

      {/* Google Sign In */}
      <Button
        type="button"
        variant="secondary"
        className="w-full flex items-center justify-center space-x-2"
        disabled={isLoginLoading}
      >
        <Chrome className="h-5 w-5" />
        <span>Sign in with Google</span>
      </Button>
    </form>
  );

  const footerLink = (
    <div className="text-center text-sm">
      <span className="text-text-secondary dark:text-muted-foreground">Not registered yet? </span>
      <Link
        to="/register"
        className="text-secondary-success dark:text-secondary-accent hover:text-secondary-emphasis dark:hover:text-secondary-success font-medium"
      >
        Create an Account
      </Link>
    </div>
  );

  return (
    <AuthLayout
      backgroundImageUrl="/login-page-image.jpg"
      title="Welcome Back!"
      description="Sign in to your Raya Health account and embark on your journey to holistic health."
      formContent={formContent}
      footerLink={footerLink}
    />
  );
};

export default LoginPage;
