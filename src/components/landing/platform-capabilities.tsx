import { Reveal } from "@/components/motion";
import { STAGGER_CAP, STAGGER_STEP } from "@/lib/motion";
import { integrationsBuiltOn } from "@/constants/landing";
import { BrandMark, OPENAI_MARK_PATH, TWILIO_MARK_PATH } from "./brand-marks";

const architectureDetails = [
  {
    step: "01",
    title: "Call intake",
    description:
      "Inbound and outbound calls are handled through Twilio, so the voice agent can answer on your existing phone workflow.",
  },
  {
    step: "02",
    title: "Realtime bridge",
    description:
      "A Node.js WebSocket bridge streams caller audio to the model and returns assistant voice back to the call.",
  },
  {
    step: "03",
    title: "AI response",
    description:
      "OpenAI Realtime processes caller audio, understands intent, and generates a natural response while the call is live.",
  },
  {
    step: "04",
    title: "Operational follow-through",
    description:
      "When requested, recordings, summaries, CRM notes, tasks, and follow-ups can be stored for review and action.",
  },
];

function InfrastructureBadge({ item }: { item: (typeof integrationsBuiltOn)[number] }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-ink-muted [&_svg]:!size-4">
      {item.mark ? <BrandMark mark={item.mark} /> : null}
      <span>{item.name}</span>
    </span>
  );
}

function StepBadge({ x, y, n, tone = "blue" }: { x: number; y: number; n: string; tone?: "blue" | "green" | "violet" }) {
  const fill = tone === "green" ? "#16a34a" : tone === "violet" ? "#4f36d9" : "#1f6fe5";

  return (
    <g>
      <circle cx={x} cy={y} r="16" fill={fill} />
      <text x={x} y={y + 6} textAnchor="middle" className="fill-white text-[22px] font-bold">
        {n}
      </text>
    </g>
  );
}

