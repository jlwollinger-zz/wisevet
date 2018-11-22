package br.com.repository;

import br.com.domain.Papel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Papel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PapelRepository extends JpaRepository<Papel, Long> {

}
