import {
    ArrowClockwise,
    ArrowCounterclockwise,
    BlockquoteLeft,
    Code, Hr,
    ListOl,
    ListUl,
    TypeBold,
    TypeH1,
    TypeH2,
    TypeH3,
    TypeItalic,
    TypeStrikethrough
} from "react-bootstrap-icons";
import React from "react";

const TipTapMenu = ({editor}: any) => {

    if (!editor) return null;


    const menuStyles = (format?: string, lv?: number) => {
        if (format && lv) {
            return {
                color: editor.isActive(format, {level: lv}) ? 'black' : 'lightgray',
                marginRight: "20px",
                fontSize: "25px",
                cursor: "pointer"
            }
        } else if (format) {
            return {
                color: editor.isActive(format) ? 'black' : 'lightgray',
                marginRight: "20px", fontSize: "25px", cursor: "pointer"
            }
        }
        return {marginRight: "20px", fontSize: "25px", cursor: "pointer"}
    }


    return (
        <div>
            <TypeBold
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
                style={menuStyles('bold')}
            />
            <TypeItalic
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
                style={menuStyles('italic')}
            />
            <TypeStrikethrough
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active' : ''}
                style={menuStyles('strike')}
            />
            <Code
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={editor.isActive('code') ? 'is-active' : ''}
                style={menuStyles('code')}
            />
            <TypeH1
                onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''}
                style={menuStyles('heading', 1)}
            />

            <TypeH2
                onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                className={editor.isActive('heading', {level: 2}) ? 'is-active' : ''}
                style={menuStyles('heading', 2)}
            />
            <TypeH3
                onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                className={editor.isActive('heading', {level: 3}) ? 'is-active' : ''}
                style={menuStyles('heading', 3)}
            />
            <ListUl
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
                style={menuStyles('bulletList')}
            />
            <ListOl
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
                style={menuStyles('orderedList')}
            />
            <BlockquoteLeft
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
                style={menuStyles('blockquote')}
            />

            <Hr
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                style={menuStyles()}
            />
            <ArrowCounterclockwise
                onClick={() => editor.chain().focus().undo().run()}
                style={menuStyles()}
            />
            <ArrowClockwise
                onClick={() => editor.chain().focus().redo().run()}
                style={menuStyles()}
            />

        </div>
    )
}

export default TipTapMenu;