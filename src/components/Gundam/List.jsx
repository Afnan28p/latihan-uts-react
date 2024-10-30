import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function List() {
  const [gundam, setGundam] = useState([]);

  // Mengambil data gundam saat komponen dimount
  useEffect(() => {
    axios
      .get("https://api-latihan-uts.vercel.app/api/api/gundam")
      .then((response) => {
        setGundam(response.data.result); // Simpan data gundam ke dalam state
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menangani error
      });
  }, []);

  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this! Fakultas: ${nama}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Lakukan penghapusan jika dikonfirmasi
        axios
          .delete(`https://api-latihan-uts.vercel.app/api/api/gundam/${id}`)
          .then((response) => {
            // Hapus gundam dari state setelah sukses dihapus dari server
            setGundam(gundam.filter((f) => f.id !== id));
            // Tampilkan notifikasi sukses
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting data:", error); // Menangani error
            Swal.fire(
              "Error",
              "There was an issue deleting the data.",
              "error"
            );
          });
      }
    });
  };

  return (
    <>
      <h2>List Gundam</h2>

      <NavLink
        to="/gundam/create"
        className="btn btn-primary mb-3"
      >
        Tambah Gundam
      </NavLink>

      <ul className="list-group">
        {gundam.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{item.nama}</span>
            <div className="btn-group" role="group">
            <NavLink
              to={`/gundam/edit/${item.id}`}
              className="btn btn-warning"
            >
              Edit
            </NavLink>

            <button
              onClick={() => handleDelete(item.id, item.nama)}
              className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}