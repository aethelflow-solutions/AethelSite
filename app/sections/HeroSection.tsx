import AButton from "../components/AButton";
import { Typography } from "@mui/material";

export default function HeroSection() {
    return (
        <section className="flex items-center bg-[url('/HeroSection-bg.jpg')] bg-cover h-screen text-white pt-32 pb-28 px-6 rounded-3xl">
            <div className="w-full flex flex-col items-center md:items-start justify-center gap-6 max-w-3xl mx-auto text-center md:text-left">

                <Typography
                    variant="h3"
                    className="font-bold leading-tight"
                    sx={{ fontSize: { xs: "24px", md: "38px" } }}
                >
                    Supercharge your operations with AI that delivers Seamless automation
                </Typography>

                <Typography
                    variant="body1"
                    className="leading-tight"
                    sx={{ fontSize: { xs: "14px", md: "18px" } }}
                >
                    At Aethel Flow, we harness AI and automation to streamline workflows,
                    spark innovation, and empower businesses to move faster with seamless,
                    intelligent solutions for a future that flows effortlessly.
                </Typography>

                <div className="mt-4">
                    <AButton
                        children="Contact Us"
                        className="flex gap-4"
                        variant="outlined"
                        sx={{
                            color: "white",
                            borderColor: "white",
                            borderRadius: "50px",
                            paddingX: 4,
                            paddingY: 1.5,
                            textTransform: "none",
                            fontSize: "16px",
                        }}
                        onClick={() => {
                            document
                                .getElementById("contact")
                                ?.scrollIntoView({ behavior: "smooth" });
                        }}
                    />
                </div>

            </div>
        </section>
    );
}
