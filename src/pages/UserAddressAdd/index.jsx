import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormControl, InputText, LayoutOne, Textarea } from "upkit";
import { createAddress } from "../../api/address";
import Header from "../../components/Header";
import SelectWilayah from "../../components/SelectWilayah";
import { rules } from "./validation";

export default function UserAddressAdd() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        getValues,
        formState: { errors },
    } = useForm();

    const allFields = watch();

    useEffect(() => {
        register("provinsi", rules.provinsi);
        register("kabupaten", rules.kabupaten);
        register("kecamatan", rules.kecamatan);
        register("kelurahan", rules.kelurahan);
    }, [register]);

    useEffect(() => {
        setValue("kabupaten", null);
        setValue("kecamatan", null);
        setValue("kelurahan", null);
    }, [allFields.provinsi, setValue]);

    useEffect(() => {
        setValue("kecamatan", null);
        setValue("kelurahan", null);
    }, [allFields.kabupaten, setValue]);

    useEffect(() => {
        setValue("kelurahan", null);
    }, [allFields.kecamatan, setValue]);

    const updateValue = (field, value) =>
        setValue(field, value, { shouldValidate: true, shouldDirty: true });

    const onSubmit = async (formData) => {
        const payload = {
            name: formData.nama_alamat,
            provinsi: formData.provinsi.label,
            kabupaten: formData.kabupaten.label,
            kecamatan: formData.kecamatan.label,
            kelurahan: formData.kelurahan.label,
            detail: formData.detail_alamat,
        };

        const { data } = await createAddress(payload);
        console.log(data);

        if (data.error) {
            return;
        }

        navigate("/alamat-pengiriman");
    };

    return (
        <div>
            <Header />
            <div className="py-24">
                <LayoutOne>
                    <div className="form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl
                                label="Nama alamat"
                                color="gray"
                                errorMessage={errors.nama_alamat?.message}
                            >
                                <InputText
                                    placeholder="Nama alamat"
                                    fitContainer
                                    name="nama_alamat"
                                    {...register(
                                        "nama_alamat",
                                        rules.nama_alamat
                                    )}
                                />
                            </FormControl>

                            <FormControl
                                label="Provinsi"
                                color="gray"
                                errorMessage={errors.provinsi?.message}
                            >
                                <SelectWilayah
                                    onChange={(option) =>
                                        updateValue("provinsi", option)
                                    }
                                    name="provinsi"
                                    value={getValues().provinsi}
                                />
                            </FormControl>

                            <FormControl
                                label="Kabupaten/kota"
                                color="gray"
                                errorMessage={errors.kabupaten?.message}
                            >
                                <SelectWilayah
                                    tingkat="kabupaten"
                                    onChange={(option) =>
                                        updateValue("kabupaten", option)
                                    }
                                    kodeInduk={getValues().provinsi?.value}
                                    name="kabupaten"
                                    value={getValues().kabupaten}
                                />
                            </FormControl>

                            <FormControl
                                label="Kecamatan"
                                color="gray"
                                errorMessage={errors.kecamatan?.message}
                            >
                                <SelectWilayah
                                    tingkat="kecamatan"
                                    onChange={(option) =>
                                        updateValue("kecamatan", option)
                                    }
                                    kodeInduk={getValues().kabupaten?.value}
                                    name="kecamatan"
                                    value={getValues().kecamatan}
                                />
                            </FormControl>

                            <FormControl
                                label="Kelurahan"
                                color="gray"
                                errorMessage={errors.kelurahan?.message}
                            >
                                <SelectWilayah
                                    tingkat="kelurahan"
                                    onChange={(option) =>
                                        updateValue("kelurahan", option)
                                    }
                                    kodeInduk={getValues().kecamatan?.value}
                                    name="kelurahan"
                                    value={getValues().kelurahan}
                                />
                            </FormControl>

                            <FormControl
                                label="Detail alamat"
                                color="gray"
                                errorMessage={errors.detail_alamat?.message}
                            >
                                <Textarea
                                    placeholder="Detail alamat"
                                    fitContainer
                                    name="detail_alamat"
                                    {...register(
                                        "detail_alamat",
                                        rules.detail_alamat
                                    )}
                                />
                            </FormControl>

                            <button className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 text-center">
                                Simpan Alamat
                            </button>
                        </form>
                    </div>
                </LayoutOne>
            </div>
        </div>
    );
}
