package br.com.repository;

import br.com.domain.Cirurgia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cirurgia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CirurgiaRepository extends JpaRepository<Cirurgia, Long> {

}
