// ContactForm.tsx
import React, { JSX, useState } from "react";
import {
    TextField,
    MenuItem,
    Button,
    Card,
    InputAdornment,
    IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { SelectChangeEvent } from "@mui/material/Select";

type FormData = {
    name: string;
    email: string;
    company: string;
    phone: string;
    service: string;
    message: string;
};

const SERVICES = [
    "AI Integration solutions",
    "Custom Software Development",
    "Automation & RPA",
    "Data & Analytics",
];

export default function ContactForm(): JSX.Element {
    const [form, setForm] = useState<FormData>({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        message: "",
    });

    const [submitting, setSubmitting] = useState(false);

    const handleTextChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        setForm((s) => ({ ...s, service: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        // Replace with real submit logic (API call)
        console.log("Submitting", form);
        await new Promise((r) => setTimeout(r, 700)); // demo delay

        setSubmitting(false);
        // reset or show success message
        // setForm({ name: "", email: "", company: "", phone: "", service: "", message: "" });
    };

    // Shared style for inputs to match screenshot: rounded soft bg, subtle outline only on focus
    const textFieldSx = {
        backgroundColor: "#f6f6f6",
        borderRadius: "12px",
        "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid rgba(0,0,0,0.06)",
        },
        "& .MuiOutlinedInput-root.Mui-focused": {
            boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.06)",
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000",
                borderWidth: 1,
            },
        },
        "& .MuiInputBase-input": {
            padding: "12px 14px",
            fontSize: "0.95rem",
        },
    };

    return (
        <Card
            elevation={0}
            className="max-w-2xl mx-auto bg-white rounded-2xl p-8 md:p-10 shadow-md"
        >
            <header className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Get in touch</h2>
                <p className="text-sm text-gray-600">
                    Just fill out the form and our global experts will be in touch right
                    away with package and price solution to help you!
                </p>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Two-column rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField
                        name="name"
                        value={form.name}
                        onChange={handleTextChange}
                        placeholder="Your Name"
                        fullWidth
                        variant="outlined"
                        sx={textFieldSx}
                        InputLabelProps={{ shrink: false }}
                    />
                    <TextField
                        name="email"
                        value={form.email}
                        onChange={handleTextChange}
                        placeholder="Email Address"
                        fullWidth
                        variant="outlined"
                        sx={textFieldSx}
                        InputLabelProps={{ shrink: false }}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField
                        name="company"
                        value={form.company}
                        onChange={handleTextChange}
                        placeholder="Company Name"
                        fullWidth
                        variant="outlined"
                        sx={textFieldSx}
                        InputLabelProps={{ shrink: false }}
                    />
                    <TextField
                        name="phone"
                        value={form.phone}
                        onChange={handleTextChange}
                        placeholder="Phone Number"
                        fullWidth
                        variant="outlined"
                        sx={textFieldSx}
                        InputLabelProps={{ shrink: false }}
                    />
                </div>

                {/* Service select (full width) */}
                <TextField
                    select
                    name="service"
                    value={form.service}
                    // onChange={handleSelectChange}
                    placeholder="AI Integration solutions"
                    fullWidth
                    variant="outlined"
                    sx={{ ...textFieldSx, px: 0 }}
                    InputLabelProps={{ shrink: false }}
                >
                    {/* Add an empty item so placeholder-like initially */}
                    <MenuItem value="">
                        <em>Select a service</em>
                    </MenuItem>
                    {SERVICES.map((s) => (
                        <MenuItem key={s} value={s}>
                            {s}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Message */}
                <TextField
                    name="message"
                    value={form.message}
                    onChange={handleTextChange}
                    placeholder="Kindly provide enough information about your business..."
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    sx={textFieldSx}
                />

                {/* Submit button */}
                <div className="pt-3">
                    <Button
                        type="submit"
                        variant="contained"
                        disableElevation
                        endIcon={<ArrowForwardIcon />}
                        className="rounded-full px-6 py-2 normal-case shadow-none"
                        sx={{
                            backgroundColor: "#161616",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#0f0f0f" },
                            textTransform: "none",
                        }}
                        disabled={submitting}
                    >
                        {submitting ? "Submitting..." : "Submit Request"}
                    </Button>
                </div>
            </form>
        </Card>
    );
}
