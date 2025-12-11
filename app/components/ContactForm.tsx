"use client";

import React, { useState, useCallback } from "react";
import { TextField, MenuItem, Button, Card } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
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
  service: "",
  message: "",
};

export default function ContactForm(): React.JSX.Element {
  const [form, setForm] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (form.phone && !PHONE_REGEX.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleServiceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, service: e.target.value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      // TODO: Replace with actual API call
      console.log("Submitting", form);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setForm(initialFormState);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

    // Smaller height input style
    const textFieldSx = {
        backgroundColor: "#f6f6f6",
        borderRadius: "12px",
        "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid rgba(0,0,0,0.06)",
        },
        "& .MuiOutlinedInput-root.Mui-focused": {
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)",
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000",
                borderWidth: 1,
            },
        },
        "& .MuiInputBase-input": {
            padding: "10px 12px", // reduced height
            fontSize: "0.9rem",
        },
    };

  return (
    <Card
      elevation={0}
      className="mx-auto bg-white rounded-[40px] p-6 md:p-8 shadow-md w-full max-w-md"
    >
      <header className="mb-4">
        <h2 className="text-xl font-semibold mb-1">Get in touch</h2>
        <p className="text-sm text-gray-600 leading-tight">
          {submitted
            ? "Thank you! We'll contact you soon."
            : "Just fill out the form and we will contact you instantly!"}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TextField
            id="contact-name"
            name="name"
            value={form.name}
            onChange={handleTextChange}
            placeholder="Your Name"
            fullWidth
            required
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name}
            sx={textFieldSx}
            slotProps={{ htmlInput: { "aria-label": "Your name" } }}
          />

          <TextField
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleTextChange}
            placeholder="Email Address"
            fullWidth
            required
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email}
            sx={textFieldSx}
            slotProps={{ htmlInput: { "aria-label": "Email address" } }}
          />
        </div>

        {/* Row 2: Company & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TextField
            id="contact-company"
            name="company"
            value={form.company}
            onChange={handleTextChange}
            placeholder="Company Name"
            fullWidth
            variant="outlined"
            sx={textFieldSx}
            slotProps={{ htmlInput: { "aria-label": "Company name" } }}
          />

          <TextField
            id="contact-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleTextChange}
            placeholder="Phone Number"
            fullWidth
            variant="outlined"
            error={!!errors.phone}
            helperText={errors.phone}
            sx={textFieldSx}
            slotProps={{ htmlInput: { "aria-label": "Phone number" } }}
          />
        </div>

        {/* Service Select */}
        <TextField
          id="contact-service"
          select
          name="service"
          value={form.service}
          onChange={handleServiceChange}
          placeholder="Select a service"
          fullWidth
          variant="outlined"
          sx={textFieldSx}
          slotProps={{ htmlInput: { "aria-label": "Select a service" } }}
        >
          <MenuItem value="">
            <em>Select a service</em>
          </MenuItem>
          {SERVICES.map((service) => (
            <MenuItem key={service} value={service}>
              {service}
            </MenuItem>
          ))}
        </TextField>

        {/* Message */}
        <TextField
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleTextChange}
          placeholder="Write your message..."
          fullWidth
          required
          variant="outlined"
          multiline
          rows={3}
          error={!!errors.message}
          helperText={errors.message}
          sx={textFieldSx}
          slotProps={{ htmlInput: { "aria-label": "Your message" } }}
        />

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="contained"
            disableElevation
            endIcon={<ArrowForwardIcon />}
            disabled={submitting}
            sx={{
              backgroundColor: "#161616",
              color: "#fff",
              borderRadius: "50px",
              px: 3,
              py: 1.5,
              textTransform: "none",
              "&:hover": { backgroundColor: "#0f0f0f" },
              "&:disabled": { backgroundColor: "#666", color: "#ccc" },
            }}
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
