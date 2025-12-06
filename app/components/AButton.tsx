import { Button , ButtonProps} from "@mui/material";

interface AButtonProps extends ButtonProps {    
    className?: string;
}

export default function AButton({ children  , className , sx = {}, ...rest } : AButtonProps) {
    return (
        <div className={`${className ?? ""}`}>
            <Button
                sx={{
                    borderRadius: "50px",
                    textTransform: "none",
                    ...sx,
                }}
                {...rest}
            >
                {children}
            </Button>
        </div>
    );
}
