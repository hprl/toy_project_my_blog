import React, {useState} from 'react';
import {Box, Button, Modal} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "../../styles/Home.module.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoIcon from "@mui/icons-material/Info";
import {useRouter} from "next/router";
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

export const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface IProps {
    sort?: boolean
}

const MainPageBtn = (props: IProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const router = useRouter();


    return (
        <div className={styles.btn_container}>
            { props.sort ?
                <div>
                <Button
                    variant="contained"
                    color="info"
                >
                    <FavoriteIcon className={styles.icon}/>
                    인기글
                </Button>
                <Button
                    color="inherit"
                    onClick={() => {
                        router.push("/recent")
                    }}
                >
                    <AccessTimeIcon className={styles.icon}/> 최신글
                </Button>
            </div>
                :
                <div>
                    <Button
                        color="inherit"
                        onClick={() => {
                            router.push("/")
                        }}
                    >
                        <FavoriteIcon className={styles.icon}/>
                        인기글
                    </Button>
                    <Button
                        variant="contained"
                        color="info"
                    >
                        <AccessTimeIcon className={styles.icon}/> 최신글
                    </Button>
                </div>
            }

            <Button
                color="inherit"
                onClick={handleOpen}>
                <InfoIcon className={styles.icon}/>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <InstagramIcon />
                    <p>
                        @highperreal
                    </p>
                    <GitHubIcon/>
                    <p>
                        https://github.com/hprl
                    </p>
                    <GoogleIcon/>
                    <p>
                        114tla@gmail.com
                    </p>
                </Box>
            </Modal>
        </div>

    );
};

export default MainPageBtn;