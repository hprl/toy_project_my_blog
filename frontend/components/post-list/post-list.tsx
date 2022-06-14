import React, {useEffect, useState} from 'react'
import styles from "./post-list.module.css";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography
} from "@mui/material";
import {useRouter} from "next/router";
import moment from "moment";

export interface Post {
    postId: number,
    title: string,
    userId: number,
    username: string,
    createdAt: string,
    updatedAt: string,
    likeQuantity: number,
    content: string,
    image: string,
}

interface IProps {
    data: Post[];
}

const PostList = (props: IProps) => {

    const [posts, setPosts] = useState<Post[]>([]);
    const router = useRouter();
    const reg = /<[^>]*>?/g

    useEffect(() => {
        setPosts(props.data)
    },[])

    return (

        <Grid
            container
            spacing={3}
        >
            {posts.map((post: Post) => (
                <Grid
                    key={post.postId}
                    item
                    xs={12} sm={6} lg={4}
                >
                    <Card className={styles.card_container}>
                        <CardActionArea
                            onClick={() => {
                                router.push(`/post/${post.postId}`)
                            }}
                        >
                            {
                                post.image ?
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={post.image}
                                        alt={post.title}
                                    />
                                    :
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image="/images/noImage.png"
                                        alt="noImage"
                                    />
                            }
                            <CardContent>
                                <Typography
                                    className={styles.title}
                                    gutterBottom
                                    variant="subtitle1"
                                    component="h1"
                                >
                                    {post.title}
                                </Typography>
                                <Typography
                                    // dangerouslySetInnerHTML={{__html: post.content}}
                                    className={styles.content}
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {post.content.replace(/(<([^>]+)>)/ig, "").replace(/<br\/>/ig, "\n")}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <div>
                                {moment(post.updatedAt).format("YYYY년 MM월 DD일")}
                            </div>
                        </CardActions>
                        <CardActions
                            className={styles.info_container}
                        >
                            <div
                                className={styles.user_btn}
                                onClick={() => {
                                    router.push(`/user/detail/${post.userId}`)
                                }}>
                                by {post.username}
                            </div>
                            <div>
                                🖤 {post.likeQuantity}
                            </div>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
};


export default PostList;