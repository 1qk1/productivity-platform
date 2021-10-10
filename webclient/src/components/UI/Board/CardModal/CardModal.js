import React, { useState, useEffect, Fragment } from 'react'
import Modal from "../../Modal/Modal";
import Classes from './CardModal.module.scss'
import TextareaAutosize from "react-textarea-autosize";
import Loader from '../../Loader/Loader'
import axios from '../../../../axios'
import RichTextEditor from 'react-rte';
import './Editor.scss'

const toolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: ['BLOCK_TYPE_DROPDOWN', 'INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'HISTORY_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold', style: 'BOLD', className: 'font-weight-bold' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Strikethrough', style: 'STRIKETHROUGH' }
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: 'Normal', style: 'unstyled' },
    { label: 'Heading 1', style: 'header-one' },
    { label: 'Heading 2', style: 'header-two' },
    { label: 'Heading 3', style: 'header-three' },
    { label: 'Heading 4', style: 'header-four' },
    { label: 'Heading 5', style: 'header-five' },
    { label: 'Heading 6', style: 'header-six' }
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' }
  ]
};

const CardModal = ({ show, close, cardId, changeTitle, changeDescription }) => {
  const [cardData, setCardData] = useState(null)
  const [descriptionData, setDescriptionData] = useState(RichTextEditor.createEmptyValue())
  useEffect(() => {
    axios.get(`/boards/card/${cardId}`).then(res => {
      setCardData(res.data.card)
      if (res.data.card.description) {
        setDescriptionData(RichTextEditor.createValueFromString(res.data.card.description, 'html'))
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onDescChange = value => {
    // console.log(cardData)
    const desc = value.toString('html')
    if (desc !== descriptionData.toString('html')) {
      setDescriptionData(value)
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
        <RichTextEditor
          value={descriptionData}
          onChange={onDescChange}
          toolbarConfig={toolbarConfig}
          className={`${Classes.RTEWrapper} montserrat-regular`}
          editorClassName={Classes.Editor}
          toolbarClassName={Classes.Toolbar}
        />
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
