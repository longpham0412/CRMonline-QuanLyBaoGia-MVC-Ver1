package com.example.demo2.Service;

import com.example.demo2.Entity.BaoGia;
import com.example.demo2.Repository.BaoGiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class BaoGiaService {
    @Autowired
    private BaoGiaRepository baoGiaRepository;

    public BaoGia luuBaoGia(BaoGia baoGia) {
        BigDecimal tong = baoGia.getChiTiets().stream()
                .map(ct -> ct.getDonGia().multiply(new BigDecimal(ct.getSoLuong())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        baoGia.setTongTien(tong);
        baoGia.getChiTiets().forEach(ct -> ct.setBaoGia(baoGia));

        return baoGiaRepository.save(baoGia);
    }
}
