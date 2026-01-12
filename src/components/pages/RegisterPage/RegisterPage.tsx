import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Label } from "@/components/atoms/Label/Label";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { Chrome, Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { useAuth } from "@/hooks/useAuth";

export const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { registerAsync, isRegisterLoading } = useAuth();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage(t("auth.register.passwordsDoNotMatch"));
      return;
    }

    try {
      await registerAsync({ name, email, password });
      navigate("/dashboard");
    } catch (error) {
      const message = error instanceof Error ? error.message : t("auth.register.registrationFailed");
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

      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">{t("auth.register.fullName")}</Label>
        <Input
          id="name"
          type="text"
          placeholder={t("auth.register.namePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isRegisterLoading}
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">{t("auth.register.email")}</Label>
        <Input
          id="email"
          type="email"
          placeholder={t("auth.register.emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isRegisterLoading}
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password">{t("auth.register.password")}</Label>
        <Input
          id="password"
          type="password"
          placeholder={t("auth.register.passwordPlaceholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          disabled={isRegisterLoading}
        />
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t("auth.register.confirmPassword")}</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder={t("auth.register.passwordPlaceholder")}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
          disabled={isRegisterLoading}
        />
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(checked === true)}
          className="mt-1"
          disabled={isRegisterLoading}
        />
        <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
          {t("auth.register.acceptTerms")}
        </Label>
      </div>

      {/* Create Account Button */}
      <Button type="submit" className="w-full" disabled={!termsAccepted || isRegisterLoading}>
        {isRegisterLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("common.loading")}
          </>
        ) : (
          t("auth.register.signUp")
        )}
      </Button>

      {/* Google Sign In */}
      <Button
        type="button"
        variant="secondary"
        className="w-full flex items-center justify-center space-x-2"
        disabled={isRegisterLoading}
      >
        <Chrome className="h-5 w-5" />
        <span>{t("auth.register.signUpWithGoogle")}</span>
      </Button>
    </form>
  );

  const footerLink = (
    <div className="text-center text-sm">
      <span className="text-text-secondary dark:text-muted-foreground">{t("auth.register.haveAccount")} </span>
      <Link to="/" className="text-secondary-success dark:text-secondary-accent hover:text-secondary-emphasis dark:hover:text-secondary-success font-medium">
        {t("auth.register.signIn")}
      </Link>
    </div>
  );

  return (
    <AuthLayout
      backgroundImageUrl="/register-page-image.jpg"
      title={t("auth.register.title")}
      description={t("auth.register.subtitle")}
      formContent={formContent}
      footerLink={footerLink}
    />
  );
};

export default RegisterPage;
