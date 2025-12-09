// ContactForm.tsx
import React, { JSX, useState } from "react";
import {
    TextField,
    MenuItem,
    Button,
    Card,
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

        console.log("Submitting", form);
        await new Promise((r) => setTimeout(r, 700));

        setSubmitting(false);
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

              // increased width, reduced padding
        >
            <header className="mb-4">
                <h2 className="text-xl font-semibold mb-1">Get in touch</h2>
                <p className="text-sm text-gray-600 leading-tight">
                    Just fill out the form and we will contact you instantly!
                </p>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                {/* Select */}
               <TextField
    select
    name="service"
    value={form.service}
    onChange={(e) => setForm((s) => ({ ...s, service: e.target.value }))}
    placeholder="Select a service"
    fullWidth
    variant="outlined"
    sx={textFieldSx}
    InputLabelProps={{ shrink: false }}
>
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
                    placeholder="Write your message..."
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}  
                    sx={textFieldSx}
                />

                {/* Submit */}
                <div className="pt-2">
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
