import { getProducts } from "../../api/product";
import {
    ERROR_FETCHING_PRODUCT,
    START_FETCHING_PRODUCT,
    SUCCESS_FETCHING_PRODUCT,
    SET_PAGE,
    SET_KEYWORD,
    SET_CATEGORY,
    SET_TAGS,
    NEXT_PAGE,
    PREV_PAGE,
    TOGGLE_TAG,
} from "./constants";

export const startFetchingProducts = () => {
    return {
        type: START_FETCHING_PRODUCT,
    };
};

export const errorFetchingProducts = () => {
    return {
        type: ERROR_FETCHING_PRODUCT,
    };
};

export const successFetchingProducts = (data, count) => {
    return {
        type: SUCCESS_FETCHING_PRODUCT,
        data,
        count,
    };
};

export const fetchProducts = () => {
    return async function (dispatch, getState) {
        dispatch(startFetchingProducts());

        let perPage = getState().products.perPage || 9;
        let currentPage = getState().products.currentPage || 1;
        let tags = getState().products.tags || [];
        let keyword = getState().products.keyword || "";
        let category = getState().products.category || "";

        const params = {
            limit: perPage,
            skip: currentPage * perPage - perPage,
            q: keyword,
            tags: tags,
            category: category,
        };

        try {
            let { data } = await getProducts(params);
            dispatch(successFetchingProducts(data.data, data.count));
        } catch (err) {
            dispatch(errorFetchingProducts());
        }
    };
};

export const setPage = (number = 1) => {
    return {
        type: SET_PAGE,
        currentPage: number,
    };
};

export const setKeyword = (keyword) => {
    return {
        type: SET_KEYWORD,
        keyword,
    };
};

export const setCategory = (category) => {
    return {
        type: SET_CATEGORY,
        category,
    };
};

export const setTags = (tags) => {
    return {
        type: SET_TAGS,
        tags,
    };
};

export const toggleTag = (tag) => {
    return {
        type: TOGGLE_TAG,
        tag,
    };
};

export const clearTags = () => {
    return setTags([]);
};

export const goToNextPage = () => {
    return {
        type: NEXT_PAGE,
    };
};

export const goToPrevPage = () => {
    return {
        type: PREV_PAGE,
    };
};
