package com.prueba.prueba.IRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.prueba.prueba.Entity.Ventas;

public interface IVentasRepository extends JpaRepository<Ventas, Long>{

	@Query(value = "SELECT COUNT(*) FROM ventas", nativeQuery = true)
	Long contarVentas();
	
}
