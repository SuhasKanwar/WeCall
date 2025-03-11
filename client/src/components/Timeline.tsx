import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";

const timelineEvents = [
  {
    year: "Step 1",
    title: "ICE Server Discovery",
    description:
      "Establishing connection by discovering network details through STUN servers.",
    details:
      "The WebRTC peer first contacts STUN (Session Traversal Utilities for NAT) servers to determine its public IP address and port. This helps in creating potential connection paths when peers are behind NATs or firewalls.",
  },
  {
    year: "Step 2",
    title: "Signaling Channel Setup",
    description:
      "Creating a communication channel to exchange connection information between peers.",
    details:
      "Before direct peer-to-peer connection can happen, peers need to exchange metadata through a signaling server. This typically uses WebSockets or HTTP and transmits information like session descriptions, ICE candidates, and media capabilities.",
  },
  {
    year: "Step 3",
    title: "SDP Exchange",
    description:
      "Trading Session Description Protocol data containing media capabilities.",
    details:
      "Peers exchange SDP (Session Description Protocol) objects that contain information about media types, codecs, and connection details. The initiating peer creates an 'offer' SDP, while the receiving peer responds with an 'answer' SDP.",
  },
  {
    year: "Step 4",
    title: "ICE Candidate Generation",
    description:
      "Gathering all possible network paths for establishing peer connection.",
    details:
      "Each peer generates ICE (Interactive Connectivity Establishment) candidates representing potential communication paths. These include local network interfaces, reflexive addresses (from STUN servers), and relay addresses (from TURN servers).",
  },
  {
    year: "Step 5",
    title: "Connectivity Checks",
    description:
      "Testing connection paths to find the optimal route between peers.",
    details:
      "Peers perform connectivity checks on all ICE candidate pairs to determine which connection paths work. They prioritize the most efficient routes, preferring direct connections when possible and falling back to TURN relay servers when necessary.",
  },
  {
    year: "Step 6",
    title: "Media Transmission",
    description: "Establishing secure peer-to-peer connection for real-time data.",
    details:
      "Once the best connection path is established, peers begin transmitting encrypted media streams directly to each other. This includes audio, video, or data channels, all secured using DTLS (Datagram Transport Layer Security) and SRTP (Secure Real-time Transport Protocol).",
  },
];

export default function Timeline() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            WebRTC Connection Flow
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            How peer-to-peer connections are established in real-time communications
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary/20"
            style={{ scaleY: scaleX }}
          />

          <motion.div
            className="sticky top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-primary"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          >
          </motion.div>

          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={event.year}
              event={event}
              index={index}
              isExpanded={expandedEvent === index}
              onToggle={() =>
                setExpandedEvent(expandedEvent === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineEvent({
  event,
  index,
  isExpanded,
  onToggle,
}: {
  event: (typeof timelineEvents)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={`mb-8 flex justify-between items-center w-full ${
        index % 2 === 0 ? "flex-row-reverse" : ""
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className="w-5/12" />
      <div className="z-20">
        <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
          <div className="w-3 h-3 bg-background rounded-full" />
        </div>
      </div>
      <motion.div
        className="w-5/12 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
      >
        <div className="p-4 bg-background rounded-lg shadow-md border border-primary/10">
          <span className="font-bold text-primary">{event.year}</span>
          <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
          <p className="text-muted-foreground">{event.description}</p>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-sm text-muted-foreground">
              {event.details}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}