import React from 'react';
import axios from "axios";
import {ParsedUrlQuery} from "querystring";
import {GetStaticPaths, GetStaticProps} from "next";
import {Container} from "@mui/material";
import styles from "../../../styles/UserDetail.module.css"
import moment from "moment";
import Link from 'next/link';

interface IParams extends ParsedUrlQuery {
    id: string,
}

interface IProps {
    data: {
        userId: number,
        username: string,
        image: string,
        posts:
            {
                postId: number,
                title: string,
                content: string,
                updatedAt: string,
                image: string,
                likeQuantity: number,
            }[],
    }
}

const Id = (props: IProps) => {
    const data = props.data;

    return (
        <Container className={styles.container} maxWidth="md">
            {
                data &&
                <>
                    <div className={styles.profileBox}>
                        {
                            data.image &&
                            <img
                                className={styles.userImage}
                                src={data.image}
                                alt={data.image}
                            />
                        }
                        <h2> {data.username} </h2>
                    </div>
                    {data.posts.map((post) => (
                        <div
                            className={styles.postBox}
                            key={post.postId}>
                            <Link href={`/post/${post.postId}`}>
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
                            </Link>
                            <Link href={`/post/${post.postId}`}>
                                <h3 className={styles.title}>
                                    {post.title}
                                </h3>
                            </Link>
                            <p>{moment(post.updatedAt).format("YYYY년 MM월 DD일")}</p>
                            <div>
                                🖤 {post.likeQuantity}
                            </div>
                            <hr className={styles.hr}/>
                        </div>
                    ))}
                </>
            }
        </Container>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {params: {id: '1'}},
            {params: {id: '2'}},
            {params: {id: '3'}},
        ],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const {id} = context.params as IParams;
    const res = await axios.get(`http://localhost:8080/api/user/${id}`);
    const data = res.data;

    return {
        props: {
            data,
        }
    }
}

export default Id;