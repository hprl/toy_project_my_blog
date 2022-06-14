import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Link from 'next/link';
import {Box, Container, Grid, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './header.module.css';

const Header = () => {

        const router = useRouter();
        // Login 상태 체크 true: 비로그인, false: 로그인
        const [isLogin, setIsLogin] = useState(true);
        // 서브메뉴 활성화, 비활성화 true: 활성화, false: 비활성화
        const [showSubMenu, setShowSubMenu] = useState(false);

        // 실시간 로그인상태 체크 세션 스토리지 내 토큰값 없으면 비로그인 상태로 설정
        useEffect(() => {
            if (sessionStorage.getItem("token")) {
                setIsLogin(false);
            }
        },)

        //로그아웃 클릭 이벤트
        const logoutClick = () => {
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("userId")
            setIsLogin(true);
            setShowSubMenu(false);
            router.push("/")
        }

        //서브메뉴 클릭 이벤트
        const subMenuClick = () => {
            if (showSubMenu === false) {
                setShowSubMenu(true);
            } else {
                setShowSubMenu(false);
            }
        }

        const subMenuOffClick = () => {
            setShowSubMenu(false)
        }

        return (
            <>
                {isLogin ?
                    <Box className={styles.box}>
                        <Container maxWidth="xl">
                            <Grid container>

                                <Grid item xs={10}>
                                    <Link href="/">
                                        <a className={styles.a} onClick={subMenuOffClick}>
                                            <Typography
                                                className={styles.home_btn}
                                                variant="subtitle1"
                                                component="h1"
                                            >
                                                hyperLog

                                            </Typography>
                                        </a>
                                    </Link>
                                </Grid>

                                <Grid
                                    className={styles.header_container}
                                    item
                                    xs={1}
                                >
                                    <Link href="/search">
                                        <a className={styles.a}>
                                            <SearchIcon className={styles.search_btn}/>
                                        </a>
                                    </Link>
                                </Grid>

                                <Grid className={styles.header_container} item xs={1}>
                                    <Link href="/login">
                                        <a className={styles.a}>
                                            <Typography
                                                className={styles.header_btn}
                                                variant="caption"
                                                component="p"
                                            >
                                                로그인

                                            </Typography>
                                        </a>
                                    </Link>
                                </Grid>

                            </Grid>
                        </Container>
                    </Box>

                    :

                    <Box className={styles.box}>
                        <Container maxWidth="xl">
                            <Grid container>

                                <Grid
                                    item
                                    sm={9}
                                    xs={7}
                                >
                                    <Link href="/">
                                        <a
                                            className={styles.a}
                                            onClick={subMenuOffClick}
                                        >
                                            <Typography
                                                className={styles.home_btn}
                                                variant="subtitle1"
                                                component="h1"
                                            >

                                                hyperLog

                                            </Typography>
                                        </a>
                                    </Link>
                                </Grid>

                                <Grid
                                    className={styles.header_container}
                                    item
                                    sm={1}
                                    xs={1}
                                >
                                    <Link href="/search">
                                        <a className={styles.a}>
                                            <SearchIcon
                                                className={styles.search_btn}
                                                onClick={subMenuOffClick}
                                            />
                                        </a>
                                    </Link>
                                </Grid>

                                <Grid
                                    className={styles.header_container}
                                    item
                                    sm={1}
                                    xs={2}>
                                    <Typography
                                        className={styles.my_blog_btn}
                                        variant="caption"
                                        component="p"
                                        onClick={subMenuClick}
                                    >
                                        내 블로그
                                    </Typography>
                                </Grid>

                                <Grid
                                    className={styles.header_container}
                                    item
                                    sm={1}
                                    xs={2}
                                >
                                            <Typography
                                                className={styles.header_btn}
                                                variant="caption"
                                                component="p"
                                                onClick={logoutClick}
                                            >

                                                로그아웃

                                            </Typography>
                                </Grid>

                            </Grid>
                        </Container>
                    </Box>
                }

                {showSubMenu &&
                    <Box className={styles.sub_menu}>
                        <Container>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Link href="/my-blog/write">
                                        <a className={styles.a} onClick={subMenuOffClick}>
                                            <Typography
                                                className={styles.header_btn}
                                                variant="caption"
                                                component="h3"
                                            >

                                                새 글 작성

                                            </Typography>
                                        </a>
                                    </Link>
                                </Grid>
                                <Grid item xs={3}>
                                    <Link href={`/my-blog/bookmark/${sessionStorage.getItem("userId")}`}>
                                        <a className={styles.a} onClick={subMenuOffClick}>
                                            <Typography
                                                className={styles.header_btn}
                                                variant="caption"
                                                component="h3"
                                            >

                                                책갈피

                                            </Typography>
                                        </a>
                                    </Link>
                                </Grid>
                                <Grid item xs={3}>
                                    <Link href={`/user/detail/${sessionStorage.getItem("userId")}`}>
                                        <a className={styles.a} onClick={subMenuOffClick}>
                                            <Typography
                                                className={styles.header_btn}
                                                variant="caption"
                                                component="h3"
                                            >

                                                내 글 관리

                                            </Typography>
                                        </a>
                                    </Link>
                                </Grid>
                                <Grid item xs={3}>
                                    <Link href="/my-blog/my-page">
                                        <a className={styles.a} onClick={subMenuOffClick}>
                                            <Typography
                                                className={styles.header_btn}
                                                variant="caption"
                                                component="h3"
                                            >

                                                내 정보관리

                                            </Typography>
                                        </a>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                }
            </>
        );
    }
;

export default Header;