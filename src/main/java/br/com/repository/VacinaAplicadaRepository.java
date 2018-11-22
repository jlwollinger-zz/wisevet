package br.com.repository;

import br.com.domain.VacinaAplicada;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the VacinaAplicada entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VacinaAplicadaRepository extends JpaRepository<VacinaAplicada, Long> {

}
