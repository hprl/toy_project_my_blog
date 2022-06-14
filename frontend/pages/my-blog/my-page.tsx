import React, {useEffect, useState} from 'react';
import {Container, Grid, IconButton, styled} from "@mui/material";
import axios from "axios";
import styles from "../../styles/MyPage.module.css"
import {PhotoCamera} from "@mui/icons-material";

const Input = styled('input')({
    display: 'none',
});

const presetKey: any = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_KEY;
const uploadUrl: any = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL;

const MyPage = () => {
    const [user, setUser] = useState({
        userId: 0,
        username: "",
        email: "",
        image: "",
    })
    const [updateUser, setUpdateUser] = useState(false)
    const getUser = async () => {
        await axios.get(`http://localhost:8080/api/user/myPage/${sessionStorage.getItem("userId")}`)
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    useEffect(() => {
        getUser();
    }, [])

    const clickHandler = async () => {
        if (updateUser) {
            await axios.put("http://localhost:8080/api/user/update", user)
                .catch((err) => {
                    console.error(err);
                })
            setUpdateUser(!updateUser)
        } else {
            setUpdateUser(!updateUser)
        }
    }
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, username: e.target.value})
    }

    const changeImageHandler = async (e: any) => {

        const formData = new FormData();
        formData.append("file", e.target.files[0])
        formData.append("upload_preset", presetKey)

        await axios.post(uploadUrl, formData)
            .then((res) => {
                setUser({...user, image: res.data.secure_url})
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <Container className={styles.container} maxWidth="md">
            <h2>
                내 정보관리
            </h2>
            <hr/>
            <Grid container className={styles.box}>
                {
                    updateUser ?
                        <>
                            <Grid item xs={5}>
                                {
                                    user.image ?
                                        <img
                                            className={styles.image}
                                            src={user.image}
                                            alt="userImage"
                                        />
                                        :
                                        <img
                                            className={styles.image}
                                            src="/images/noImage.png"
                                            alt="userImage"
                                        />
                                }
                                <div className={styles.imageBtn}>
                                    <label htmlFor="icon-button-file">
                                        <Input
                                            accept="image/*"
                                            id="icon-button-file"
                                            type="file"
                                            onChange={changeImageHandler}
                                        />
                                        <IconButton
                                            color="inherit"
                                            aria-label="upload picture"
                                            component="span"
                                        >
                                            <PhotoCamera/>
                                        </IconButton>
                                    </label>
                                </div>
                            </Grid>

                            <Grid className={styles.userInfo} item xs={7}>
                                <input
                                    className={styles.text}
                                    type="text"
                                    value={user.username}
                                    placeholder="사용자이름"
                                    onChange={changeHandler}
                                />
                                <p>
                                    {user.email}
                                </p>
                                <p
                                    className={styles.submit}
                                    onClick={clickHandler}
                                >
                                    등록
                                </p>
                            </Grid>
                        </>
                        :
                        <>
                            {
                                user.image ?
                                <Grid item xs={5}>
                                    <img
                                        className={styles.image}
                                        src={user.image}
                                        alt="userImage"
                                    />
                                </Grid>
                                    :
                                    <Grid item xs={5}>
                                        <img
                                            className={styles.image}
                                            src="/images/noImage.png"
                                            alt="userImage"
                                        />
                                    </Grid>
                            }
                            <Grid item xs={7}>
                                <p>
                                    {user.username}
                                </p>
                                <p>
                                    {user.email}
                                </p>
                                <p
                                    className={styles.submit}
                                    onClick={clickHandler}
                                >
                                    수정
                                </p>
                            </Grid>
                        </>

                }
            </Grid>
        </Container>
    );
};

export default MyPage