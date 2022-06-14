import React from 'react';
import Head from "next/head";
import Header from "../header/header";

interface IProps {
    children: React.ReactNode
}

const Layout = ({children}: IProps) => {
    return (
        <>
            <Head>
                <title>hyperLog</title>
                <meta name="description" content="Welcome to hyperLog" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            {children}
        </>
    );
};

export default Layout;