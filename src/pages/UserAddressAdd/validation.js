export const rules = {
  nama_alamat: {
    required: {
      value: true,
      message: "Nama alamat harus diisi",
    },
    minLength: {
      value: 5,
      message: "Nama alamat minimal 5 karakter",
    },
  },
  provinsi: {
    required: {
      value: true,
      message: "Provinsi harus dipilih",
    },
  },
  kabupaten: {
    required: {
      value: true,
      message: "Kabupaten harus dipilih",
    },
  },
  kecamatan: {
    required: {
      value: true,
      message: "Kecamatan harus dipilih",
    },
  },
  kelurahan: {
    required: {
      value: true,
      message: "Kelurahan harus dipilih",
    },
  },
  detail_alamat: {
    required: {
      value: true,
      message: "Detail alamat harus diisi",
    },
    maxLength: {
      value: 1000,
      message: "Detail alamat maksimal 1000 karakter",
    },
  },
};
