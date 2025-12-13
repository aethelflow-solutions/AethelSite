"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { TextField, MenuItem, Button, Card } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  date?: Dayjs | null;
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
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s-]{10,}$/;

const initialFormState: FormData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "AI Integration solutions",
  date: null,
  message: "",
};

export default function ContactForm(): React.JSX.Element {
  const [form, setForm] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!EMAIL_REGEX.test(form.email))
      newErrors.email = "Please enter a valid email";

    if (form.phone && !PHONE_REGEX.test(form.phone))
      newErrors.phone = "Please enter a valid phone number";

    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleTextChange = useCallback((e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleServiceChange = useCallback((e: any) => {
    setForm((prev) => ({ ...prev, service: e.target.value }));
  }, []);

  const handleDateChange = useCallback((value: Dayjs | null) => {
    setForm((prev) => ({ ...prev, date: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!validateForm()) return;

    console.log(form);

    setSubmitting(true);
    try {
      // Prepare template params
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        company: form.company || "N/A",
        phone: form.phone || "N/A",
        date: form.date ? form.date.format("MMMM DD, YYYY") : "N/A",
        service: form.service,
        message: form.message,
        reply_to_email: "baimomeen@gmail.com",
      };

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      console.log(response);
      if (response.status === 200) {
        setSubmitted(true);
        setForm(initialFormState);
      }
    } catch (err) {
      console.error("Failed to send email:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Better input style
  const textFieldSx = {
    backgroundColor: "#fff",
    borderRadius: "14px",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: "10px 12px",
      fontSize: "0.85rem",
      height: "20px",
      color: "#000",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#e1e1e1",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#999",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#6d28d9",
      borderWidth: 2,
    },
  };

  return (
    <Card
      elevation={0}
      ref={ref}
      className={`mx-auto rounded-[20px] p-4 md:p-5 w-full transform transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{
        background: "#ffffff",
        color: "#000",
        border: "none",
      }}
    >
      <h2 className="text-xl md:text-2xl font-semibold text-black mb-1">
        Get in touch
      </h2>

      <p className="text-xs text-gray-700 mb-3">
        {submitted
          ? "Thank you! We'll contact you soon."
          : "Fill out the form and we will contact you instantly!"}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
        {/* NAME + EMAIL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextField
            name="name"
            value={form.name}
            onChange={handleTextChange}
            placeholder="Your Name"
            required
            variant="outlined"
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
            sx={textFieldSx}
          />

          <TextField
            name="email"
            type="email"
            value={form.email}
            onChange={handleTextChange}
            placeholder="Email Address"
            required
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
            sx={textFieldSx}
          />
        </div>

        {/* COMPANY + PHONE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextField
            name="company"
            value={form.company}
            onChange={handleTextChange}
            placeholder="Company Name"
            variant="outlined"
            fullWidth
            sx={textFieldSx}
          />

          <TextField
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleTextChange}
            placeholder="Phone Number"
            variant="outlined"
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone}
            sx={textFieldSx}
          />
        </div>

        {/* DATE PICKER */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={form.date ?? null}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                placeholder: "Select a Date",
                fullWidth: true,
                variant: "outlined",
                sx: textFieldSx,
              },
            }}
          />
        </LocalizationProvider>

        {/* SERVICE DROPDOWN */}
        <TextField
          select
          name="service"
          value={form.service}
          onChange={handleServiceChange}
          fullWidth
          variant="outlined"
          sx={textFieldSx}
        >
          {SERVICES.map((service) => (
            <MenuItem key={service} value={service}>
              {service}
            </MenuItem>
          ))}
        </TextField>

        {/* MESSAGE */}
        <TextField
          name="message"
          value={form.message}
          onChange={handleTextChange}
          placeholder="Write your message..."
          required
          fullWidth
          variant="outlined"
          multiline
          rows={2}
          error={!!errors.message}
          helperText={errors.message}
          sx={textFieldSx}
        />

        <Button
          type="submit"
          variant="contained"
          disableElevation
          endIcon={<ArrowForwardIcon />}
          disabled={submitting}
          sx={{
            backgroundColor: "#6d28d9",
            color: "#fff",
            borderRadius: "999px",
            px: 4,
            py: 1,
            height: "36px",
            textTransform: "none",
            fontSize: ".9rem",
          }}
        >
          {submitting ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </Card>
  );
}
