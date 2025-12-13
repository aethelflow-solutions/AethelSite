"use client";

import { useState } from "react";
import {
  Fab,
  Paper,
  Typography,
  IconButton,
  Stack,
  ClickAwayListener,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";

export default function StickyContact() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper
            elevation={6}
            sx={{
              position: "fixed",
              bottom: 90,
              right: 24,   // 👉 RIGHT
              width: 220,
              borderRadius: "16px",
              p: 2,
              zIndex: 1500,
            }}
          >
            <Typography fontWeight={600} mb={1}>
              Contact Us
            </Typography>

            <Stack spacing={1}>
              <IconButton
                component="a"
                href="https://wa.me/919999999999"
                target="_blank"
                sx={{
                  justifyContent: "flex-start",
                  gap: 1,
                  width: "100%",
                  borderRadius: "10px",
                  color: "#25D366",
                }}
              >
                <WhatsAppIcon />
                <Typography fontSize="14px">WhatsApp</Typography>
              </IconButton>

              <IconButton
                component="a"
                href="tel:+919999999999"
                sx={{
                  justifyContent: "flex-start",
                  gap: 1,
                  width: "100%",
                  borderRadius: "10px",
                  color: "#692ac8",
                }}
              >
                <CallIcon />
                <Typography fontSize="14px">Call Now</Typography>
              </IconButton>
            </Stack>
          </Paper>
        </ClickAwayListener>
      )}

      <Fab
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,   // 👉 RIGHT
          zIndex: 1600,
          backgroundColor: "#692ac8",
          color: "#fff",
          "&:hover": { backgroundColor: "#5a24a8" },
        }}
      >
        <PhoneIcon />
      </Fab>
    </>
  );
}
