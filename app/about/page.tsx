"use client";

import { useEffect, useRef } from "react";
import { Container, Typography, Button, Stack, Avatar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUsSection() {
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const visionSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ======================
         ABOUT SECTION CONTENT
      ====================== */
      gsap.from("#about-us .about-content > *", {
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 60,
        stagger: 0.18,
        duration: 0.9,
        ease: "power1.out",
      });

      /* ======================
         ABOUT IMAGE
      ====================== */
      gsap.from("#about-us .about-image", {
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        scale: 0.88,
        duration: 1,
        ease: "power1.out",
      });

      /* ======================
         VISION SECTION CONTENT
      ====================== */
      gsap.from("#vision-section .vision-content > *", {
        scrollTrigger: {
          trigger: visionSectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        x: 60,
        stagger: 0.16,
        duration: 0.9,
        ease: "power1.out",
      });

      /* ======================
         VISION IMAGE
      ====================== */
      gsap.from("#vision-section .vision-image", {
        scrollTrigger: {
          trigger: visionSectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        x: -60,
        duration: 1,
        ease: "power1.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ABOUT SECTION */}
      <section
        ref={aboutSectionRef}
        id="about-us"
        className="
          bg-white
          min-h-[90vh]
          rounded-3xl
          overflow-hidden
          flex
          items-center
          px-4 sm:px-6 lg:px-10
        "
      >
        <Container maxWidth="xl" className="margin-top">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
            {/* LEFT CONTENT */}
            <div className="about-content flex-1 max-w-2xl text-center md:text-left">
              <Typography
                className="text-black"
                sx={{
                  fontSize: { xs: "22px", sm: "28px", md: "40px", lg: "58px" },
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                About Us
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px", md: "18px", lg: "20px" },
                  lineHeight: 1.75,
                  color: "#303030",
                  mb: 4,
                }}
              >
                At Aethel Flow, we believe the future of work should be
                seamless, intelligent, and human-centric. Founded with the
                vision of redefining automation, we are driven by the idea that
                technology should not only accelerate innovation but also
                inspire trust and clarity in every interaction.
              </Typography>

              <Button
                component={Link}
                variant="contained"
                href="/#services"
                sx={{
                  backgroundColor: "#000",
                  borderRadius: "999px",
                  px: 5,
                  py: 2,
                  fontSize: "15px",
                  textTransform: "none",
                  mb: 4,
                  "&:hover": { backgroundColor: "#232526" },
                }}
              >
                Explore our Services →
              </Button>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <Stack direction="row" spacing={-1}>
                  <Avatar />
                  <Avatar />
                  <Avatar />
                </Stack>

                <div>
                  <Typography fontSize={15}>⭐⭐⭐⭐⭐</Typography>
                  <Typography fontSize={13} color="grey">
                    Loved by users worldwide!
                  </Typography>
                </div>
              </Stack>
            </div>

            {/* RIGHT MEDIA */}
            <div className="about-image flex-1 w-full max-w-2xl">
              <div
                className="
                  relative
                  w-full
                  h-[220px] sm:h-[300px] md:h-[420px] lg:h-[520px]
                  rounded-2xl
                  overflow-hidden
                "
              >
                <Image
                  src="/aboutBG.png"
                  alt="About us"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* VISION SECTION */}
      <section
        ref={visionSectionRef}
        id="vision-section"
        className="w-full min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-10"
      >
        <Container maxWidth="xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
            {/* LEFT IMAGE */}
            <div className="vision-image flex-1 w-full flex justify-center">
              <div
                className="
                  relative
                  w-full
                  max-w-[700px]
                  h-[240px] sm:h-[300px] md:h-[420px] lg:h-[480px]
                  rounded-2xl
                  overflow-hidden
                "
              >
                <Image
                  src="/vision.png"
                  alt="About section"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="vision-content flex-1 max-w-xl text-center md:text-left">
              <Typography
                sx={{
                  color: "#000",
                  fontSize: { xs: "26px", sm: "32px", md: "40px", lg: "58px" },
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                Vision
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px", md: "17px", lg: "20px" },
                  lineHeight: 1.75,
                  color: "#3b3b3b",
                  mb: 5,
                }}
              >
                “At Aethel Flow, our vision is to redefine the future of work
                through intelligent automation that blends efficiency with
                human-like adaptability. We aim to empower businesses with
                seamless, scalable solutions that spark rapid innovation,
                foster meaningful connections, and create workflows that flow
                effortlessly into tomorrow’s possibilities.”
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <Button
                  component={Link}
                  href="/#contact"
                  variant="contained"
                  sx={{
                    backgroundColor: "#000",
                    borderRadius: "999px",
                    px: 4,
                    py: 1.6,
                    textTransform: "none",
                    fontSize: "15px",
                    "&:hover": { backgroundColor: "#1a1919" },
                  }}
                >
                  Get Started →
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "999px",
                    px: 4,
                    py: 1.6,
                    textTransform: "none",
                    fontSize: "15px",
                    color: "#111",
                    borderColor: "#111",
                    "&:hover": {
                      borderColor: "#000",
                      backgroundColor: "rgba(0,0,0,0.04)",
                    },
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
