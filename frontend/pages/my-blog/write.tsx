import React, {useEffect} from 'react';
import TipTap from "../../components/tip-tap/tip-tap";
import {Container} from "@mui/material";
import {useRouter} from "next/router";

const Write = () => {
    const router = useRouter();
    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            alert("로그인 해주세요")
            router.push("/")
        }
    })

    return (
        <Container maxWidth="md">
            <TipTap />
        </Container>
    );
};

export default Write;