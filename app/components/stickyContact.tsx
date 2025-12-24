"use client";

import { useState } from "react";
import { Fab, IconButton, ClickAwayListener } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

/* ================= ENV VARIABLES ================= */
const PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE!;
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!;
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL!;
/* ================================================= */

export default function StickyContact() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const whatsappMessage =
    "Hi! I’m interested in your AI services. Please get in touch.";
  const encodedMsg = encodeURIComponent(whatsappMessage);

  const closeWithAnimation = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 300);
  };

  const icons = [
    {
      icon: <WhatsAppIcon fontSize="large" />,
      href: `https://wa.me/${WHATSAPP}?text=${encodedMsg}`,
      bg: "#25D366",
      hoverBg: "#21b256",
      delayIn: "0ms",
      delayOut: "160ms",
      translate: "translate(-40px, -120px)",
    },
    {
      icon: <CallIcon fontSize="large" />,
      href: `tel:+${PHONE}`,
      bg: "#28a2fe",
      hoverBg: "#228ee0",
      delayIn: "90ms",
      delayOut: "80ms",
      translate: "translate(-90px, -70px)",
    },
    {
      icon: <EmailIcon fontSize="large" />,
      href: `mailto:${EMAIL}`,
      bg: "#1976d2",
      hoverBg: "#1a6abb",
      delayIn: "180ms",
      delayOut: "0ms",
      translate: "translate(-120px, -10px)",
    },
  ];

  return (
    <>
      {/* Floating Options */}
      {open && (
        <ClickAwayListener onClickAway={closeWithAnimation}>
          <div>
            {icons.map((item, index) => (
              <IconButton
                key={index}
                component="a"
                href={item.href}
                target="_blank"
                sx={{
                  position: "fixed",
                  bottom: 24,
                  right: 24,
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: item.bg,
                  color: "#fff",
                  boxShadow: 4,
                  zIndex: 1500,
                  animation: closing
                    ? "fabOut 240ms ease-in forwards"
                    : "fabIn 280ms ease-out forwards",
                  animationDelay: closing ? item.delayOut : item.delayIn,
                  "--fab-translate": item.translate,
                  "&:hover": {
                    transform: "scale(1.12)",
                    backgroundColor: item.hoverBg,
                  },
                }}
              >
                {item.icon}
              </IconButton>
            ))}
          </div>
        </ClickAwayListener>
      )}

      {/* Main FAB */}
      <Fab
        onClick={() => {
          if (open) closeWithAnimation();
          else setOpen(true);
        }}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1600,
          backgroundColor: "#28a2fe",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#228ee0",
          },
        }}
        aria-label="Contact options"
      >
        <img
          src="/customer-service.png"
          alt="Contact"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </Fab>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fabIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: var(--fab-translate) scale(1);
          }
        }

        @keyframes fabOut {
          from {
            opacity: 1;
            transform: var(--fab-translate) scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.5);
          }
        }
      `}</style>
    </>
  );
}
