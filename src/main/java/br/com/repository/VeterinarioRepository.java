package br.com.repository;

import br.com.domain.Veterinario;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Veterinario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VeterinarioRepository extends JpaRepository<Veterinario, Long> {

}
