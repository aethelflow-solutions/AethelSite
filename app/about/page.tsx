import { Container, Typography, Button, Stack, Avatar } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function AboutUsSection() {
  return (
    <section
      id="about-us"
      className="
      min-h-screen
      mx-4 md:mx-8
      px-6 md:px-12
      py-16 md:py-20
      rounded-3xl
      overflow-hidden
      bg-cover
      bg-center
      flex
      items-center
  "
      style={{ backgroundImage: "url('/aboutBG1.jpg')" }}
    >
      <Container maxWidth="xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
          {/* LEFT CONTENT */}
          <div className="flex-1 max-w-xl">
            <Typography
              sx={{
                fontSize: { xs: "32px", md: "48px" },
                fontWeight: 600,
                mb: 2,
              }}
            >
              About Us
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "14px", md: "16px", lg: "17px" },
                lineHeight: 1.7,
                color: "white",
                mb: 4,
              }}
            >
              At Aethel Flow, we believe the future of work should be seamless,
              intelligent, and human-centric. Founded with the vision of
              redefining automation, we are driven by the idea that technology
              should not only accelerate innovation but also inspire trust and
              clarity in every interaction.
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6C4DFF",
                borderRadius: "999px",
                px: 4,
                py: 1.6,
                textTransform: "none",
                mb: 4,
                "&:hover": { backgroundColor: "#5a3fe0" },
              }}
            >
              Explore our Services →
            </Button>

            <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" spacing={-1}>
                <Avatar />
                <Avatar />
                <Avatar />
              </Stack>

              <div>
                <Typography fontSize={14}>⭐⭐⭐⭐⭐</Typography>
                <Typography fontSize={12} color="grey">
                  Loved by users worldwide!
                </Typography>
              </div>
            </Stack>
          </div>

          {/* RIGHT MEDIA */}
          <div className="flex-1 w-full max-w-2xl">
            <div className="w-full h-[240px] sm:h-[300px] md:h-[380px] lg:h-[440px] bg-[#2b2b2b] rounded-2xl flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer">
                <PlayArrowIcon className="text-white text-4xl md:text-5xl" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
