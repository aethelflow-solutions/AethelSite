"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { TextField, MenuItem, Button, Card } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import emailjs from "@emailjs/browser";

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
];

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

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!EMAIL_REGEX.test(form.email))
      newErrors.email = "Please enter a valid email";

    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!PHONE_REGEX.test(form.phone))
      newErrors.phone = "Please enter a valid phone number";

    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const contactTemplateParams = {
        from_name: form.name,
        from_email: form.email,
        company: form.company || "N/A",
        phone: form.phone || "N/A",
        service: form.service,
        message: form.message,
        reply_to_email: process.env.NEXT_PUBLIC_EMAILJS_REPLY_TO_EMAIL!,
      };

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID!,
        contactTemplateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setForm(initialFormState);

        const welcomeTemplateParams = {
          from_name: form.name,
          from_email: form.email,
          service: form.service,
        };

        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_THANKYOU_TEMPLATE_ID!,
          welcomeTemplateParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        );
      }
    } catch (err) {
      console.error("Failed to send email:", err);
    } finally {
      setSubmitting(false);
    }
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

        <TextField
          id="contact-service"
          size="small"
          select
          name="service"
          value={form.service}
          onChange={handleChange}
          fullWidth
          sx={{
            ...textFieldSx,
            "& .MuiSelect-select": {
              color: form.service === "" ? "#9ca3af" : "#111827", // gray vs dark
            },
          }}
          SelectProps={{ displayEmpty: true }}
        >
          <MenuItem value="" disabled>
            Choose Category
          </MenuItem>

          {SERVICES.map((s) => (
            <MenuItem key={s} value={s}>
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
