"use client";

import type { CSSProperties } from "react";

type BootSequenceProps = {
  stage: "boot" | "pulse" | "release" | "complete";
};

const glyphColumns = [
  { left: "5%", duration: "4.2s", delay: "-0.6s", text: "010011 // BUILD // ROUTE // SIGNAL //" },
  { left: "14%", duration: "5.1s", delay: "-2.1s", text: "STACK // PRODUCT // SYSTEMS // EDGE //" },
  { left: "24%", duration: "4.8s", delay: "-1.1s", text: "TYPE // STATE // SHIP // REPEAT //" },
  { left: "35%", duration: "5.4s", delay: "-3.2s", text: "VISION // UI // API // INFRA //" },
  { left: "52%", duration: "4.6s", delay: "-1.8s", text: "SCOUT // ALIGN // BUILD // DEPLOY //" },
  { left: "64%", duration: "5.3s", delay: "-2.6s", text: "LEGACY // RESCUE // MODERNISE // SHIP //" },
  { left: "78%", duration: "4.4s", delay: "-0.9s", text: "DOCS // SEARCH // FLOW // MOMENTUM //" },
  { left: "90%", duration: "5s", delay: "-2.9s", text: "SIGNAL // STRANGE // SYSTEMS // SOLVED //" },
];

const streaks = [
  { top: "8%", left: "-12%", width: "36%", rotate: "-14deg", duration: "1.7s", delay: "-0.2s" },
  { top: "19%", left: "12%", width: "44%", rotate: "-9deg", duration: "2.1s", delay: "-1.1s" },
  { top: "33%", left: "-6%", width: "52%", rotate: "-6deg", duration: "1.9s", delay: "-0.8s" },
  { top: "54%", left: "18%", width: "40%", rotate: "-12deg", duration: "2.2s", delay: "-1.7s" },
  { top: "67%", left: "-8%", width: "48%", rotate: "-8deg", duration: "2s", delay: "-0.4s" },
];

export function BootSequence({ stage }: BootSequenceProps) {
  return (
    <div
      className={`boot-sequence ${stage === "complete" ? "is-complete" : `boot-sequence--${stage}`}`}
      aria-hidden="true"
    >
      <div className="boot-sequence__veil" />
      <div className="boot-sequence__noise" />
      <div className="boot-sequence__grid" />
      <div className="boot-sequence__scan" />
      <div className="boot-sequence__flash" />
      <div className="boot-sequence__shutter boot-sequence__shutter--top" />
      <div className="boot-sequence__shutter boot-sequence__shutter--bottom" />

      <div className="boot-sequence__streaks">
        {streaks.map((streak, index) => (
          <span
            key={`${streak.top}-${streak.left}-${index}`}
            className="boot-sequence__streak"
            style={
              {
                "--top": streak.top,
                "--left": streak.left,
                "--width": streak.width,
                "--rotate": streak.rotate,
                "--duration": streak.duration,
                "--delay": streak.delay,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="boot-sequence__glyphs">
        {glyphColumns.map((column) => (
          <span
            key={`${column.left}-${column.text}`}
            className="boot-sequence__glyph"
            style={
              {
                "--left": column.left,
                "--duration": column.duration,
                "--delay": column.delay,
              } as CSSProperties
            }
          >
            {column.text}
          </span>
        ))}
      </div>
    </div>
  );
}
