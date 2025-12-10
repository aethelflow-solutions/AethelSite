import { Typography } from "@mui/material"
import GridDistortion from "../utils/GridDistortion";
import FloatingLines from "../utils/FloatingLines";
import Prism from "../utils/Prism";
import MediaCardMission from "../components/MediaCardMission";
import { MediaCardMission1 } from "../components/MediaCardMission";
import { CardData } from "../data/data";

const data: CardData = {
    id: 1,
    title: "Full Stack Development",
    description: "Design and deploy AI/ML models for automation, predictive analytics, and intelligent decision-making.",
    icon: "../../static/AI.png",
};

export default function MissionSection() {
    return (
        <section id="mission" className="relative bg-[length:600px_600px] bg-no-repeat bg-center flex justify-center bg-[#1B1A1A] min-h-[130vh] text-white rounded-[50px] " style={{backgroundImage: "url(/Image2.png)"}} >
            {/* <div className="absolute w-full h-full">
                <Prism
                    animationType="rotate"
                    timeScale={0.2}
                    height={3.5}
                    baseWidth={3.5}
                    scale={3.6}
                    hueShift={0}
                    colorFrequency={1}
                    noise={0.0}
                    glow={1}
                />
            </div> */}

            <div className="grid grid-rows-[1fr_3fr] z-10 relative w-full" >
                <div className="flex flex-col items-center justify-center">
                    <Typography
                        variant="body1"
                        className="leading-tight py-4"
                        sx={{ fontSize: { xs: "12px", md: "16px" }, opacity: 0.8 }}
                    >
                        Our Vision
                    </Typography>

                    <Typography
                        variant="h2"
                        className="font-bold leading-tight"
                        sx={{ fontSize: { xs: "24px", md: "48px" } }}
                    >
                        Mission Statement
                    </Typography>
                    <Typography
                        variant="body1"
                        className="leading-tight py-4"
                        sx={{ fontSize: { xs: "12px", md: "16px" }, opacity: 0.8 }}
                    >
                        Subline for the mission statement is needed here
                    </Typography>
                </div>
                {/* </div> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" >
                    <div className="flex flex-col justify-center items-end gap-6 pr-4" >
                        <div className="my-2 pb-8" >
                            <MediaCardMission1 key={data.id} data={data} />
                        </div>
                        <div className="my-2 pt-8">
                            <MediaCardMission1 key={data.id} data={data} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-6 pl-4 md:pt-24" >
                        <div className="my-2 pb-8 ">
                            <MediaCardMission1 key={data.id} data={data} />
                        </div>
                        <div className="my-2 pt-8">
                            <MediaCardMission1 key={data.id} data={data} />
                        </div>
                    </div>

                </div>

            </div>

        </section>
    )

}
