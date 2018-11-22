package br.com.repository;

import br.com.domain.SolicitacaoVinculo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SolicitacaoVinculo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SolicitacaoVinculoRepository extends JpaRepository<SolicitacaoVinculo, Long> {

}
