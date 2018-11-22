package br.com.repository;

import br.com.domain.DonoAnimal;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DonoAnimal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DonoAnimalRepository extends JpaRepository<DonoAnimal, Long> {

}
