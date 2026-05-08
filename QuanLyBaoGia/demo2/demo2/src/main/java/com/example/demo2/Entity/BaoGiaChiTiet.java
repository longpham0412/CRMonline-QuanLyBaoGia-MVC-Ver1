package com.example.demo2.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore; // Thêm import này
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "HD_BaoGia_ChiTiet")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BaoGiaChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BaoGia_Id", nullable = false)
    @JsonIgnore
    private BaoGia baoGia;

    @Column(name = "SanPham_Id", nullable = false)
    private Integer sanPhamId;

    @Column(name = "SoLuong", nullable = false)
    private Integer soLuong;

    @Column(name = "DonGia", nullable = false)
    private BigDecimal donGia;
}