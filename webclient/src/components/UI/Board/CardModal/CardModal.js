import React, { useState, useEffect, Fragment } from 'react'
import Modal from "../../Modal/Modal";
import Classes from './CardModal.module.scss'
import TextareaAutosize from "react-textarea-autosize";
import Loader from '../../Loader/Loader'
import axios from '../../../../axios'
import './Editor.scss'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

var toolbarOptions = [
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  ['link', 'image']

];

const CardModal = ({ show, close, cardId, changeTitle, changeDescription }) => {
  const [cardData, setCardData] = useState(null)
  const [descriptionData, setDescriptionData] = useState("")
  useEffect(() => {
    axios.get(`/boards/card/${cardId}`).then(res => {
      setCardData(res.data.card)
      if (res.data.card.description) {
        setDescriptionData(res.data.card.description)
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onDescChange = value => {
    const desc = value
    setDescriptionData(value)
    if (desc !== descriptionData) {
      changeDescription(cardData.listId, cardId, desc)
    }
  }
  const onTitleChange = event => {
    const value = event.target.value;
    setCardData(prevState => ({
      ...prevState,
      text: value
    }))
    changeTitle(cardData.listId, cardId, value)
  }

  let content = <Loader />
  if (!cardData) {
    content = <Loader />
  } else {
    content = (
      <Fragment>
        <TextareaAutosize
          value={cardData.text}
          onChange={onTitleChange}
          maxRows="50"
          minRows="1"
          autoFocus
          className="input-trans py-2 montserrat-semibold mb-3 h5 w-100"
          style={{ resize: 'none', overflow: 'hidden' }}
        />
        <div className={Classes.QuillWrapper}>
          <ReactQuill theme="snow" value={descriptionData} onChange={onDescChange} modules={{ toolbar: toolbarOptions }} />
        </div>
        {/* <RichTextEditor
          value={descriptionData}
          onChange={onDescChange}
          toolbarConfig={toolbarConfig}
          className={`${Classes.RTEWrapper} montserrat-regular`}
          editorClassName={Classes.Editor}
          toolbarClassName={Classes.Toolbar}
        /> */}
      </Fragment>
    )
  }

  return (
    <Modal
      show={show}
      close={close}
      backdropClasses={Classes.Backdrop}
      modalClasses={Classes.Modal}
    >
      {content}
      {/* title | close */}
      {/* description */}
      {/* comments */}
    </Modal>
  )
}

export default CardModal
