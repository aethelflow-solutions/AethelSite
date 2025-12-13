// "use client";

// import { useState } from "react";
// import {
//   Fab,
//   Paper,
//   Typography,
//   IconButton,
//   Stack,
//   ClickAwayListener,
// } from "@mui/material";
// import PhoneIcon from "@mui/icons-material/Phone";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import CallIcon from "@mui/icons-material/Call";

// export default function StickyContact() {
//   const [open, setOpen] = useState(false);
//   const [closing, setClosing] = useState(false);

//   const closeWithAnimation = () => {
//     setClosing(true);
//     setTimeout(() => {
//       setOpen(false);
//       setClosing(false);
//     }, 200);
//   };

//   return (
//     <>
//       {open && (
//         <ClickAwayListener onClickAway={closeWithAnimation}>
//           <Paper
//             elevation={6}
//             sx={{
//               position: "fixed",
//               bottom: 90,
//               right: 24,
//               width: 220,
//               borderRadius: "16px",
//               p: 2,
//               zIndex: 1500,
//               animation: closing
//                 ? "containerOut 200ms ease-in"
//                 : "containerIn 220ms ease-out",
//             }}
//           >
//             <Typography fontWeight={600} mb={1}>
//               Contact Us
//             </Typography>

//             <Stack spacing={1}>
//               <IconButton
//                 component="a"
//                 href="https://wa.me/919999999999"
//                 target="_blank"
//                 sx={{
//                   justifyContent: "flex-start",
//                   gap: 1,
//                   width: "100%",
//                   borderRadius: "10px",
//                   color: "#25D366",
//                 }}
//               >
//                 <WhatsAppIcon />
//                 <Typography fontSize="14px">WhatsApp</Typography>
//               </IconButton>

//               <IconButton
//                 component="a"
//                 href="tel:+919999999999"
//                 sx={{
//                   justifyContent: "flex-start",
//                   gap: 1,
//                   width: "100%",
//                   borderRadius: "10px",
//                   color: "#692ac8",
//                 }}
//               >
//                 <CallIcon />
//                 <Typography fontSize="14px">Call Now</Typography>
//               </IconButton>
//             </Stack>
//           </Paper>
//         </ClickAwayListener>
//       )}

//       <Fab
//         onClick={() => {
//           if (open) closeWithAnimation();
//           else setOpen(true);
//         }}
//         sx={{
//           position: "fixed",
//           bottom: 24,
//           right: 24,
//           zIndex: 1600,
//           backgroundColor: "#692ac8",
//           color: "#fff",
//           "&:hover": { backgroundColor: "#5a24a8" },
//         }}
//       >
//         <PhoneIcon />
//       </Fab>

//       {/* Animations */}
//       <style jsx global>{`
//         @keyframes containerIn {
//           from {
//             opacity: 0;
//             transform: translateY(12px) scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }

//         @keyframes containerOut {
//           from {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//           to {
//             opacity: 0;
//             transform: translateY(12px) scale(0.95);
//           }
//         }
//       `}</style>
//     </>
//   );
// }



"use client";

import { useState } from "react";
import {
  Fab,
  IconButton,
  ClickAwayListener,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

export default function StickyContact() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

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
      href: "https://wa.me/919999999999",
      bg: "#25D366",
      backgroundColor: "#21b256",
      delayIn: "0ms",
      delayOut: "160ms",
      translate: "translate(-40px, -120px)", // ⬅️ farther + higher
    },
    {
      icon: <CallIcon fontSize="large" />,
      href: "tel:+919999999999",
      bg: "#692ac8",
      backgroundColor: "#5a24a8",
      delayIn: "90ms",
      delayOut: "80ms",
      translate: "translate(-90px, -70px)", // ⬅️ more gap
    },
    {
      icon: <EmailIcon fontSize="large" />,
      href: "mailto:contact@company.com",
      bg: "#1976d2",
      backgroundColor: "#1a6abb",
      delayIn: "180ms",
      delayOut: "0ms",
      translate: "translate(-120px, -10px)", // ⬅️ spaced out
    },
  ];

  return (
    <>
      {open && (
        <ClickAwayListener onClickAway={closeWithAnimation}>
          <div>
            {icons.map((item, index) => (
              <IconButton
                key={index}
                component="a"
                href={item.href}
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
                  animationDelay: closing
                    ? item.delayOut
                    : item.delayIn,
                  "--fab-translate": item.translate,
                  "&:hover": {
                    transform: "scale(1.12)",
                    backgroundColor: item.backgroundColor,
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
          backgroundColor: "#692ac8",
          color: "#fff",
          "&:hover": { backgroundColor: "#5a24a8" },
        }}
      >
        <PhoneIcon />
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


