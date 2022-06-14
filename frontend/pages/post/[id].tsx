import React, {useEffect, useState} from 'react';
import axios from "axios";
import {GetStaticProps} from "next";
import {ParsedUrlQuery} from "querystring";
import {Post} from "../../components/post-list/post-list";
import {Button, Container} from "@mui/material";
import moment from "moment";
import Link from 'next/link';
import styles from "../../styles/Post.module.css"
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useRouter} from "next/router";

export interface IParams extends ParsedUrlQuery {
    id: string
}

interface IProps {
    post: Post
}


const Id = (props: IProps) => {

    const {post} = props
    const [likeQuantity, setLikeQuantity] = useState(0);
    const [bookmarked, setBookmarked] = useState(false);
    const [myPost, setMyPost] = useState(false);
    const router = useRouter();

    const clickHandle = () => {
        if (!sessionStorage.getItem("token")) {
            alert("로그인해주세요");
        } else {
            if (bookmarked) {
                deleteBookmarked();
                setLikeQuantity(likeQuantity - 1);
            } else {
                createBookmarked();
                setLikeQuantity(likeQuantity + 1);
            }
        }
    }

    const checkMyPost = async () => {
        await axios.get(`http://localhost:8080/api/post/checkPost?postId=${post.postId}&userId=${sessionStorage.getItem("userId")}`)
            .then((res) => {
                setMyPost(res.data)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const checkBookmarked = async () => {
        await axios.get(`http://localhost:8080/api/bookmarked?postId=${post.postId}&userId=${sessionStorage.getItem("userId")}`)
            .then(res => {
                setBookmarked(res.data)
            })
            .catch(err => {
                console.error(err);
            })
    }

    const deletePostClickHandler = async () => {
        await axios.delete(`http://localhost:8080/api/post/delete/${post.postId}`)
            .then(() => {
                router.push(`/user/detail/${sessionStorage.getItem("userId")}`)
            })
            .catch(err => {
                console.error(err);
            });
    }

    const deleteBookmarked = async () => {
        await axios.delete(`http://localhost:8080/api/bookmark/delete?postId=${post.postId}&userId=${sessionStorage.getItem("userId")}`)
            .then(() => {
                setBookmarked(false)
            })
            .catch(err => {
                console.error(err);
            })
    }

    const createBookmarked = async () => {
        await axios.post(`http://localhost:8080/api/bookmark/create?postId=${post.postId}&userId=${sessionStorage.getItem("userId")}`)
            .then(() => {
                setBookmarked(true)
            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        if (!sessionStorage.getItem("userId")) {
            setMyPost(false);
        }
        if (post) {
            setLikeQuantity(props.post.likeQuantity)
            checkBookmarked();
            checkMyPost();
        }
    }, [])

    return (
        <Container maxWidth="md">
            {
                post &&
                <div className={styles.container}>
                    <h1 className={styles.title}>
                        {post.title}
                    </h1>
                    <div className={styles.infoBox}>
                        <Link href={`/user/detail/${post.userId}`}>
                            <p className={styles.username}>
                                {post.username}
                            </p>
                        </Link>
                        <p className={styles.date}>
                            {moment(post.updatedAt).format("YYYY년 MM월 DD일")}
                        </p>
                    </div>
                    <div className={styles.likeBox}>
                        {bookmarked ?
                            <Button
                                color="inherit"
                                onClick={clickHandle}
                            >
                                <FavoriteIcon className={styles.icon}/>
                            </Button>
                            :
                            <Button
                                color="inherit"
                                onClick={clickHandle}
                            >
                                <FavoriteBorderIcon className={styles.icon}/>
                            </Button>
                        }
                        <p className={styles.like}>
                            {likeQuantity}명의 책갈피에 추가됨.
                        </p>
                    </div>
                    {
                        myPost &&
                        <div className={styles.editBtn}>
                            <Link href={`/my-blog/update-post/${post.postId}`}>
                                수정
                            </Link>
                            <p onClick={deletePostClickHandler}>
                                삭제
                            </p>
                        </div>
                    }
                    {
                        post.image ?
                            <img
                                className={styles.img}
                                src={post.image}
                                alt={post.title}
                            />
                            :
                            <img
                                className={styles.img}
                                src="/images/noImage.png"
                                alt="noImage"
                            />
                    }
                    <p dangerouslySetInnerHTML={{__html: post.content}}>
                    </p>
                </div>
            }
        </Container>
    );
};

export const getStaticPaths = () => {
    return {
        paths: [
            {params: {id: "1"}},
            {params: {id: "2"}},
            {params: {id: "3"}},
        ],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {id} = params as IParams
    const res = await axios.get(`http://localhost:8080/api/post/${id}`)
    const post = res.data

    return {
        props: {
            post,
        }
    }
}


export default Id;