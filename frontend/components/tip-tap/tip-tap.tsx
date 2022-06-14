import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from "./tip-tap.module.css"
import {IconButton, styled} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import TipTapMenu from "./tip-tap-menu";

const Input = styled('input')({
    display: 'none',
});

const presetKey: any = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_KEY;
const uploadUrl: any = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL;

const TipTap = (props: any) => {
    const router = useRouter();
    const [url, setUrl] = useState("");
    const [post, setPost] = useState({
        postId: props.postId,
        title: props.title,
        userId: 0,
        content: "",
        image: props.image,
    })

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: props.content,
    })

    useEffect(() => {

        if (sessionStorage.getItem("token")) {
            const id = sessionStorage.getItem("userId");
            if (typeof id === "string") {
                setPost({...post, userId: parseInt(id)})
            }
        }

        if (props.image) {
            setUrl(props.image);
        }

    }, [])

    useEffect(() => {

        if (typeof editor?.getHTML() === "string") {
            setPost({...post, content: editor?.getHTML()})
        }

    }, [editor?.getHTML()])

    const setContent = async () => {

        if(props.updateMode) {
             await axios.put("http://localhost:8080/api/post/update", post)
                .then(() => {
                    router.push(`/post/${post.postId}`)
                })
                .catch(err => {
                    console.error(err)
                })
        } else {
            await axios.post("http://localhost:8080/api/post/create", post)
                .then(() => {
                    router.push(`/user/detail/${sessionStorage.getItem("userId")}`)
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }

    const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPost({...post, title: e.target.value})
    }

    const changeImageHandler = async (e: any) => {

        const fileReader = new FileReader();

        if (e.target.files[0]) {
            fileReader.readAsDataURL(e.target.files[0])
        }

        fileReader.onloadend = () => {
            const previewImgUrl = fileReader.result
            if (typeof previewImgUrl === "string") {
                setUrl(previewImgUrl)
            }
        }

        const formData = new FormData();
        formData.append("file", e.target.files[0])
        formData.append("upload_preset", presetKey)

        await axios.post(uploadUrl, formData)
            .then((res) => {
                setPost({...post, image: res.data.secure_url})
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <>
            <div className={styles.container}>
                {
                    url &&
                    <img className={styles.image} src={url}
                         alt="postImage"/>
                }
                <div className={styles.imageUploadBtn}>
                    <label htmlFor="icon-button-file">
                        <Input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            onChange={changeImageHandler}
                        />
                        <IconButton
                            color="inherit"
                            aria-label="upload picture"
                            component="span"
                        >
                            <PhotoCamera/>
                        </IconButton>
                    </label>
                </div>
                <TipTapMenu editor={editor}/>

                <input
                    className={styles.title}
                    type="text"
                    placeholder="제목"
                    value={post.title}
                    onChange={changeTitleHandler}
                />
                <EditorContent
                    className={styles.content}
                    editor={editor}
                />
                <div className={styles.submitBox}>
                    <p onClick={setContent}>
                        등록
                    </p>
                </div>
            </div>
        </>
    )
}

export default TipTap;