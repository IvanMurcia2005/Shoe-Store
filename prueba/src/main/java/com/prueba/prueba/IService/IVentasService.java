package com.prueba.prueba.IService;

import java.util.List;
import java.util.Optional;

import com.prueba.prueba.Entity.Ventas;

public interface IVentasService {

	public List<Ventas> all() throws Exception;
	
	public Ventas save(Ventas ventas) throws Exception;
	
	public Optional<Ventas> findById(Long id) throws Exception;
	
	public void delete(Long id) throws Exception;
	
	public void update(Long id, Ventas venta) throws Exception;
	
	public Long contarVentas();
	
}
