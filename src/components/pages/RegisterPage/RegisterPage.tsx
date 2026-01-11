import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Label } from "@/components/atoms/Label/Label";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { Chrome } from "lucide-react";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const formContent = (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

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

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
        />
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(checked === true)}
          className="mt-1"
        />
        <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
          I agree to the{" "}
          <Link to="#" className="text-secondary-success hover:underline">
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link to="#" className="text-secondary-success hover:underline">
            Privacy Policy
          </Link>
        </Label>
      </div>

      {/* Create Account Button */}
      <Button type="submit" className="w-full" disabled={!termsAccepted}>
        Create Account
      </Button>

      {/* Google Sign In */}
      <Button
        type="button"
        variant="secondary"
        className="w-full flex items-center justify-center space-x-2"
      >
        <Chrome className="h-5 w-5" />
        <span>Sign up with Google</span>
      </Button>
    </form>
  );

  const footerLink = (
    <div className="text-center text-sm">
      <span className="text-text-secondary">Already have an account? </span>
      <Link to="/" className="text-secondary-success hover:text-secondary-emphasis font-medium">
        Log In
      </Link>
    </div>
  );

  return (
    <AuthLayout
      backgroundImageUrl="/register-page-image.jpg"
      title="Create Your Account"
      description="Join Raya Health and start your journey to holistic wellness."
      formContent={formContent}
      footerLink={footerLink}
    />
  );
};

export default RegisterPage;
