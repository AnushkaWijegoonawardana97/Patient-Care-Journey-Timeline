import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Label } from "@/components/atoms/Label/Label";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { Chrome } from "lucide-react";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const formContent = (
    <form className="space-y-6" onSubmit={handleSubmit}>
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
        />
      </div>

      {/* Remember Me and Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
          />
          <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
            Remember me
          </Label>
        </div>
        <Link to="#" className="text-sm text-secondary-success hover:text-secondary-emphasis">
          Forgot Password?
        </Link>
      </div>

      {/* Login Button */}
      <Button type="submit" className="w-full">
        Log In
      </Button>

      {/* Google Sign In */}
      <Button
        type="button"
        variant="secondary"
        className="w-full flex items-center justify-center space-x-2"
      >
        <Chrome className="h-5 w-5" />
        <span>Sign in with Google</span>
      </Button>
    </form>
  );

  const footerLink = (
    <div className="text-center text-sm">
      <span className="text-text-secondary">Not registered yet? </span>
      <Link
        to="/register"
        className="text-secondary-success hover:text-secondary-emphasis font-medium"
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
