import { useState } from 'react'
import './App.css'

function App() {
  const [maBaoGia, setMaBaoGia] = useState('');
  const [khachHangId, setKhachHangId] = useState('');
  const [nhanVienId, setNhanVienId] = useState('');
  const [chiTiets, setChiTiets] = useState([{ sanPhamId: '', soLuong: 1, donGia: '' }]);
  const [message, setMessage] = useState('');
  
  // State lưu danh sách báo giá đã nhập thành công
  const [danhSachBaoGia, setDanhSachBaoGia] = useState([]);

  const handleAddChiTiet = () => {
    setChiTiets([...chiTiets, { sanPhamId: '', soLuong: 1, donGia: '' }]);
  };

  const handleChiTietChange = (index, field, value) => {
    const newChiTiets = [...chiTiets];
    newChiTiets[index][field] = value;
    setChiTiets(newChiTiets);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      maBaoGia,
      khachHangId: parseInt(khachHangId),
      nhanVienId: parseInt(nhanVienId),
      chiTiets: chiTiets.map(ct => ({
        sanPhamId: parseInt(ct.sanPhamId),
        soLuong: parseInt(ct.soLuong),
        donGia: parseFloat(ct.donGia)
      }))
    };

    try {
      // URL phải khớp với context-path /crm-ver1 trong application.yaml
      const response = await fetch('http://localhost:8080/crm-ver1/api/baogia/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Lưu thành công báo giá: ${data.maBaoGia}`);
        setDanhSachBaoGia([data, ...danhSachBaoGia]); // Thêm vào danh sách bên dưới
        // Reset form
        setMaBaoGia(''); setKhachHangId(''); setNhanVienId('');
        setChiTiets([{ sanPhamId: '', soLuong: 1, donGia: '' }]);
      } else {
        setMessage(' Lỗi từ Server (Có thể trùng mã báo giá)');
      }
    } catch (error) {
      setMessage(`Lỗi kết nối: ${error.message}`);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="form-container">
        <h2>Tạo Báo Giá Mới</h2>
        {message && <div className="status-message">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="header-inputs">
            <input placeholder="Mã Báo Giá" value={maBaoGia} onChange={e => setMaBaoGia(e.target.value)} required />
            <input placeholder="ID Khách Hàng" value={khachHangId} onChange={e => setKhachHangId(e.target.value)} required />
            <input placeholder="ID Nhân Viên" value={nhanVienId} onChange={e => setNhanVienId(e.target.value)} required />
          </div>

          <h3>Sản phẩm chi tiết</h3>
          {chiTiets.map((ct, index) => (
            <div key={index} className="detail-line">
              <input placeholder="ID SP" value={ct.sanPhamId} onChange={e => handleChiTietChange(index, 'sanPhamId', e.target.value)} required />
              <input placeholder="SL" value={ct.soLuong} onChange={e => handleChiTietChange(index, 'soLuong', e.target.value)} required />
              <input placeholder="Giá" value={ct.donGia} onChange={e => handleChiTietChange(index, 'donGia', e.target.value)} required />
            </div>
          ))}

          <div className="actions">
            <button type="button" onClick={handleAddChiTiet}> Thêm </button>
            <button type="submit" className="save-btn">Lưu </button>
          </div>
        </form>
      </div>

      <div className="list-container">
        <h3>📋 Danh Sách Báo Giá Vừa Nhập</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Mã Báo Giá</th>
              <th>Khách Hàng</th>
              <th>Tổng Tiền</th>
            </tr>
          </thead>
          <tbody>
            {danhSachBaoGia.map((item, idx) => (
              <tr key={idx}>
                <td>{item.id}</td>
                <td>{item.maBaoGia}</td>
                <td>{item.khachHangId}</td>
                <td>{item.tongTien?.toLocaleString()} VND</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App