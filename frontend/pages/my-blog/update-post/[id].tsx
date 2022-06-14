import React from 'react';
import {GetStaticProps} from "next";
import axios from "axios";
import {IParams} from "../../post/[id]";
import {Post} from "../../../components/post-list/post-list";
import {Container} from "@mui/material";
import TipTap from "../../../components/tip-tap/tip-tap";


interface IProps {
    post: Post
}

const Id = (props: IProps) => {

    const {post} = props;

    return (
        <Container maxWidth="md">
            <TipTap
                updateMode={true}
                postId={post.postId}
                title={post.title}
                content={post.content}
                image={post.image}
            />
        </Container>
    );
};

export const getStaticPaths = () => {
    return {
        paths: [
            {params: {id: "1"}},
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