package br.com.repository;

import br.com.domain.Especie;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Especie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EspecieRepository extends JpaRepository<Especie, Long> {

}
