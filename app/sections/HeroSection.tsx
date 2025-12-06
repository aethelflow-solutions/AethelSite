import AButton from "../components/AButton"
import Navbar from "../components/Navbar"
import { Button, Typography } from "@mui/material"

export default function HeroSection() {
    return (
        <section className="flex items-center bg-[url('/HeroSection-bg.jpg')] bg-cover h-screen text-white pt-32 pb-28 px-12 rounded-3xl ">
            <div className="w-full flex flex-col-2 items-center justify-between gap-6">
                <div className="flex flex-col justify-center px-36">
                    <Typography
                        variant="h3"
                        className="font-bold leading-tight"
                        sx={{ fontSize: { xs: "16px", md: "24px" } }}
                    >
                        Who we Are ?
                    </Typography>
                    <Typography
                        variant="body1"
                        className="leading-tight py-4"
                        sx={{ fontSize: { xs: "12px", md: "16px" } }}
                    >
                        Empowering businesses through cutting-edge technology solutions.
                        We transform your digital vision into reality with AI-driven automation,
                        development, and strategic consulting.
                    </Typography>
                    <AButton  
                        children="Learn More"
                        className="flex gap-4 mt-4"
                        variant="outlined"
                        sx={{
                                color: "white",
                                borderColor: "blue",
                                borderRadius: "50px",
                                paddingX: 4,
                                paddingY: 1.5,
                                textTransform: "none",
                                fontSize: "16px",
                        }}
                    />
                </div>
                {/* <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis eos nemo enim magni reiciendis! Accusamus suscipit eveniet sequi amet veritatis, id odit quia iste, velit nulla accusantium dolorum magni enim?</div> */}
            </div>
        </section>
    )

}