function SvgLines({
  x,
  y,
  lines,
  size = 20,
  color = "#101832",
  weight = 500,
  anchor = "middle",
  lineHeight = 28,
}: {
  x: number;
  y: number;
  lines: string[];
  size?: number;
  color?: string;
  weight?: number;
  anchor?: "start" | "middle" | "end";
  lineHeight?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      style={{ fill: color, fontSize: size, fontWeight: weight }}
      className="font-sans"
    >
      {lines.map((line, index) => (
        <tspan key={line} x={x} dy={index === 0 ? 0 : lineHeight}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

function Wave({ x, y, color = "#1f6fe5" }: { x: number; y: number; color?: string }) {
  const bars = [14, 32, 48, 64, 42, 26, 14];

  return (
    <g className="arch-wave" stroke={color} strokeWidth="4" strokeLinecap="round">
      {bars.map((height, index) => (
        <line
          key={`${x}-${index}`}
          x1={x + index * 10}
          x2={x + index * 10}
          y1={y - height / 2}
          y2={y + height / 2}
          style={{ animationDelay: `${index * 90}ms` }}
        />
      ))}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, dashed = false }: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#0f1a37"
      strokeWidth="3"
      strokeDasharray={dashed ? "10 10" : undefined}
      className={dashed ? "arch-dash" : "arch-arrow-line"}
      markerEnd="url(#arrow)"
    />
  );
}

/**
 * A horizontal flow arrow with a waveform sitting ON the line: the line is split
 * into two segments with a clean gap around the wave, so no stroke ever crosses
 * or sits on the waveform glyph. The arrowhead lands only on the destination end.
 */
function FlowArrow({ x1, x2, y, waveX, waveColor }: { x1: number; x2: number; y: number; waveX: number; waveColor: string }) {
  const rightward = x2 > x1;
  const gapL = waveX - 9; // 7 bars span waveX..waveX+60; clear a small margin each side
  const gapR = waveX + 69;
  const seg1End = rightward ? gapL : gapR;
  const seg2Start = rightward ? gapR : gapL;
  return (
    <g>
      <line x1={x1} y1={y} x2={seg1End} y2={y} stroke="#0f1a37" strokeWidth="3" className="arch-arrow-line" />
      <line x1={seg2Start} y1={y} x2={x2} y2={y} stroke="#0f1a37" strokeWidth="3" className="arch-arrow-line" markerEnd="url(#arrow)" />
      <Wave x={waveX} y={y} color={waveColor} />
    </g>
  );
}

function ToolItem({ y, label, icon }: { y: number; label: string; icon: "note" | "crm" | "task" }) {
  return (
    <g>
      <rect x="1390" y={y - 18} width="40" height="40" rx="7" fill="#f5fbf1" stroke="#7bbd50" strokeWidth="2" />
      <g transform={`translate(1390 ${y - 18})`}>
        {icon === "note" ? (
          <path d="M12 9h16l7 7v23h-23z M28 9v8h7 M17 22h13 M17 29h13 M17 36h8" fill="none" stroke="#67a83b" strokeWidth="3" />
        ) : icon === "crm" ? (
          <path d="M20 28a9 9 0 1 0 0-18a9 9 0 0 0 0 18z M8 44c2-9 8-14 12-14s10 5 12 14z" fill="#75b34b" />
        ) : (
          <path d="M12 8h24v31h-24z M17 23l7 7l12-15 M18 8v-8h12v8" fill="none" stroke="#67a83b" strokeWidth="3" />
        )}
      </g>
      <text x="1452" y={y + 6} className="fill-[#0f1a37] text-[16px] font-medium">
        {label}
      </text>
    </g>
  );
}

function SystemArchitectureDiagram() {
  return (
    <svg
      viewBox="0 0 1920 1080"
      role="img"
      aria-label="Voice Calling Agent system architecture: caller, Twilio, Node.js bridge, OpenAI Realtime API, storage, notes, CRM, and call-flow summary."
      className="block h-auto w-full min-w-[900px]"
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f1a37" />
        </marker>
        <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6bb04b" />
        </marker>
        <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#10214a" floodOpacity="0.08" />
        </filter>
        <linearGradient id="voice-grad" x1="0" x2="1">
          <stop stopColor="#1da7ff" />
          <stop offset="1" stopColor="#8a3ffc" />
        </linearGradient>
        <clipPath id="caller-user-clip">
          <circle cx="104" cy="394" r="73" />
        </clipPath>
      </defs>

      <style>
        {`
          .arch-wave line {
            transform-box: fill-box;
            transform-origin: center;
            animation: archWave 1.4s ease-in-out infinite;
          }
          .arch-arrow-line {
            animation: archPulse 2.1s ease-in-out infinite;
          }
          .arch-dash {
            animation: archDash 1.15s linear infinite;
          }
          .arch-flow-dot {
            filter: drop-shadow(0 0 8px currentColor);
          }
          @keyframes archWave {
            0%, 100% { transform: scaleY(0.55); opacity: 0.55; }
            50% { transform: scaleY(1.18); opacity: 1; }
          }
          @keyframes archPulse {
            0%, 100% { opacity: 0.62; }
            50% { opacity: 1; }
          }
          @keyframes archDash {
            to { stroke-dashoffset: -22; }
          }
        `}
      </style>

      <rect width="1920" height="1080" fill="#ffffff" />

      <text x="960" y="76" textAnchor="middle" className="fill-[#050a1f] text-[58px] font-extrabold">
        Voice Calling Agent – System Architecture
      </text>
      <text x="960" y="126" textAnchor="middle" className="fill-[#596178] text-[29px] font-medium">
        Real-time voice conversation powered by Twilio + OpenAI Realtime API
      </text>
      <g filter="url(#soft-shadow)">
        <rect x="19" y="224" width="188" height="386" rx="12" fill="#fbfdff" stroke="#2d69d8" strokeWidth="1.5" />
        <StepBadge x={50} y={256} n="1" />
        <text x="76" y="263" className="fill-[#101832] text-[21px] font-bold">Caller / User</text>
        <circle cx="104" cy="394" r="73" fill="#edf5ff" />
        <image
          href="/caller.webp"
          x="31"
          y="321"
          width="146"
          height="146"
          clipPath="url(#caller-user-clip)"
          preserveAspectRatio="xMidYMid slice"
        />
        <circle cx="104" cy="394" r="73" fill="none" stroke="#dbeafe" strokeWidth="2" />
        <SvgLines x={104} y={513} lines={["Receives or", "answers a", "phone call"]} size={20} lineHeight={27} />

        <rect x="354" y="181" width="230" height="477" rx="13" fill="#ffffff" stroke="#1f6fe5" strokeWidth="1.5" />
        <StepBadge x={390} y={219} n="2" />
        <text x="417" y="226" className="fill-[#101832] text-[19px] font-bold">Twilio Voice Call</text>
        <path d={TWILIO_MARK_PATH} transform="translate(384 295) scale(0.211)" fill="#F12E45" />
        <text x="449" y="339" className="fill-[#F12E45] text-[44px] font-extrabold" style={{ letterSpacing: "-0.02em" }}>
          twilio
        </text>
        <image
          href="/cloud-phone.webp"
          x="408"
          y="403"
          width="122"
          height="86"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        />
        <SvgLines x={469} y={526} lines={["Twilio handles the", "phone call using a", "Twilio phone number"]} size={19} lineHeight={27} />

        <rect x="778" y="181" width="368" height="477" rx="13" fill="#fbfffb" stroke="#55ad45" strokeWidth="1.5" />
        <StepBadge x={831} y={222} n="4" tone="green" />
        <text x="856" y="230" className="fill-[#101832] text-[23px] font-bold">Node.js + Express Server</text>
        <g transform="translate(890 294)">
          {[0, 39, 78].map((yy) => (
            <g key={yy}>
              <rect x="0" y={yy} width="128" height="37" rx="8" fill="#1c263b" stroke="#070d20" strokeWidth="3" />
              <circle cx="21" cy={yy + 19} r="6" fill="#e9eef8" />
              <circle cx="102" cy={yy + 19} r="4" fill="#b5e876" />
              <circle cx="113" cy={yy + 19} r="4" fill="#b5e876" />
            </g>
          ))}
          <path d="M113 77l31-18l31 18v36l-31 18l-31-18z" fill="#6dbb45" stroke="#ffffff" strokeWidth="5" />
          <text x="145" y="106" textAnchor="middle" className="fill-white text-[43px] font-bold">JS</text>
        </g>
        <text x="962" y="485" textAnchor="middle" className="fill-[#101832] text-[29px] font-extrabold">WebSocket Bridge</text>
        <SvgLines x={962} y={529} lines={["Receives audio from Twilio", "Forwards to OpenAI Realtime API", "Receives AI response", "Sends audio back to Twilio"]} size={20} lineHeight={27} />

        <rect x="1338" y="181" width="263" height="502" rx="13" fill="#ffffff" stroke="#5b3be8" strokeWidth="1.7" />
        <StepBadge x={1373} y={219} n="5" tone="violet" />
        <text x="1399" y="226" className="fill-[#101832] text-[18px] font-bold">OpenAI Realtime API</text>
        <path d={OPENAI_MARK_PATH} transform="translate(1428 295) scale(4.8)" fill="#050505" />
        <Wave x={1395} y={445} color="#8b5cf6" />
        <Wave x={1485} y={445} color="#8b5cf6" />
        <SvgLines x={1469} y={514} lines={["Voice Model /", "Assistant Voice"]} size={20} weight={800} lineHeight={26} />
        <SvgLines x={1469} y={581} lines={["Processes caller audio,", "understands intent,", "generates natural voice", "response in real-time"]} size={18} lineHeight={25} />

        <rect x="1642" y="177" width="260" height="875" rx="14" fill="#fbfcff" stroke="#a8b5cc" strokeWidth="1.3" />
        <text x="1772" y="216" textAnchor="middle" className="fill-[#1f6fe5] text-[18px] font-extrabold">Call Flow Summary</text>
        {[
          ["1", "blue", ["User receives or", "answers a phone call."]],
          ["2", "blue", ["Twilio handles the call", "using a Twilio number."]],
          ["3", "blue", ["Twilio sends call audio", "via Media Stream", "(WebSocket) to our", "server."]],
          ["4", "green", ["Server connects to", "OpenAI Realtime API", "via WebSocket."]],
          ["5", "violet", ["Caller audio flows from", "Twilio → Server →", "OpenAI Realtime."]],
          ["6", "green", ["OpenAI generates", "assistant voice", "response."]],
          ["7", "green", ["Server sends audio", "response back to", "Twilio."]],
          ["8", "blue", ["Twilio plays assistant", "voice to the caller."]],
          ["9", "green", ["Server can save call", "recordings and", "important support", "notes when requested."]],
        ].map(([n, tone, lines], index) => {
          const y = 254 + index * 86;
          return (
            <g key={String(n)}>
              <StepBadge x={1676} y={y} n={String(n)} tone={tone as "blue" | "green" | "violet"} />
              <SvgLines x={1704} y={y - 7} lines={lines as string[]} size={15} anchor="start" lineHeight={21} />
            </g>
          );
        })}
      </g>

      <Arrow x1={207} y1={376} x2={350} y2={376} />
      <Arrow x1={354} y1={471} x2={209} y2={471} />
      <circle r="6" fill="#1f6fe5" className="arch-flow-dot">
        <animateMotion dur="2.2s" repeatCount="indefinite" path="M207 376 L350 376" />
      </circle>
      <circle r="6" fill="#16a34a" className="arch-flow-dot">
        <animateMotion dur="2.2s" repeatCount="indefinite" path="M354 471 L209 471" />
      </circle>
      <StepBadge x={273} y={273} n="1" />
      <SvgLines x={276} y={310} lines={["Inbound /", "Outbound", "Call"]} size={17} lineHeight={25} />
      <StepBadge x={279} y={504} n="8" />
      <SvgLines x={280} y={545} lines={["Assistant voice", "played to caller"]} size={17} lineHeight={25} />

      <StepBadge x={667} y={246} n="3" />
      <SvgLines x={668} y={285} lines={["Twilio Media", "Stream", "(WebSocket)"]} size={17} lineHeight={25} />
      <FlowArrow x1={584} x2={775} y={361} waveX={647} waveColor="#1f6fe5" />
      <FlowArrow x1={779} x2={587} y={481} waveX={638} waveColor="#16a34a" />
      <SvgLines x={665} y={524} lines={["Audio response", "sent back to Twilio"]} size={16} lineHeight={25} />
      <StepBadge x={676} y={590} n="7" tone="green" />

      <StepBadge x={1244} y={245} n="4" tone="green" />
      <SvgLines x={1244} y={284} lines={["WebSocket", "Connection"]} size={17} lineHeight={25} />
      <FlowArrow x1={1147} x2={1334} y={361} waveX={1224} waveColor="#1f6fe5" />
      <FlowArrow x1={1338} x2={1150} y={481} waveX={1215} waveColor="#16a34a" />
      <StepBadge x={1242} y={528} n="6" tone="green" />
      <SvgLines x={1242} y={554} lines={["Assistant voice", "(audio response)"]} size={16} lineHeight={25} />

      {/* Dashed fan-out from the server to storage + notes: a trunk down from the
          box centre, a branch bar that clears the "9" badge, and two drops that
          land on each box's top edge — no stray arrowhead, no crossing the flow. */}
      <path className="arch-dash" d="M962 658V680M654 680H1126" fill="none" stroke="#1f3a7a" strokeWidth="3" strokeDasharray="10 10" />
      <path className="arch-dash" d="M654 680V754" fill="none" stroke="#1f3a7a" strokeWidth="3" strokeDasharray="10 10" markerEnd="url(#arrow)" />
      <path className="arch-dash" d="M1126 680V754" fill="none" stroke="#1f3a7a" strokeWidth="3" strokeDasharray="10 10" markerEnd="url(#arrow)" />
      <circle r="5" fill="#16a34a" className="arch-flow-dot">
        <animateMotion dur="2.4s" repeatCount="indefinite" path="M962 658 L962 680" />
      </circle>
      <StepBadge x={895} y={716} n="9" tone="green" />
      <SvgLines x={895} y={745} lines={["Save & Store", "(When requested)"]} size={14} lineHeight={20} />

      <g filter="url(#soft-shadow)">
        <rect x="514" y="760" width="280" height="126" rx="12" fill="#fbfdff" stroke="#77a9ff" strokeWidth="1.6" />
        <ellipse cx="565" cy="806" rx="28" ry="12" fill="#1f6fe5" />
        <path d="M537 806v40c0 7 13 13 28 13s28-6 28-13v-40" fill="#1f6fe5" opacity="0.92" />
        <ellipse cx="565" cy="846" rx="28" ry="12" fill="#1f6fe5" />
        <circle cx="543" cy="851" r="16" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
        <g stroke="#2563eb" strokeWidth="2.6" strokeLinecap="round">
          <line x1="537" y1="847" x2="537" y2="855" />
          <line x1="541.5" y1="844" x2="541.5" y2="858" />
          <line x1="546" y1="846" x2="546" y2="856" />
          <line x1="550.5" y1="848.5" x2="550.5" y2="853.5" />
        </g>
        <text x="638" y="800" className="fill-[#101832] text-[17px] font-extrabold">Recording Storage</text>
        <SvgLines x={638} y={831} lines={["Store recordings", "for compliance,", "quality review"]} size={13} anchor="start" lineHeight={19} />

        <rect x="984" y="762" width="285" height="124" rx="12" fill="#fbfffb" stroke="#6ab75c" strokeWidth="1.6" />
        <path d="M1017 794h37l20 20v44h-57z M1054 794v22h20 M1028 828h33 M1028 845h28" fill="none" stroke="#14a044" strokeWidth="5" />
        <path d="M1044 862l36-36l16 16l-36 36l-19 4z" fill="#14a044" />
        <text x="1102" y="802" className="fill-[#101832] text-[15px] font-extrabold">Support Notes / Tools</text>
        <SvgLines x={1102} y={833} lines={["Save notes,", "summaries, outcomes,", "CRM tasks"]} size={12} anchor="start" lineHeight={18} />
      </g>

      {/* Support Notes → tools: clean green bracket. A dashed spine at x=1345 sits
          in the gap between the box (left) and the tool rows (right); one arm returns
          to the box with a small green arrowhead landing ON its right border, three
          arms branch to the tool icons. Orthogonal, no curves, nothing crosses. */}
      <path className="arch-dash" d="M1345 824H1272" fill="none" stroke="#6bb04b" strokeWidth="3" strokeDasharray="9 9" markerEnd="url(#arrow-green)" />
      <path className="arch-dash" d="M1345 784V914" fill="none" stroke="#6bb04b" strokeWidth="3" strokeDasharray="9 9" />
      <path className="arch-dash" d="M1345 784H1386M1345 849H1386M1345 914H1386" fill="none" stroke="#6bb04b" strokeWidth="3" strokeDasharray="9 9" />
      <ToolItem y={784} label="Notes / Summaries" icon="note" />
      <ToolItem y={849} label="CRM Integration" icon="crm" />
      <ToolItem y={914} label="Task / Follow-up" icon="task" />
      <text x="1394" y="969" className="fill-[#16a34a] text-[27px] font-bold">...</text>
      <text x="1452" y="969" className="fill-[#0f1a37] text-[18px] font-medium">and more tools</text>

      <rect x="37" y="824" width="302" height="166" rx="12" fill="#ffffff" stroke="#b7c6de" strokeWidth="1.5" strokeDasharray="5 6" />
      <text x="62" y="863" className="fill-[#101832] text-[20px] font-bold">Legend</text>
      <Wave x={66} y={906} />
      <text x="145" y="912" className="fill-[#101832] text-[14px] font-medium">Caller Audio Flow</text>
      <Wave x={66} y={958} color="#16a34a" />
      <text x="145" y="964" className="fill-[#101832] text-[14px] font-medium">Assistant Audio Flow</text>

      <rect x="626" y="976" width="591" height="90" rx="12" fill="#ffffff" stroke="#1f6fe5" strokeWidth="2" />
      <circle cx="682" cy="1021" r="27" fill="#1f6fe5" />
      <path d="M671 1016c0-13 22-13 22 0c0 8-7 10-7 17h-8c0-7-7-9-7-17z M678 1040h9" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      <text x="724" y="1015" className="fill-[#101832] text-[22px] font-extrabold">Real-time, bi-directional voice conversation</text>
      <text x="724" y="1048" className="fill-[#101832] text-[18px] font-medium">Built for scale, reliability, and seamless user experience</text>
    </svg>
  );
}

export function PlatformCapabilities() {
  return (
    <section id="capabilities" className="container-page scroll-mt-24 py-12 sm:py-16">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-ink-muted">
          Built on infrastructure you already trust
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {integrationsBuiltOn.map((item) => (
            <InfrastructureBadge key={item.name} item={item} />
          ))}
        </div>
      </div>

      <Reveal>
        {/* The diagram is authored at 1920×1080; below ~940px it can't shrink to
            fit and stay legible, so it keeps a legible min-width and the frame
            scrolls horizontally (page never overflows). Cards below summarise the
            same four stages for anyone who doesn't pan. */}
        <div className="overflow-x-auto rounded-md bg-surface">
          <SystemArchitectureDiagram />
        </div>
        <p className="mt-2 text-center text-xs text-ink-faint lg:hidden">
          Swipe to explore the full architecture &rarr;
        </p>
      </Reveal>

      <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {architectureDetails.map((item, index) => (
          <Reveal
            key={item.title}
            delay={Math.min(index, STAGGER_CAP) * STAGGER_STEP}
            className="bg-surface p-5 text-center sm:p-6"
          >
            <span className="font-mono text-xs font-semibold tracking-normal text-accent">{item.step}</span>
            <h3 className="mt-2 text-base font-semibold text-foreground">{item.title}</h3>
            <p className="mx-auto mt-2 max-w-64 text-sm leading-relaxed text-ink-muted">
              {item.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
