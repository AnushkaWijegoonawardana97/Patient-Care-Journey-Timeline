import * as React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/atoms/Button/Button";
import { ArrowRight } from "lucide-react";

export interface WelcomeBannerProps {
  patientName: string;
  promptMessage?: string;
  primaryActionLabel?: string;
  primaryActionTo?: string;
  secondaryActionLabel?: string;
  secondaryActionTo?: string;
  imageUrl?: string;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  patientName,
  promptMessage,
  primaryActionLabel,
  primaryActionTo = "/care-journey",
  secondaryActionLabel,
  secondaryActionTo = "/care-journey",
  imageUrl,
}) => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const images = imageUrl ? [imageUrl] : [];

  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-sm border border-gray-100 dark:border-border overflow-hidden h-full flex flex-col w-full bg-gradient-to-br from-primary-light/10 via-white to-secondary-light/10 dark:from-primary/10 dark:via-card dark:to-secondary-success/10">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch flex-1 p-6 lg:p-8">
        {/* Left Section - Text and Buttons */}
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-md">
                <span className="text-2xl">👋</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-card-foreground">
                Welcome, {patientName}!
              </h1>
            </div>
            <p className="text-base lg:text-lg text-text-secondary dark:text-muted-foreground leading-relaxed">
              {promptMessage}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-start">
            <Button asChild size="lg" className="w-full sm:w-auto shadow-md hover:shadow-lg transition-all">
              <Link to={primaryActionTo}>
                {primaryActionLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto border-2 border-secondary-success text-secondary-success hover:bg-secondary-light shadow-sm hover:shadow-md transition-all"
            >
              <Link to={secondaryActionTo}>{secondaryActionLabel}</Link>
            </Button>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="lg:w-64 w-full flex-shrink-0 flex items-center">
          <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-square w-full shadow-lg border-2 border-gray-200/50">
            {images.length > 0 ? (
              <>
                <img
                  src={images[currentImageIndex]}
                  alt="Care journey"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`
                          w-2 h-2 rounded-full transition-all
                          ${index === currentImageIndex ? "bg-white shadow-md" : "bg-white/50"}
                        `}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-light/30 to-secondary-light/30">
                <div className="text-center p-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary-success flex items-center justify-center shadow-lg">
                    <ArrowRight className="h-8 w-8 text-white rotate-[-45deg]" />
                  </div>
                  <p className="text-sm font-medium text-text-primary dark:text-card-foreground">
                    {t("navigation.careJourney")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
