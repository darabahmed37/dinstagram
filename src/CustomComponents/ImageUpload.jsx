import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { db, storage } from "../firebase";
import firebase from "firebase";
import "./ImageUpload.css";

const ImageUpload = ({ userName }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const [progress, setProgress] = useState(0);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = (e) => {
    const uploadtask = storage.ref(`images/${image.name}`).put(image);
    uploadtask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      (e) => {
        alert("Upload Success");
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts")
              .add({
                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                imageUrl: url,
                userName:userName,
                caption: caption,
              })
              .then(() => {
                setImage(null);
                setCaption("");
                setProgress(0);
              });
          });
      }
    );
  };
  return (
    <div className={"image__upload"}>
      <progress
        className={"image__upload_progress"}
        value={progress}
        max={"100"}
      />
      <input
        type="text"
        placeholder={"Enter a caption..."}
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <Button className={"imageupload__button"} onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default ImageUpload;