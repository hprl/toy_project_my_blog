import React from 'react';
import {GetStaticProps} from "next";
import axios from "axios";
import PostList, {Post} from "../../../components/post-list/post-list";
import {IParams} from "../../post/[id]";
import {Container, Grid} from "@mui/material";

interface IProps {
    post: Post[]
}

const Id = (props: IProps) => {
    const {post} = props;

    return (
        <>
            {
                post &&
                <Container maxWidth="xl">
                    <h1 style={{margin: "100px 0 50px 0"}}>책갈피</h1>
                    <Grid container>
                        <Grid item lg={10} xl={12}>
                            <PostList data={post}/>
                        </Grid>
                        <Grid item lg={2}>
                        </Grid>
                    </Grid>
                </Container>
            }
        </>
    );
};

export const getStaticPaths = () => {
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
    const res = await axios.get(`http://localhost:8080/api/bookmark/${id}`)
    const post = res.data

    return {
        props: {
            post,
        }
    }

}

export default Id;