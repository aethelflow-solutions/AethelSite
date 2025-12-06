import { Typography } from "@mui/material"
import AButton from "../components/AButton"
import { ArrowRight, Contact } from "lucide-react";
import ContactForm from "../components/ContactForm";


export default function ContactSection() {
    return (
        <section className="flex flex-col" >
            <div>
                <div className="lg:py-12 py-8 flex justify-center">
                    <h2 className="text-blue-800" >Our Partners</h2>
                </div>
                <div className="sm:p-4 lg:p-8">
                    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-black rounded-[50px]">
                        <div className="grid grid-rows-2" >
                            <div className="flex items-center  justify-center text-white">
                                <div className="items-start lg:px-32 md:px-24">
                                    <Typography
                                        variant="body1"
                                        className="leading-tight py-4"
                                        sx={{ fontSize: { xs: "12px", md: "16px" }, opacity: 0.8 }}
                                    >
                                        We're here to answer all questions
                                    </Typography>

                                    <Typography
                                        variant="h2"
                                        className="font-normal leading-tight"
                                        sx={{ fontSize: { xs: "24px", md: "48px" } }}
                                    >
                                        One Stop Solution for all the
                                        Services
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        className="leading-tight py-4"
                                        sx={{ fontSize: { xs: "12px", md: "16px" }, opacity: 0.8 }}
                                    >
                                        Subline for the mission statement is needed here
                                    </Typography>
                                    <div className="flex">
                                        <AButton
                                            variant="contained"
                                            sx={{
                                                mt: 2,
                                                backgroundColor: "white",
                                                color: "black",
                                                borderRadius: "50px",
                                                paddingX: 3,
                                                paddingY: 1.2,
                                                marginRight: 2,
                                                textTransform: "none",
                                                fontWeight: 600,
                                                alignSelf: "flex-start",
                                                "&:hover": { backgroundColor: "#eaeaea" },
                                            }}
                                        >Get Started <ArrowRight size={18} /></AButton>
                                        <AButton
                                            variant="contained"
                                            sx={{
                                                mt: 2,
                                                border: "1px solid white",
                                                backgroundColor: "black",
                                                color: "white",
                                                borderRadius: "50px",
                                                paddingX: 2.5,
                                                paddingY: 1.2,
                                                textTransform: "none",
                                                fontWeight: 600,
                                                alignSelf: "flex-start",
                                            }}
                                        >Learn More</AButton>
                                    </div>
                                </div>
                                <div className="">

                                </div>
                            </div>
                        </div>
                        <div className="flex items-center py-2 lg:pr-32 justify-items-start">
                            <ContactForm />
                        </div>``
                    </div>
                </div>
            </div>
        </section>
    )
}