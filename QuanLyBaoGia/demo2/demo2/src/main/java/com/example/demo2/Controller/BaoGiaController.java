package com.example.demo2.Controller;

import com.example.demo2.Entity.BaoGia;
import com.example.demo2.Service.BaoGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/baogia")
@CrossOrigin(origins = "*")
public class BaoGiaController {
    @Autowired
    private BaoGiaService baoGiaService;
    @PostMapping("/create")
    public ResponseEntity<BaoGia> create(@RequestBody BaoGia baoGia) {
        return ResponseEntity.ok(baoGiaService.luuBaoGia(baoGia));
    }

}
