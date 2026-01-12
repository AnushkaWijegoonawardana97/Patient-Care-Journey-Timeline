import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    src: {
      control: "text",
    },
    alt: {
      control: "text",
    },
    fallback: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    alt: "John Doe",
    fallback: "JD",
  },
};

export const WithImage: Story = {
  args: {
    src: "/patient-avatar.jpg",
    alt: "Maria Santos",
    size: "md",
  },
};

export const Fallback: Story = {
  args: {
    alt: "Jane Smith",
    fallback: "JS",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    alt: "Small Avatar",
    fallback: "SA",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    alt: "Medium Avatar",
    fallback: "MA",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    alt: "Large Avatar",
    fallback: "LA",
    size: "lg",
  },
};

export const ImageError: Story = {
  args: {
    src: "/non-existent-image.jpg",
    alt: "Error Avatar",
    fallback: "EA",
    size: "md",
  },
};

export const WithImageSmall: Story = {
  args: {
    src: "/patient-avatar.jpg",
    alt: "Small Image",
    size: "sm",
  },
};

export const WithImageLarge: Story = {
  args: {
    src: "/patient-avatar.jpg",
    alt: "Large Image",
    size: "lg",
  },
};
