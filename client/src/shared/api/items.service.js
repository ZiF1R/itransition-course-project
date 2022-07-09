import axios from 'axios';
import { baseItemsUrl as baseUrl, lastAddedItemsBaseUrl } from "../constants/routes";

axios.defaults.headers.common = {
  "Content-Type": "application/json",
};

let offset = 0;

const increaseOffset = () => offset += 20;

const getLastAddedItems = async () => {
  const request = axios.get(lastAddedItemsBaseUrl + `&offset=${offset}`);
  return await request;
};

const getCollectionItems = async (collection_id) => {
  const request = axios.get(baseUrl + `?collection_id=${collection_id}`);
  return await request;
}

const getItemOptionalFields = async (item_id, collection_id) => {
  const request = axios.get(baseUrl + `/${item_id}/optional_fields?collection_id=${collection_id}`);
  return await request;
}

const generateItemOptionalFields = async (collection_id) => {
  const request = axios.get(baseUrl + `/optional_fields?collection_id=${collection_id}`);
  return await request;
}

const createItem = async (data) => {
  const request = axios.post(baseUrl, data);
  return await request;
}

const editItem = async (id, data) => {
  const request = axios.post(baseUrl + `/${id}`, data);
  return await request;
}

const removeItem = async (id) => {
  const request = axios.delete(baseUrl + `/${id}`);
  return await request;
}

export default {
  increaseOffset,
  getLastAddedItems,
  getCollectionItems,
  getItemOptionalFields,
  generateItemOptionalFields,
  createItem,
  editItem,
  removeItem
};
