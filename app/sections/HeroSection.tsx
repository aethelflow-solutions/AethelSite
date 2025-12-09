import AButton from "../components/AButton"
import Navbar from "../components/Navbar"
import { Button, Typography } from "@mui/material"

export default function HeroSection() {
    return (
        <section className="flex flex-col  bg-[url('/Image-BG.png')] bg-cover h-screen text-white pt-5 pb-28 px-12 rounded-3xl ">
            <div className="w-full flex items-center justify-between px-4 py-4">
                <div className="">
                    <img src="" alt="" />
                    <h1 className="font-medium text-3xl ">Aethel Flow</h1>
                    </div>
                <div className="flex gap-8 justify-center ">
                    <button className="navbutton-hover font-bold px-4 py-2 rounded-3xl cursor-pointer"><a href="">Home</a></button>
                    <button className="font-bold cursor-pointer navbutton-hover px-4 py-2 rounded-3xl"><a href="#services">Services</a></button>
                    <button className="font-bold cursor-pointer navbutton-hover px-4 py-2 rounded-3xl"><a href="#mission">Mission</a></button>
                    <button className="font-bold cursor-pointer navbutton-hover px-4 py-2 rounded-3xl"><a href="#contact">Contact</a></button>
                </div>
                <div>
                    <button className="px-10 border-2 py-2 rounded-3xl transition-all hover:border-[#6549F6] hover:bg-[#6549F6]"><a href="#contact">Enquire here</a></button>
                </div>
            </div>
            <div className="w-[70vw] flex flex-col-2 items-center justify-between gap-6 mt-70">
                <div className="flex flex-col justify-center px-28">
                    <Typography
                        variant="h3"
                        className="font-bold leading-tight"
                        sx={{ fontSize: { xs: "16px", md: "24px", xl: "40px" } }}
                    >
                        Seamless automation. Endless innovation
                    </Typography>
                    <Typography
                        variant="body1"
                        className="leading-tight py-4"
                        sx={{ fontSize: { xs: "12px", md: "16px" ,xl: "20px" } }}
                    >
                        At Aethel Flow, we harness AI and automation to streamline workflows, spark innovation, and empowering businesses to move faster, seamless, intelligent solutions for a future that flows effortlessly.
                    </Typography>
                    <AButton  
                        children="Contact Us"
                        className="flex gap-4 mt-4"
                        variant="outlined"
                        sx={{
                                color: "white",
                                border : "none",
                                backgroundColor : "#6549F6",
                                borderRadius: "50px",
                                paddingX: 6,
                                paddingY: 2.5,
                                textTransform: "none",
                                fontSize: "18px",
                                
                        }}
                    />
                </div>
                {/* <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis eos nemo enim magni reiciendis! Accusamus suscipit eveniet sequi amet veritatis, id odit quia iste, velit nulla accusantium dolorum magni enim?</div> */}
            </div>
        </section>
    )

}
