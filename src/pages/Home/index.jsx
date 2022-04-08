import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import {
    CardProduct,
    InputText,
    LayoutSidebar,
    Pagination,
    Pill,
    Responsive,
    SideNav,
} from "upkit";
import { getCart } from "../../api/cart";
import Cart from "../../components/Cart";
import Header from "../../components/Header";
import { config } from "../../config";
import { addItem, removeItem } from "../../features/Cart/actions";
import {
    fetchProducts,
    goToNextPage,
    goToPrevPage,
    setCategory,
    setKeyword,
    setPage,
    toggleTag,
} from "../../features/Products/actions";
import menus from "./menus";
import { tags } from "./tags";

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products);
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [
        dispatch,
        products.currentPage,
        products.keyword,
        products.category,
        products.tags,
    ]);

    useEffect(() => {
        getCart();
    }, []);

    return (
        <>
            <Header />
            <div className="pt-16">
                <LayoutSidebar
                    sidebar={
                        <SideNav
                            items={menus}
                            verticalAlign="top"
                            active={products.category}
                            onChange={(category) =>
                                dispatch(setCategory(category))
                            }
                        />
                    }
                    sidebarSize={80}
                    content={
                        <div className="w-full md:flex md:flex-row-reverse mr-5 h-full min-h-screen">
                            {/* Content  */}
                            <div className="w-full md:w-3/4 px-5 pt-3 pb-10">
                                <div className="w-full text-center mb-5 mt-5 px-2">
                                    <InputText
                                        fullRound
                                        fitContainer
                                        placeholder="Cari makanan favoritmu..."
                                        value={products.keyword}
                                        onChange={(v) =>
                                            dispatch(setKeyword(v.target.value))
                                        }
                                    />
                                </div>

                                {tags[products.category].length ? (
                                    <div className="pl-2 flex overflow-auto pb-5 w-3/3">
                                        {tags[products.category].map(
                                            (tag, index) => {
                                                return (
                                                    <div key={index}>
                                                        <Pill
                                                            text={tag}
                                                            icon={tag
                                                                .slice(0, 1)
                                                                .toUpperCase()}
                                                            isActive={products.tags.includes(
                                                                tag
                                                            )}
                                                            onClick={(_) =>
                                                                dispatch(
                                                                    toggleTag(
                                                                        tag
                                                                    )
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                ) : null}

                                {products.status === "process" &&
                                !products.data.length ? (
                                    <div className="w-full text-center flex items-center justify-center min-h-sreen">
                                        <BounceLoader color="red" />
                                    </div>
                                ) : (
                                    <Responsive desktop={3} items="stretch">
                                        {products.data.map((product, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="p-2"
                                                >
                                                    <CardProduct
                                                        title={product.name}
                                                        imgUrl={`${config.api_host}/upload/${product.image_url}`}
                                                        price={product.price}
                                                        onAddToCart={(_) =>
                                                            dispatch(
                                                                addItem(product)
                                                            )
                                                        }
                                                    />
                                                </div>
                                            );
                                        })}
                                    </Responsive>
                                )}

                                <div className="text-center my-10">
                                    <Pagination
                                        totalItems={products.totalItems}
                                        page={products.currentPage}
                                        perPage={products.perPage}
                                        onChange={(page) =>
                                            dispatch(setPage(page))
                                        }
                                        onPrev={(_) => dispatch(goToPrevPage())}
                                        onNext={(_) => dispatch(goToNextPage())}
                                    />
                                </div>
                            </div>

                            {/* Cart  */}
                            <div className="w-full md:w-1/4 h-full bg-gray-100">
                                <Cart
                                    items={cart}
                                    onItemInc={(item) =>
                                        dispatch(addItem(item))
                                    }
                                    onItemDec={(item) =>
                                        dispatch(removeItem(item))
                                    }
                                    onCheckout={(_) => navigate("/checkout")}
                                />
                            </div>
                        </div>
                    }
                />
            </div>
        </>
    );
}
