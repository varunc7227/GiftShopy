import { STRAPI_ADAPTER, CUSTOM_API_ADAPTER } from "./adapter";

const getData = async (url) => {
    const { data } = await STRAPI_ADAPTER.get(url);
    return data;
};

const ApiDataGetType = async (url) => {
    return CUSTOM_API_ADAPTER.get(url);
};

const ApiDataPostType = async (url) => {
    return CUSTOM_API_ADAPTER.post(url);
};

const PostDataApi = (url, postData) => {
    return CUSTOM_API_ADAPTER.post(url, postData);
};

export { getData, ApiDataGetType, ApiDataPostType, PostDataApi }