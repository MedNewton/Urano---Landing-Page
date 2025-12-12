import { Stack, Typography, Link, Box } from "@mui/material";
import Image from "next/image";
import theme from "@/theme/theme";

import logo from "@/assets/images/logos/logo-turquoise-1.webp"
import rocketIcon from "@/assets/images/icons/rocket.svg?url"

const Header = () => {
    return (
        <Stack component="header" sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            mx: "auto",
            zIndex: 1000,
            width: "70%",
            mt: 2,
            borderRadius: "0.5rem",
            border: "1px solid rgba(85, 85, 85, 0.30)",
            background: "rgba(21, 21, 21, 0.71)",
            backdropFilter: "blur(5.699999809265137px)",
            minHeight: "4.3125rem",
            padding: "0 0.8125rem",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
            <Link href="https://www.uranoecosystem.com/">
                <Image src={logo} alt="Logo" width={120} height={70} />
            </Link>
            <Link href="/profile" underline="none">
                <Box sx={{
                    background: { xs: theme.palette.uranoGradient, lg: theme.palette.uranoGradient },
                    border: `1px solid ${theme.palette.headerBorder.main}`,
                    borderRadius: 2,
                    paddingX: { xs: 1.5, lg: 2 },
                    paddingY: { xs: 1.5, lg: 1 },
                    marginRight: 1,
                    gap: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    "&:hover": {
                        background: theme.palette.uranoGradient,
                        "&:hover .connectWalletLink": {
                            color: theme.palette.info.main,
                        },
                    },
                }}>
                    <Typography variant="body1" fontWeight={400} className="connectWalletLink" sx={{
                        color: { xs: theme.palette.background.default, lg: theme.palette.background.default }
                    }}>Launch uApp</Typography>
                    <Stack direction="row" alignItems="center" justifyContent="center" width={16} height={16} component="div">
                        <Image src={rocketIcon} alt="Rocket Icon" width={16} height={16} />
                    </Stack>
                </Box>
            </Link>

        </Stack>
    );
};

export default Header;