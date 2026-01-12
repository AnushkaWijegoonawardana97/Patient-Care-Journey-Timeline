import type { AddOnServiceDTO } from "@/dto/addOnServices.dto";

/** Mock add-on services data */
export const mockAddOnServices: AddOnServiceDTO[] = [
  {
    id: "acupuncture",
    name: "Acupuncture",
    icon_name: "activity",
    description:
      "Support your wellness journey with traditional acupuncture techniques designed to promote relaxation and balance.",
    status: "coming_soon",
    image_url: "/acupuncture-image.jpg",
  },
  {
    id: "chiropractic",
    name: "Chiropractic Care",
    icon_name: "bone",
    description:
      "Gentle chiropractic adjustments to help alleviate pregnancy-related discomfort and support natural alignment.",
    status: "coming_soon",
    image_url: "/chiropractic-image.jpg",
  },
  {
    id: "overnight-doula",
    name: "Overnight Doula Care",
    icon_name: "moon",
    description:
      "Receive additional support during overnight hours to help you rest and recover while ensuring your baby's needs are met.",
    status: "optional_addon",
    image_url: "/overnight-doula-image.jpg",
  },
  {
    id: "prenatal-massage",
    name: "Prenatal Massage",
    icon_name: "hand",
    description:
      "Specialized massage therapy tailored for expectant mothers to reduce tension and promote relaxation.",
    status: "optional_addon",
    image_url: "/prenatal-massage-image.jpg",
  },
  {
    id: "postpartum-massage",
    name: "Postpartum Massage",
    icon_name: "heart",
    description:
      "Therapeutic massage designed to support your body's recovery after birth and ease muscle tension.",
    status: "optional_addon",
    image_url: "/postpartum-massage-image.jpg",
  },
  {
    id: "pelvic-floor-therapy",
    name: "Pelvic Floor Therapy",
    icon_name: "target",
    description:
      "Specialized support for pelvic health through gentle exercises to strengthen and restore function.",
    status: "coming_soon",
    image_url: "/pelvic-floor-therapy-image.jpg",
  },
];
