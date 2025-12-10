import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
    return (
        <AppBar
            position="absolute"
            elevation={0}
            sx={{
                backgroundColor: "transparent",
                boxShadow: "none",
                paddingY: 1,
                top: 0,
                left: 0,
                right: 0,
                marginTop: "18px",  // DO NOT CHANGE POSITION
            }}
        >
            <Toolbar className="flex items-center justify-between">

                {/* LOGO */}
                <div className="flex items-center bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-xl">
                    <img
                        src="/aethel-logo.webp"
                        alt="Aethel Logo"
                        className="h-10 w-auto object-contain"
                    />
                </div>

                {/* MENU */}
                <div className="hidden md:flex gap-7 items-center mx-auto">
                    {["Home", "Services", "Contact"].map((item) => (
                        <Button
                            key={item}
                            sx={{
                                color: "#fff",
                                textTransform: "none",
                                fontSize: "16px",
                                borderRadius: "22px",
                                paddingX: 0.55,         
                                paddingY: 0.15,         
                                border: "1px solid rgba(135,206,250,0.45)", 
                                transition: "0.25s ease",

                                "&:hover": {
                                    backgroundColor: "rgba(135,206,250,0.18)", 
                                    borderColor: "rgba(135,206,250,0.90)",     
                                    boxShadow: "0 0 12px rgba(135,206,250,0.45)",
                                    transform: "translateY(-2px)",
                                },

                                "&:active": {
                                    transform: "scale(0.97)",
                                },
                            }}
                        >
                            {item}
                        </Button>
                    ))}
                </div>

                {/* ENQUIRE NOW BUTTON */}
                <div className="hidden md:flex">
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "rgba(135,206,250,0.45)",
                            color: "white",
                            paddingX: 2,
                            paddingY: 0.45,
                            fontSize: "15px",
                            borderRadius: "22px",  
                            marginRight: "12px",
                            textTransform: "none",
                            backgroundColor: "transparent",
                            transition: "0.3s ease",

                            "&:hover": {
                                backgroundColor: "rgba(135,206,250,0.18)",
                                borderColor: "rgba(135,206,250,0.90)",
                                boxShadow: "0 0 18px rgba(135,206,250,0.55)",
                                transform: "translateY(-2px)",
                            },

                            "&:active": {
                                transform: "scale(0.96)",
                            },
                        }}
                    >
                        Enquire Now
                    </Button>
                </div>

                {/* MOBILE MENU */}
                <div className="md:hidden">
                    <IconButton sx={{ color: "#fff" }}>
                        <MenuIcon />
                    </IconButton>
                </div>

            </Toolbar>
        </AppBar>
    );
}
