import React from 'react';
import {Container, Grid} from "@mui/material";
import PostList, {Post} from "../components/post-list/post-list";
import MainPageBtn from "../components/main-page-btn/main-page-btn";
import axios from "axios";

interface IProps {
    data: Post[]
}

const Recent = (props: IProps) => {
    const {data} = props;
    return (
        <Container maxWidth="xl">
            <MainPageBtn sort={false}/>
            <Grid container>
                <Grid item lg={10} xl={12}>
                   <PostList data={data}/>
                </Grid>
                <Grid item lg={2}>
                </Grid>
            </Grid>

        </Container>
    );
};

export const getServerSideProps = async () => {
    const res = await axios.get("http://localhost:8080/api/posts/recent")
    const data = res.data

    return {
        props: {
            data,
        }
    }
}

export default Recent;