package br.com.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.domain.Veterinario;
import br.com.repository.VeterinarioRepository;
import br.com.web.rest.errors.BadRequestAlertException;
import br.com.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Veterinario.
 */
@RestController
@RequestMapping("/api")
public class VeterinarioResource {

    private final Logger log = LoggerFactory.getLogger(VeterinarioResource.class);

    private static final String ENTITY_NAME = "veterinario";

    private final VeterinarioRepository veterinarioRepository;

    public VeterinarioResource(VeterinarioRepository veterinarioRepository) {
        this.veterinarioRepository = veterinarioRepository;
    }

    /**
     * POST  /veterinarios : Create a new veterinario.
     *
     * @param veterinario the veterinario to create
     * @return the ResponseEntity with status 201 (Created) and with body the new veterinario, or with status 400 (Bad Request) if the veterinario has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/veterinarios")
    @Timed
    public ResponseEntity<Veterinario> createVeterinario(@RequestBody Veterinario veterinario) throws URISyntaxException {
        log.debug("REST request to save Veterinario : {}", veterinario);
        if (veterinario.getId() != null) {
            throw new BadRequestAlertException("A new veterinario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Veterinario result = veterinarioRepository.save(veterinario);
        return ResponseEntity.created(new URI("/api/veterinarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /veterinarios : Updates an existing veterinario.
     *
     * @param veterinario the veterinario to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated veterinario,
     * or with status 400 (Bad Request) if the veterinario is not valid,
     * or with status 500 (Internal Server Error) if the veterinario couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/veterinarios")
    @Timed
    public ResponseEntity<Veterinario> updateVeterinario(@RequestBody Veterinario veterinario) throws URISyntaxException {
        log.debug("REST request to update Veterinario : {}", veterinario);
        if (veterinario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Veterinario result = veterinarioRepository.save(veterinario);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, veterinario.getId().toString()))
            .body(result);
    }

    /**
     * GET  /veterinarios : get all the veterinarios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of veterinarios in body
     */
    @GetMapping("/veterinarios")
    @Timed
    public List<Veterinario> getAllVeterinarios() {
        log.debug("REST request to get all Veterinarios");
        return veterinarioRepository.findAll();
    }

    /**
     * GET  /veterinarios/:id : get the "id" veterinario.
     *
     * @param id the id of the veterinario to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the veterinario, or with status 404 (Not Found)
     */
    @GetMapping("/veterinarios/{id}")
    @Timed
    public ResponseEntity<Veterinario> getVeterinario(@PathVariable Long id) {
        log.debug("REST request to get Veterinario : {}", id);
        Optional<Veterinario> veterinario = veterinarioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(veterinario);
    }

    /**
     * DELETE  /veterinarios/:id : delete the "id" veterinario.
     *
     * @param id the id of the veterinario to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/veterinarios/{id}")
    @Timed
    public ResponseEntity<Void> deleteVeterinario(@PathVariable Long id) {
        log.debug("REST request to delete Veterinario : {}", id);

        veterinarioRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
