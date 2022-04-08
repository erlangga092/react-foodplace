import React from "react";
import { Link } from "react-router-dom";
import { LayoutOne, Table } from "upkit";
import Header from "../../components/Header";
import { useAddressData } from "../../hooks/address";

const columns = [
    { Header: "Nama", accessor: "nama" },
    {
        Header: "Detail",
        accessor: (alamat) => {
            return (
                <>
                    {alamat.provinsi}, {alamat.kabupaten}, {alamat.kecamatan},{" "}
                    {alamat.kelurahan} <br />
                    {alamat.detail}
                </>
            );
        },
    },
];

export default function UserAddress() {
    let { data, limit, page, status, count, setPage } = useAddressData();

    return (
        <>
            <Header />
            <div className="py-24">
                <LayoutOne size="large">
                    <h3 className="text-2xl text-gray-800 font-semibold">
                        Alamat Pengiriman
                    </h3>
                    <br />

                    <div>
                        <Link to="/alamat-pengiriman/tambah">
                            <button className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 text-center mb-5">
                                Tambah baru
                            </button>
                        </Link>
                        <Table
                            items={data}
                            columns={columns}
                            totalItems={count}
                            page={page}
                            isLoading={status === "process"}
                            perPage={limit}
                            onPageChange={(page) => setPage(page)}
                        />
                    </div>

                    {status === "success" && !data.length ? (
                        <div className="text-center p-10">
                            Kamu belum menambahkan alamat pengiriman.
                            <br />
                        </div>
                    ) : null}
                </LayoutOne>
            </div>
        </>
    );
}
