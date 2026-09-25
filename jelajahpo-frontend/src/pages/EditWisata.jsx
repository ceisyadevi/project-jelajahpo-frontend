import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditWisata() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama_wisata: "",
        deskripsi: "",
        harga_tiket: "",
        id_kategori: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3001/wisata/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setFormData(data[0]);
            setLoading(false);
        })
        .catch((err) => console.error(err));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:3001/wisata/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
        alert("Wisata berhasil diperbarui!");
        navigate("/wisata");
    };

    if (loading) {
        return <div className="container mt-4">Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Edit Wwisata</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Nama Wisata</label>
                    <input
                      type="text"
                      name="nama_wisata"
                      value={formData.nama_wisata}
                      onChange={handleChange}
                      className="form-control"
                      />
                </div>
                <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <textarea
                      name="deskripsi"
                      value={formData.deskripsi}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Masukan deskripsi wisata"
                      ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Harga Tiket</label>
                  <input
                    type="number"
                    name="harga_tiket"
                    value={formData.harga_tiket}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Massukan harga tiket"
                    required
                    />
                    </div>
                <div className="mb-3">
                    <label className="form-label">ID Ketegori</label>
                    <select
                      type="number"
                      name="id_kategori"
                      value={formData.id_kategori}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Massukan ID kategori"
                    >
                        <option value="">--Pilih Kategori</option>
                        <option value="1">Alam</option>
                        <option value="2">Budaya</option>
                        <option value="3">Religi</option>
                        <option value="4">Kuliner</option>
                    </select>
                    </div>   

                <button type="submit" className="btn btn-success me-2">
                    Simpan Perubahan
                </button>
            </form>
        </div>
    );

}