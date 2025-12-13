"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { TextField, MenuItem, Button, Card } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  date: Dayjs | null;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const SERVICES = [
  "AI Integration solutions",
  "Custom Software Development",
  "Automation & RPA",
  "Data & Analytics",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s-]{10,}$/;

const initialFormState: FormData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: SERVICES[0],
  date: null,
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const validateForm = useCallback(() => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!EMAIL_REGEX.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!PHONE_REGEX.test(form.phone)) e.phone = "Invalid phone";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setForm(initialFormState);
    setSubmitting(false);
  };

  const textFieldSx = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    "& .MuiInputBase-root": {
      height: 44,
      fontSize: "0.85rem",
    },
    "& .MuiInputBase-input": {
      padding: "0 12px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#e2e2e2",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#6d28d9",
      borderWidth: 1.5,
    },
    "& .MuiFormHelperText-root": {
      fontSize: "0.7rem",
      marginLeft: "4px",
    },
  };

  return (
    <Card
      ref={ref}
      elevation={0}
      className={`mx-auto rounded-[22px] p-6 w-full max-w-5xl transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-1">Get in touch</h2>
      <p className="text-sm text-gray-600 mb-4">
        Share your requirements and we’ll reach out shortly.
      </p>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-3">
          <TextField
            size="small"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            sx={textFieldSx}
          />
          <TextField
            size="small"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            sx={textFieldSx}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <TextField
            size="small"
            name="company"
            placeholder="Company Name"
            value={form.company}
            onChange={handleChange}
            fullWidth
            sx={textFieldSx}
          />
          <TextField
            size="small"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            fullWidth
            sx={textFieldSx}
          />
        </div>

        {/* ✅ SMALLER ICON + LESS PADDING */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={form.date}
            onChange={(v) => setForm((p) => ({ ...p, date: v }))}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                sx: {
                  ...textFieldSx,
                  "& .MuiInputAdornment-root svg": {
                    fontSize: "1rem", // 👈 smaller calendar icon
                  },
                },
                InputProps: { sx: { height: 44 } },
              },
              popper: {
                sx: {
                  "& .MuiPaper-root": {
                    minWidth: 210,
                    padding: "2px", // 👈 reduced padding
                    transform: "scale(0.85)",
                    transformOrigin: "top left",
                  },
                  "& .MuiPickersDay-root": {
                    width: 26,
                    height: 26,
                    fontSize: "0.7rem",
                    margin: "1px",
                  },
                  "& .MuiDayCalendar-weekDayLabel": {
                    width: 26,
                    fontSize: "0.65rem",
                  },
                  "& .MuiPickersFadeTransitionGroup-root": {
                    minHeight: 165,
                  },
                  "& .MuiPickersCalendarHeader-label": {
                    fontSize: "0.72rem",
                  },
                },
              },
            }}
          />
        </LocalizationProvider>

        <TextField
          size="small"
          select
          name="service"
          value={form.service}
          onChange={handleChange}
          fullWidth
          sx={textFieldSx}
        >
          {SERVICES.map((s) => (
            <MenuItem key={s} value={s} sx={{ fontSize: "0.85rem" }}>
              {s}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          size="small"
          name="message"
          placeholder="Write your message..."
          value={form.message}
          onChange={handleChange}
          multiline
          rows={3}
          error={!!errors.message}
          helperText={errors.message}
          fullWidth
          sx={{
            ...textFieldSx,
            "& .MuiInputBase-root": { minHeight: 44, fontSize: "0.85rem" },
          }}
        />

        <Button
          type="submit"
          disabled={submitting}
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            mt: 1,
            backgroundColor: "black",
            borderRadius: "999px",
            height: "38px",
            fontSize: "0.9rem",
            textTransform: "none",
          }}
        >
          {submitting ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </Card>
  );
}
