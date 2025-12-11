import { Typography } from "@mui/material";
import Image from "next/image";
import ContactForm from "../components/ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="flex flex-col">
      <div>
        {/* Heading */}
        <div className="lg:py-10 py-6 flex justify-center">
          <h2 className="text-black font-semibold text-3xl">Our Partners</h2>
        </div>

        {/* MAIN WRAPPER */}
        <div className="px-3 sm:px-4 lg:px-6">
          <div
            className="w-full min-h-[70vh] grid grid-cols-1 lg:grid-cols-2 bg-black 
                        rounded-[20px]"
          >
            {/* LEFT SECTION */}
            <div className="flex items-center text-white">
              <div className="w-full px-6 md:px-10 lg:px-12 py-10">
                <Typography
                  variant="body1"
                  className="leading-tight font-light text-gray-300"
                  sx={{ fontSize: { xs: "14px", md: "16px" }, opacity: 0.9 }}
                >
                  We&apos;re here to answer all questions
                </Typography>

                <Typography
                  variant="h2"
                  className="font-semibold py-4"
                  sx={{
                    fontSize: { xs: "26px", md: "36px" },
                    lineHeight: "1.2",
                  }}
                >
                  One Stop Solution for all the Services
                </Typography>

                <Typography
                  variant="body1"
                  className="leading-tight font-light"
                  sx={{ fontSize: { xs: "14px", md: "15px" }, opacity: 0.85 }}
                >
                  Subline for the mission statement is needed here
                </Typography>

                <Typography
                  variant="body1"
                  className="leading-relaxed font-light pt-4 pb-2"
                  sx={{ fontSize: { xs: "11px", md: "13px" }, opacity: 0.9 }}
                >
                  Let’s transform your enterprise. Partner with Aethel Flow from
                  strategy to implementation — we help solve your business
                  problems across multiple functions and platforms for rapid
                  innovation and boundless growth.
                </Typography>

                {/* NEW INFO BLOCKS */}
                <div className="flex flex-col gap-6 mt-6">
                  {/* BLOCK 1 */}
                  <div className="flex items-start gap-4">
                    <Image
                      src="/Icon.png"
                      alt="Envision icon"
                      width={32}
                      height={32}
                      className="object-contain"
                    />

                    <div>
                      <h3 className="text-white text-lg font-semibold">
                        Envision The Extraordinary
                      </h3>

                      <p className="text-gray-300 text-sm mt-1 font-light leading-relaxed">
                        Imagine what your business can achieve with the right
                        technology.
                      </p>
                    </div>
                  </div>

                  {/* BLOCK 2 */}
                  <div className="flex items-start gap-4">
                    <Image
                      src="/Icon (1).png"
                      alt="Creative process icon"
                      width={32}
                      height={32}
                      className="object-contain"
                    />

                    <div>
                      <h3 className="text-white text-lg font-semibold">
                        Immersive Creative Process
                      </h3>

                      <p className="text-gray-300 text-sm mt-1 font-light leading-relaxed">
                        We design and build experiences that transform
                        businesses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION — FORM */}
            <div className="flex items-center justify-center py-14 px-6 md:px-10 lg:px-12">
              <div className="w-full max-w-sm">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
