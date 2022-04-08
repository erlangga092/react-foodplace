import React from "react";
import { Link } from "react-router-dom";

export default function StoreLogo({
    textSize = "text-4xl",
    color = "text-red-600",
}) {
    return (
        <Link to="/">
            <div className={`${color} font-bold ${textSize}`}>Food Store</div>
        </Link>
    );
}
