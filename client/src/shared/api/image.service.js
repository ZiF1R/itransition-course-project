import axios from 'axios';
import { baseImageUrl as baseUrl } from "../constants/routes";

const uploadImage = async (image, image_name, image_type) => {
  const request = axios.post(
    baseUrl + `?type=${image_type}&name=${image_name}`, image, {
    headers: {
      // "Content-Type": image_type,
      "Content-Type": "multipart/form-data"
      // "Content-Type": "application/json",
    },
  });
  return await request;
}

export default { uploadImage };
