import axios from "axios";
import { func, number, oneOf, oneOfType, shape, string } from "prop-types";
import React, { useEffect, useState } from "react";
import { Select } from "upkit";
import { config } from "../../config";

export default function SelectWilayah({ tingkat, kodeInduk, onChange, value }) {
  let [data, setData] = useState(() => []);
  let [isFetching, setIsFetching] = useState(() => false);

  useEffect(() => {
    setIsFetching(true);

    axios
      .get(`${config.api_host}/api/wilayah/${tingkat}?kode_induk=${kodeInduk}`)
      .then(({ data }) => setData(data))
      .finally((_) => setIsFetching(false));
  }, [kodeInduk, tingkat]);

  return (
    <Select
      options={data.map((wilayah) => {
        return {
          label: wilayah.nama,
          value: wilayah.kode,
        };
      })}
      onChange={onChange}
      value={value}
      isLoading={isFetching}
      isDisabled={isFetching || !data.length}
    />
  );
}

SelectWilayah.defaultProps = {
  tingkat: "provinsi",
};

SelectWilayah.propTypes = {
  tingkat: oneOf(["provinsi", "kabupaten", "kecamatan", "kelurahan"]),
  kodeInduk: oneOfType([number, string]),
  onChange: func,
  value: shape({
    label: string,
    value: oneOfType([string, number]),
  }),
};
