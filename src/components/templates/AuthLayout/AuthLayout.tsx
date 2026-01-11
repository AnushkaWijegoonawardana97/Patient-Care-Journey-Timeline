import * as React from "react";

export interface AuthLayoutProps {
  /** Background image URL for mobile view */
  backgroundImageUrl: string;
  /** Page title (e.g., "Welcome Back!" or "Create Your Account") */
  title: string;
  /** Page description/subtitle */
  description: string;
  /** Form content to render */
  formContent: React.ReactNode;
  /** Footer link section (e.g., "Not registered yet? Create an Account") */
  footerLink: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  backgroundImageUrl,
  title,
  description,
  formContent,
  footerLink,
}) => {
  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden bg-white lg:bg-white bg-cover bg-center bg-no-repeat lg:bg-none">
      {/* Mobile Background Image */}
      <div
        className="lg:hidden fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-8 lg:py-0 overflow-y-auto relative z-10 lg:z-auto">
        <div className="w-full max-w-md space-y-6 lg:space-y-8 bg-white rounded-lg p-6 lg:p-0 shadow-lg lg:shadow-none">
          {/* Logo and Branding */}
          <div className="flex items-center space-x-3">
            <img src="/logo.webp" alt="Raya Health Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-secondary-success">Raya Health</span>
          </div>

          {/* Title and Description */}
          <div>
            <h1 className="text-3xl font-bold text-text-primary">{title}</h1>
            <p className="mt-2 text-sm text-text-secondary">{description}</p>
          </div>

          {/* Form Content */}
          {formContent}

          {/* Footer Link */}
          {footerLink}

          {/* Copyright */}
          <p className="text-xs text-text-secondary text-center">
            ©2024 Raya Health. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right side - Promotional Image (Desktop only) */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <div className="w-full h-full p-4">
          <img
            src={backgroundImageUrl}
            alt="Health Support Services"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
