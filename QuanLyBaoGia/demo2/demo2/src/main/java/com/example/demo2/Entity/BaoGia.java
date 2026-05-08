package com.example.demo2.Entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "HD_BaoGia")
public class BaoGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "MaBaoGia", unique = true, nullable = false)
    private String maBaoGia;

    @Column(name = "KhachHang_Id")
    private Long khachHangId;

    @Column(name = "TongTien")
    private BigDecimal tongTien;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThai")
    private TrangThai trangThai = TrangThai.Nhap;

    @Column(name = "NhanVien_Id")
    private Integer nhanVienId;

    @OneToMany(mappedBy = "baoGia", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BaoGiaChiTiet> chiTiets;

    @Column(name = "CreatedAt", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}