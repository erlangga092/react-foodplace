import {
    START_FETCHING_PRODUCT,
    ERROR_FETCHING_PRODUCT,
    SUCCESS_FETCHING_PRODUCT,
    SET_PAGE,
    SET_KEYWORD,
    SET_CATEGORY,
    SET_TAGS,
    TOGGLE_TAG,
    PREV_PAGE,
    NEXT_PAGE,
} from "./constants";

const statusList = {
    idle: "idle",
    process: "process",
    success: "success",
    error: "error",
};

let initialState = {
    data: [],
    status: statusList.idle,
    totalItems: -1,
    keyword: "",
    category: "",
    tags: [],
    currentPage: 1,
    perPage: 6,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_PRODUCT:
            return {
                ...state,
                status: statusList.process,
            };
        case ERROR_FETCHING_PRODUCT:
            return {
                ...state,
                status: statusList.error,
            };
        case SUCCESS_FETCHING_PRODUCT:
            return {
                ...state,
                data: action.data,
                status: statusList.success,
                totalItems: action.count,
            };
        case SET_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            };
        case SET_KEYWORD:
            return {
                ...state,
                category: "",
                tags: [],
                keyword: action.keyword,
            };
        case SET_CATEGORY:
            return {
                ...state,
                currentPage: 1,
                keyword: "",
                category: action.category,
                tags: [],
            };
        case SET_TAGS:
            return {
                ...state,
                tags: action.tags,
            };
        case TOGGLE_TAG:
            if (!state.tags.includes(action.tag)) {
                return {
                    ...state,
                    currentPage: 1,
                    tags: [...state.tags, action.tag],
                };
            } else {
                return {
                    ...state,
                    currentPage: 1,
                    tags: state.tags.filter((tag) => tag !== action.tag),
                };
            }
        case PREV_PAGE:
            return {
                ...state,
                currentPage: state.currentPage - 1,
            };
        case NEXT_PAGE:
            return {
                ...state,
                currentPage: state.currentPage + 1,
            };
        default:
            return state;
    }
}
