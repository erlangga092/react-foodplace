import {
  FaAddressCard,
  FaArrowLeft,
  FaArrowRight,
  FaCartPlus,
  FaInfoCircle,
  FaRegCheckCircle,
} from "@meronex/icons/fa";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, LayoutOne, Responsive, Steps, Table } from "upkit";
import { createOrder } from "../../api/order";
import Header from "../../components/Header";
import { config } from "../../config";
import { clearItems } from "../../features/Cart/actions";
import { useAddressData } from "../../hooks/address";
import { formatRupiah } from "../../utils/format-rupiah";
import { sumPrice } from "../../utils/sum-price";

const IconWrapper = ({ children }) => {
  return <div className="text-3xl flex justify-center">{children}</div>;
};

const steps = [
  {
    label: "Item",
    icon: (
      <IconWrapper>
        <FaCartPlus />
      </IconWrapper>
    ),
  },
  {
    label: "Alamat",
    icon: (
      <IconWrapper>
        <FaAddressCard />
      </IconWrapper>
    ),
  },
  {
    label: "Konfirmasi",
    icon: (
      <IconWrapper>
        <FaInfoCircle />
      </IconWrapper>
    ),
  },
];

const columns = [
  {
    Header: "Nama produk",
    accessor: (item) => (
      <div className="flex items-center">
        <img
          src={`${config.api_host}/upload/${item.image_url}`}
          width={48}
          alt={item.name}
          className="mr-2"
        />
        {item.name}
      </div>
    ),
  },
  { Header: "Jumlah", accessor: "qty" },
  {
    Header: "Harga satuan",
    id: "price",
    accessor: (item) => <span> @ {formatRupiah(item.price)}</span>,
  },
  {
    Header: "Harga total",
    id: "subtotal",
    accessor: (item) => <>{formatRupiah(item.price * item.qty)}</>,
  },
];

const addressColumns = [
  {
    Header: "Nama alamat",
    accessor: (alamat) => {
      return (
        <>
          {alamat.nama} <br />
          <small>
            {alamat.provinsi}, {alamat.kabupaten}, {alamat.kecamatan},{" "}
            {alamat.kelurahan} <br />
            {alamat.detail}
          </small>
        </>
      );
    },
  },
];

export default function Checkout() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let [activeStep, setActiveStep] = useState(() => 0);
  let [selectedAddress, setSelectedAddress] = useState(() => null);

  let cart = useSelector((state) => state.cart);
  let { data, status, limit, page, count, setPage } = useAddressData();

  const handleCreateOrder = async () => {
    let payload = {
      delivery_fee: config.global_ongkir,
      delivery_address: selectedAddress._id,
    };

    let { data } = await createOrder(payload);
    if (data?.error) return;

    navigate(`/invoices/${data._id}`);
    dispatch(clearItems());
  };

  if (!cart.length) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <Header />
      <div className="pt-20 pb-8">
        <LayoutOne>
          <Steps steps={steps} active={activeStep} />
          <br />

          {activeStep === 0 ? (
            <>
              <Table
                items={cart}
                columns={columns}
                perPage={cart.length}
                showPagination={false}
              />

              <br />
              <div className="text-right">
                <h4 className="text-gray-800 text-xl font-semibold">
                  Subtotal: {formatRupiah(sumPrice(cart))}
                </h4>

                <br />

                <Button
                  iconAfter={<FaArrowRight />}
                  onClick={(_) => setActiveStep(activeStep + 1)}
                >
                  Selanjutnya
                </Button>
              </div>
            </>
          ) : null}

          {activeStep === 1 ? (
            <>
              <br />
              <br />
              <Table
                items={data}
                columns={addressColumns}
                perPage={limit}
                page={page}
                onPageChange={(page) => setPage(page)}
                totalItems={count}
                isLoading={status === "process"}
                selectable
                primaryKey={"_id"}
                selectedRow={selectedAddress}
                onSelectRow={(item) => setSelectedAddress(item)}
              />

              {!data.length && status === "success" ? (
                <div className="text-center my-10">
                  <Link to="/alamat-pengiriman/tambah">
                    Kamu belum memiliki alamat pengiriman <br />
                    <br />
                    <button className="px-4 py-2 bg-red-600 text-white text-center hover:bg-red-500">
                      Tambah alamat
                    </button>
                  </Link>
                </div>
              ) : null}

              <br />
              <br />

              <Responsive desktop={2} tablet={2} mobile={2}>
                <>
                  <Button
                    iconBefore={<FaArrowLeft />}
                    onClick={(_) => setActiveStep(activeStep - 1)}
                  >
                    Sebelumnya
                  </Button>
                </>

                <div className="text-right">
                  <Button
                    iconAfter={<FaArrowRight />}
                    onClick={(_) => setActiveStep(activeStep + 1)}
                    disabled={!selectedAddress}
                  >
                    Selanjutnya
                  </Button>
                </div>
              </Responsive>
            </>
          ) : null}

          {activeStep === 2 ? (
            <>
              <Table
                columns={[
                  {
                    Header: "",
                    accessor: "label",
                  },
                  {
                    Header: "",
                    accessor: "value",
                  },
                ]}
                items={[
                  {
                    label: "Alamat",
                    value: (
                      <>
                        {selectedAddress.nama} <br />
                        {selectedAddress.provinsi}, {selectedAddress.kabupaten},{" "}
                        {selectedAddress.kecamatan}, {selectedAddress.kelurahan}{" "}
                        <br /> {selectedAddress.detail}
                      </>
                    ),
                  },
                  {
                    label: "Subtotal",
                    value: formatRupiah(sumPrice(cart)),
                  },
                  {
                    label: "Ongkir",
                    value: formatRupiah(config.global_ongkir),
                  },
                  {
                    label: "Total",
                    value: (
                      <b>
                        {formatRupiah(
                          sumPrice(cart) + parseInt(config.global_ongkir)
                        )}
                      </b>
                    ),
                  },
                ]}
                showPagination={false}
              />

              <br />

              <Responsive desktop={2} tablet={2} mobile={2}>
                <>
                  <Button
                    iconBefore={<FaArrowLeft />}
                    onClick={(_) => setActiveStep(activeStep - 1)}
                  >
                    Sebelumnya
                  </Button>
                </>

                <div className="text-right">
                  <Button
                    color="red"
                    size="large"
                    iconBefore={<FaRegCheckCircle />}
                    onClick={handleCreateOrder}
                  >
                    Selanjutnya
                  </Button>
                </div>
              </Responsive>
            </>
          ) : null}
        </LayoutOne>
      </div>
    </>
  );
}
