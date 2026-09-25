import { useEffect, useState } from "react";

export default function Kategori() {
    const [kategori, setKategori] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getKategori = async () => {
        try {
            const res = await fetch("http://localhost:3001/kategori");
            if (!res.ok) {
                throw new Error("Gagal mengambil data kategori");
            }
            const data = await res.json();
            setKategori(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getKategori();
    }, []);

    if (loading) {
        return <div className="container mt-4">Loading...</div>
    }

    if (error) {
        return (
            <div className="container mt-4 text-danger">{error}</div>
        );
    }

    return (
       <div className="container mt-4">
        <h2>Data Kategori</h2>
        <table className="table table-bordered table-striped mt-3">
            <thead>
                <tr>
                    <th>ID Kategori</th>
                    <th>Nama Kategori</th>
                </tr>
            </thead>
            <tbody>
                {kategori.map((item) => (
                    <tr key={item.id_kategori}>
                        <td>{item.id_kategori}</td>
                        <td>{item.kategori}</td>
                    </tr>
                ))}
            </tbody>
        </table>
       </div> 
    );
}