import React, {useState} from 'react';
import {Button, Container, TextField} from "@mui/material";
import axios from "axios";
import {Post} from "../components/post-list/post-list";
import styles from "../styles/Search.module.css";
import moment from "moment";
import Link from "next/link";

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const [size, setSize] = useState(0);
    const [posts, setPosts] = useState<Post[]>([]);

    const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }

    const clickHandle = async () => {
        await axios.get(`http://localhost:8080/api/post/search/${keyword}`)
            .then((res) => {
                setSize(res.data.size);
                setPosts(res.data.posts);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <Container maxWidth="md">
            <div className={styles.searchBox}>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="검색어를 입력하세요."
                    variant="outlined"
                    value={keyword}
                    onChange={changeHandle}
                />
                <Button
                    size="large"
                    color="inherit"
                    onClick={clickHandle}
                >
                    검색
                </Button>
            </div>

            {size > 0 &&
                <div>
                    <h3>{size}개의 게시물이 검색되었습니다.</h3>
                    {posts.map(post => (
                            <div key={post.postId}>
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
                                    <h3
                                        className={styles.title}
                                    >
                                        {post.title}
                                    </h3>
                                </Link>
                                <p>{moment(post.updatedAt).format("YYYY년 MM월 DD일")}</p>
                                <div>
                                    🖤 {post.likeQuantity}
                                </div>
                                <hr className={styles.hr}/>
                            </div>
                        )
                    )}
                </div>
            }
        </Container>
    );
};

export default Search;