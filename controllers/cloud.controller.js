/* eslint-disable camelcase */
"use strict";

const app = require("../db/firebase");
const {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString
} = require("firebase/storage");

const projId = "burnished-block-355309";
const keysFileName = "myKeys";
const storage = getStorage(app);

class CloudController {
  async uploadImage(req, res) {
    const { image } = req.body;
    console.log(req.photo);
    const url = new URL(req.url, "https://baseurl.com/");
    const image_name = url.searchParams.get("name");
    const image_type = url.searchParams.get("type");

    const imagesRef = ref(storage, "photos/" + image_name);

    const metadata = {
      contentType: image_type
    };

    console.log(image, image_name, image_type);

    // uploadString(imagesRef, image, 'data_url').then((snapshot) => {
    //   console.log('Uploaded a data_url string!');
    // });

    const task = uploadBytesResumable(imagesRef, image, metadata);

    task.on("state-changed", snapshot => {
      console.log(snapshot.bytesTransferred, snapshot.totalBytes);
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
      case "paused":
        console.log("Upload is paused");
        break;
      case "running":
        console.log("Upload is running");
        break;
      }
    }, err => { console.log(err); }, async () => {
      const image_link = await getDownloadURL(task.snapshot.ref);
      res.json({ image_link });
    });

    // storageRef.put(image).then(() => {
    //   firebase.storage().ref("users").child(user.uid).getDownloadURL()
    // });
  }
}

module.exports = new CloudController();
