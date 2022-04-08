import FaCartPlus from "@meronex/icons/fa/FaCartPlus";
import { arrayOf, func, number, oneOfType, shape, string } from "prop-types";
import React from "react";
import { CardItem } from "upkit";
import { config } from "../../config";
import { formatRupiah } from "../../utils/format-rupiah";
import { sumPrice } from "../../utils/sum-price";

export default function Cart({ items, onItemInc, onItemDec, onCheckout }) {
    const total = sumPrice(items);

    return (
        <div className="min-h-screen overflow-auto">
            <div className="px-3 mt-3 pb-1">
                <div className="text-3xl mb-3 flex justify-between items-center">
                    <div className="text-red-600">
                        <FaCartPlus />
                    </div>
                    <div className="ml-3">
                        <p className="text-lg font-medium text-gray-700">
                            Total Harga: {formatRupiah(total)}
                        </p>
                    </div>
                </div>

                <button
                    className="w-full bg-red-600 hover:bg-red-500 text-white px-4 py-2"
                    disabled={!items.length}
                    onClick={onCheckout}
                >
                    Checkout
                </button>
            </div>

            {!items.length ? (
                <div className="text-center text-sm text-red-900 mt-3">
                    Belum ada item di keranjang
                </div>
            ) : null}

            <div className="p-3 overflow-auto h-screen">
                {items.map((item, index) => (
                    <div key={index} className="mb-2">
                        <CardItem
                            imgUrl={`${config.api_host}/upload/${item.image_url}`}
                            name={item.name}
                            qty={item.qty}
                            color="orange"
                            onDec={(_) => onItemDec(item)}
                            onInc={(_) => onItemInc(item)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

Cart.propTypes = {
    items: arrayOf(
        shape({
            _id: string.isRequired,
            name: string.isRequired,
            qty: oneOfType([string, number]).isRequired,
        })
    ),
    onItemDec: func,
    onItemInc: func,
    onCheckout: func,
};
