import React, { useEffect, useRef, useState } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import collectionsService from "../../shared/api/collections.service";
import "./profile.css";

function ProfileModal(props) {
  const {
    openModal,
    closeModal,
    topics,
    fieldTypes,
    editCollection,
    onAction
  } = props

  const topicName = topics.find(t => t.id === editCollection?.topic_id)?.name;

  const [name, setName] = useState(editCollection?.name || "");
  const [description, setDescription] = useState(editCollection?.description || "");
  const [topic, setTopic] = useState(topicName || topics[0].name);
  const [optionalFields, setOptionalFields] = useState([]);

  const [disabledForm, setDisabledForm] = useState(false);
  const submitButton = useRef(null);

  useEffect(() => {
    if (!editCollection) return;

    collectionsService
      .getCollectionOptionalFields(editCollection.id)
      .then(res => setOptionalFields(res.data.fields))
      .catch(err => console.log(err));
  }, [editCollection])

  const Input = styled('input')({
    display: 'none',
  });

  const handleAddField = () => {
    const defaultType = fieldTypes.find(field => field.name === "String");
    const newField = {
      name: "",
      type_id: defaultType.id,
    };
    setOptionalFields([...optionalFields, newField]);
  }

  const handleChangeField = (fieldPart, value, index) => {
    setOptionalFields(optionalFields.map(
      (field, i) => {
        if (i === index)
          field[fieldPart] = value;
        return field;
      }
    ));
  }

  const handleRemoveField = (index) => {
    const fields = optionalFields.filter((el, i) => i !== index);
    setOptionalFields(fields);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setDisabledForm(true);

    // TODO: move submitting of form to parent component

    const selectedTopic = topics.find(t => t.name === topic);
    const collection = Object.assign(editCollection || {}, {
      name,
      description,
      topic_id: selectedTopic.id,
      topic_name: selectedTopic.name,
      optionalFields
    });

    onAction(collection);
  }

  const handleSubmitButton = () => {
    if (document.createEvent) {
      var event = document.createEvent("MouseEvents");
      event.initMouseEvent("click", true, true, window,
        0, 0, 0, 0, 0,
        false, false, false, false,
        0, null);
      submitButton.current.dispatchEvent(event);
    }
    else if (submitButton.current.fireEvent) {
      submitButton.current.fireEvent("onclick");
    }
  }

  return (
    <Dialog open={openModal} onClose={(event) => closeModal(event)}>
      {editCollection ? (
        <DialogTitle>New collection</DialogTitle>
      ) : (
        <DialogTitle>Edit collection</DialogTitle>
      )}
      <DialogContent className="collection-modal">
        <form onSubmit={onSubmit}>
          <div className="collection-info">
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="contained-button-file" type="file" />
              <Button disabled={disabledForm} variant="outlined" component="div" startIcon={<AddIcon />}>
                Upload image
              </Button>
              <FormHelperText>Image is optional</FormHelperText>
            </label>

            <div className="collection-info__fields">
              <TextField
                autoFocus
                margin="dense"
                label="Collection name"
                type="text"
                fullWidth
                variant="standard"
                required
                disabled={disabledForm}
                value={name}
                onInput={event => setName(event.target.value)}
              />
              <FormControl sx={{ mt: 2, mb: 2, minWidth: 120 }} size="small">
                <InputLabel>Topic</InputLabel>
                <Select
                  disabled={disabledForm}
                  label="Topic"
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                >
                  { topics.map(topic => (
                    <MenuItem key={topic.id} value={topic.name}>{topic.name}</MenuItem>
                  )) }
                </Select>
              </FormControl>

              { optionalFields.map((field, index) => (
                <div className="field" key={index}>
                  <TextField
                    label="Field name"
                    type="text"
                    variant="standard"
                    required
                    disabled={disabledForm}
                    value={field.name}
                    onInput={(event) => handleChangeField("name", event.target.value, index)}
                  />

                  <FormControl sx={{ ml: 2, mr: 1, width: 100 }} size="small">
                    <InputLabel>Type</InputLabel>
                    <Select
                      disabled={disabledForm}
                      label="Type"
                      value={field.type_id}
                      onChange={(event) => handleChangeField("type_id", event.target.value, index)}
                    >
                      { fieldTypes.map(type => (
                        <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                      )) }
                    </Select>
                  </FormControl>
                  <IconButton disabled={disabledForm} size="small" onClick={() => handleRemoveField(index)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              )) }

              <Button disabled={disabledForm} onClick={handleAddField} size="small" startIcon={<AddIcon />}>
                add field
              </Button>
            </div>
          </div>

          <textarea
            disabled={disabledForm}
            required
            value={description}
            onInput={event => setDescription(event.target.value)}
          />

          <Button
            disabled={disabledForm}
            ref={submitButton}
            type="submit"
            style={{ position: "fixed", left: -10000 }}
          />
        </form>
    </DialogContent>
      <DialogActions>
        <Button onClick={(event) => closeModal(event)} disabled={disabledForm}>Cancel</Button>
        <Button onClick={handleSubmitButton} disabled={disabledForm}>
          {editCollection ? "Edit" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProfileModal;