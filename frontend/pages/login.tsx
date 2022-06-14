import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import axios from "axios";
import KakaoLogin from "react-kakao-login";
import GoogleLogin from "react-google-login";
import styles from "../styles/Login.module.css";
import {Box, Container, Typography} from "@mui/material";

interface User {
    provider: string | undefined,
    providerId: string,
    email: string,
    username: string,
}

interface UserDto {
    email: string,
}

const googleClientId: any = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const kakaoJsKey: any = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

const Login = () => {

    const router = useRouter();

    //로그인상태에서 login 페이지 진입 불가 설정
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            router.push("/")
        }
    }, [])

    //회원가입(최초 로그인시에만), 로그인
    const socialJoinLogin = async (userData: User, loginDto: UserDto) => {

        await axios.post("http://localhost:8080/api/user/join", userData)
            .then((res) => {
                console.log(res.data)

                axios.post("http://localhost:8080/api/login", loginDto)
                    .then((res) => {
                        sessionStorage.setItem("token", res.data.token);
                        sessionStorage.setItem("userId", res.data.id);
                        router.push("/");
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            })
            .catch((err) => {
                console.log(err)
            })

    }

    //구글 로그인 버튼
    const responseGoogle = async (res: any) => {

        const {googleId, email, name} = res.profileObj;

        const userData: User = {
            provider: process.env.NEXT_PUBLIC_PROVIDER_GOOGLE,
            providerId: googleId,
            email: email,
            username: name,
        }

        const loginDto: UserDto = {
            email: email,
        }

        await socialJoinLogin(userData, loginDto);

    }

    //카카오 로그인 버튼
    const responseKakao = async (res: any) => {

        const {id, kakao_account} = res.profile;
        const {email, profile} = kakao_account;
        const {nickname} = profile;

        const userData: User = {
            provider: process.env.NEXT_PUBLIC_PROVIDER_KAKAO,
            providerId: id,
            email: email,
            username: nickname,
        }

        const loginDto: UserDto = {
            email: email,
        }

        await socialJoinLogin(userData, loginDto);

    }

    return (

        <Container
            className={styles.container}
            maxWidth="sm"
        >
            <Typography
                className={styles.subtitle}
                variant="subtitle1"
                component="h2"
            >

                블로그에 로그인하세요

            </Typography>

            <Box className={styles.loginBox}>

                <GoogleLogin
                    clientId={googleClientId}
                    render={({onClick}) => (
                        <img
                            onClick={(e) => {
                                e.preventDefault();
                                onClick();
                            }}
                            className={styles.googleLogin}
                            src="/images/google.png"
                            alt="googleLogin"
                        />
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />

                <KakaoLogin
                    token={kakaoJsKey}
                    onSuccess={responseKakao}
                    onFail={responseKakao}
                    render={({onClick}) => (
                        <img
                            onClick={(e) => {
                                e.preventDefault();
                                onClick();
                            }}
                            className={styles.kakaoLogin}
                            src="/images/kakao.png" alt="kakaoLogin"
                        />
                    )}
                />

            </Box>
        </Container>
    );
};

export default Login;