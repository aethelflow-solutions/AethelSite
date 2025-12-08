import { Typography } from "@mui/material";
import ContactForm from "../components/ContactForm";

export default function ContactSection() {
    return (
        <section id="contact" className="flex flex-col">
            <div>
                {/* Heading */}
                <div className="lg:py-12 py-8 flex justify-center">
                    <h2 className="text-blue-800 font-semibold text-3xl">Our Partners</h2>
                </div>

                <div className="sm:p-4 lg:p-8">
                    <div className="w-full min-h-[80vh] grid grid-cols-1 lg:grid-cols-2 bg-black rounded-[40px]">

                        {/* LEFT SECTION */}
                        <div className="flex items-center text-white">
                            <div className="w-full px-6 md:px-16 lg:px-20 py-10">

                                <Typography
                                    variant="body1"
                                    className="leading-tight"
                                    sx={{ fontSize: { xs: "13px", md: "16px" }, opacity: 0.8 }}
                                >
                                    We're here to answer all questions
                                </Typography>

                                <Typography
                                    variant="h2"
                                    className="font-normal leading-tight py-4"
                                    sx={{ fontSize: { xs: "26px", md: "44px" } }}
                                >
                                    One Stop Solution for all the Services
                                </Typography>

                                <Typography
                                    variant="body1"
                                    className="leading-tight py-2"
                                    sx={{ fontSize: { xs: "13px", md: "15px" }, opacity: 0.8 }}
                                >
                                    Subline for the mission statement is needed here
                                </Typography>

                                {/* MAIN TEXT beside form */}
                                <Typography
                                    variant="body1"
                                    className="leading-relaxed py-4"
                                    sx={{ fontSize: { xs: "13px", md: "16px" }, opacity: 0.9 }}
                                >
                                    Let’s transform your enterprise. Partner with Aethel Flow from strategy
                                    to implementation — we help solve your business problems across multiple
                                    functions and platforms for rapid innovation and boundless growth.
                                </Typography>

                            </div>
                        </div>

                        {/* RIGHT SECTION - FORM */}
                        <div className="flex items-center justify-center py-10 px-6 md:px-16 lg:px-20">
                            <div className="w-full max-w-md">
                                <ContactForm />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
