import { cn } from "../lib/utils";
import {
  IconDeviceDesktopAnalytics,
  IconLock,
  IconWorld,
  IconDeviceMobile,
  IconUsers,
  IconHeadset,
  IconDeviceLaptop,
  IconScreenShare,
} from "@tabler/icons-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "HD Video Quality",
      description:
        "Experience crystal-clear video calls with adaptive quality based on your connection speed.",
      icon: <IconDeviceDesktopAnalytics />,
    },
    {
      title: "End-to-End Encryption",
      description:
        "Your conversations stay private with our advanced security protocols and encryption.",
      icon: <IconLock />,
    },
    {
      title: "Global Coverage",
      description:
        "Connect with anyone, anywhere in the world with our robust global infrastructure.",
      icon: <IconWorld />,
    },
    {
      title: "Cross-Platform Support",
      description: "Use WeCall on any device with our web, mobile, and desktop apps.",
      icon: <IconDeviceMobile />,
    },
    {
      title: "Group Conferencing",
      description: "Host meetings with multiple participants simultaneously with minimal latency.",
      icon: <IconUsers />,
    },
    {
      title: "24/7 Support",
      description:
        "Our dedicated team is available around the clock to ensure your calls run smoothly.",
      icon: <IconHeadset />,
    },
    {
      title: "Low Latency Technology",
      description:
        "Our optimized WebRTC implementation ensures real-time communication with minimal delay.",
      icon: <IconDeviceLaptop />,
    },
    {
      title: "Screen Sharing",
      description: "Share your screen during calls for better collaboration and presentations.",
      icon: <IconScreenShare />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};