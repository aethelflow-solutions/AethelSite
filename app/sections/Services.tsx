import MediaCardServices from '../components/MediaCardServices'
import { cardsData } from '../data/data'
import { Box } from '@mui/material'
import Button from "@mui/material/Button";
import { ArrowRight } from 'lucide-react';

export default function Services() {
    return (
        <section id='services' className="py-24 bg-white ">
            <div className="text-center text-black mb-12 pb-12">
                <h2 className="text-4xl font-medium ">
                    Our Services
                </h2>
                <h4 className="text-xl font-normal mt-5" >
                    Comprehensive technology solutions tailored to accelerate your digital journey
                    and drive sustainable business growth.
                </h4>
            </div>
            <div className='lg:px-32 mx-24' >
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-8">
                    {cardsData.map((card) => (
                            
                        <Box key={card.id} sx={{ display: "flex", justifyContent: "center", paddingBottom: "5%" }} >
                                <MediaCardServices key={card.id} data={card} />
                        </Box>
                            
                    ))}
                </div>
            </div>

            <div className='mt-4 flex flex-col justify-center items-center' >
                <h4 className='text-center text-black py-2'>
                    Get custom solutions for your business that help you leverage AI and
                    Automation for the processes. Talk to an expert!
                </h4>
                <Button
                    variant="contained"
                    disableElevation
                    className="cta-button"
                    sx={{
                        mt: 2,
                        backgroundColor: "black",
                        color: "white",
                        borderRadius: "50px",
                        px: { xs: 3, sm: 4, md: 5 },     // responsive padding X
                        py: { xs: 1, sm: 1.4, md: 1.8 }, // responsive padding Y
                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                        fontWeight: 600,
                    }}
                >
                    Get Start Now <ArrowRight size={18} />
                </Button>
            </div>

        </section>
    )
}
