import { Container, Typography, Button, Stack, Avatar } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function AboutUsSection() {
  return (
    <>
      <section
        id="about-us"
        className="
        min-h-[100vh]
        rounded-3xl
        overflow-hidden
        bg-cover
        bg-center
        flex
        items-center
      "
        style={{ backgroundImage: "url('/aboutBG.jpg')" }}
      >
        <Container maxWidth="xl" disableGutters>
          <div className="flex flex-col md:flex-row items-center justify-between gap-14 md:gap-24">
            {/* LEFT CONTENT */}
            <div className="flex-1 max-w-2xl">
              <Typography
                className="animate-fade-up delay-1 text-[#c7a2ff]"
                sx={{
                  fontSize: { xs: "16px", md: "32px", lg: "50px" },
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                About Us
              </Typography>

              <Typography
                className="animate-fade-up delay-2"
                sx={{
                  fontSize: { xs: "14px", md: "18px" },
                  lineHeight: 1.75,
                  color: "white",
                  mb: 4,
                }}
              >
                At{" "}
                <span className="text-amber-200 italic cursor-pointer">
                  Aethel Flow
                </span>
                , we believe the future of work should be seamless, intelligent,
                and human-centric. Founded with the vision of redefining
                automation, we are driven by the idea that technology should not
                only accelerate innovation but also inspire trust and clarity in
                every interaction.
              </Typography>

              <Button
                className="animate-fade-up delay-3 scale-hover"
                variant="contained"
                sx={{
                  backgroundColor: "#692ac8",
                  borderRadius: "999px",
                  px: 5,
                  py: 2,
                  fontSize: "16px",
                  textTransform: "none",
                  mb: 4,
                  "&:hover": { backgroundColor: "#5a24a8" },
                }}
              >
                Explore our Services →
              </Button>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                className="animate-fade-up delay-4"
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
            <div className="flex-1 w-full max-w-2xl animate-fade-up delay-2">
              <div className="w-full h-[260px] sm:h-[320px] md:h-[420px] lg:h-[520px] bg-[#2b2b2b] rounded-2xl flex items-center justify-center">
                <div className="w-18 h-18 md:w-22 md:h-22 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer scale-hover">
                  <PlayArrowIcon className="text-white text-4xl md:text-5xl" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="w-full min-h-[100vh] flex items-center">
        <Container maxWidth="xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
            {/* LEFT IMAGE PLACEHOLDER */}
            <div className="flex-1 w-full flex justify-center">
              {/* Image will be inserted here later */}
              <div className="w-full max-w-[520px] h-[280px] sm:h-[340px] md:h-[420px] lg:h-[480px] rounded-2xl bg-[#e5e5e5]" />
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex-1 max-w-xl text-center md:text-left">
              <Typography
                sx={{
                  color: "black",
                  fontSize: { xs: "30px", md: "40px", lg: "48px" },
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                Vision
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "15px", md: "17px", lg: "18px" },
                  lineHeight: 1.75,
                  color: "#444",
                  mb: 5,
                }}
              >
                “At Aethel Flow, our vision is to redefine the future of work
                through intelligent automation that blends efficiency with
                human-like adaptability. We aim to empower businesses with
                seamless, scalable solutions that spark rapid innovation, foster
                meaningful connections, and create workflows that flow
                effortlessly into tomorrow’s possibilities.”
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#692ac8",
                    borderRadius: "999px",
                    px: 4,
                    py: 1.6,
                    textTransform: "none",
                    fontSize: "15px",
                    "&:hover": { backgroundColor: "#5a24a8" },
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
