import * as React from "react";
import { Link } from "react-router-dom";
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
  promptMessage = "How would you like to continue your care journey today?",
  primaryActionLabel = "View Care Journey",
  primaryActionTo = "/care-journey",
  secondaryActionLabel = "View Progress",
  secondaryActionTo = "/care-journey",
  imageUrl,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const images = imageUrl ? [imageUrl] : [];

  return (
    <div className="bg-gradient-to-br from-secondary-light via-white to-primary-light rounded-lg shadow-sm border border-gray-100 p-4 lg:p-6 h-full flex flex-col w-full">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch flex-1">
        {/* Left Section - Text and Buttons */}
        <div className="flex-1 flex flex-col justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-primary mb-2">
              Welcome, {patientName}! 👋
            </h1>
            <p className="text-sm lg:text-base text-text-secondary leading-relaxed">
              {promptMessage}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:items-start">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to={primaryActionTo}>
                {primaryActionLabel}
                <ArrowRight className="ml-1.5 h-3 w-3" />
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto border-2 border-secondary-success text-secondary-success hover:bg-secondary-light"
            >
              <Link to={secondaryActionTo}>{secondaryActionLabel}</Link>
            </Button>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="lg:w-64 w-full flex-shrink-0 flex items-center">
          <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-square w-full shadow-md">
            {images.length > 0 ? (
              <>
                <img
                  src={images[currentImageIndex]}
                  alt="Care journey"
                  className="w-full h-full object-cover"
                />
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`
                          w-2 h-2 rounded-full transition-all
                          ${index === currentImageIndex ? "bg-white" : "bg-white/50"}
                        `}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary-light to-secondary-accent">
                <div className="text-center p-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary-success/20 flex items-center justify-center">
                    <ArrowRight className="h-8 w-8 text-secondary-success rotate-[-45deg]" />
                  </div>
                  <p className="text-sm text-text-secondary">Care Journey</p>
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
