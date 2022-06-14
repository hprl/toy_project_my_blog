import type {NextPage} from 'next'
import PostList, {Post} from "../components/post-list/post-list";
import {Container, Grid} from "@mui/material";
import React from "react";
import MainPageBtn from "../components/main-page-btn/main-page-btn";
import axios from "axios";

interface IProps {
    data: Post[]
}

const Home: NextPage<IProps> = (props: IProps) => {
    const {data} = props;
    return (
        <Container maxWidth="xl">
            <MainPageBtn sort={true}/>
            <Grid container>
                <Grid item lg={10} xl={12}>
                   <PostList data={data}/>
                </Grid>
                <Grid item lg={2}>
                </Grid>
            </Grid>
        </Container>
    )
}

export const getServerSideProps = async () => {
    const res = await axios.get("http://localhost:8080/api/posts/like")
    const data = res.data

    return {
        props: {
            data,
        }
    }
}

export default Home
