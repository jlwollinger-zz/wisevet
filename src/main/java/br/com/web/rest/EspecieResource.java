package br.com.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.domain.Especie;
import br.com.repository.EspecieRepository;
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
 * REST controller for managing Especie.
 */
@RestController
@RequestMapping("/api")
public class EspecieResource {

    private final Logger log = LoggerFactory.getLogger(EspecieResource.class);

    private static final String ENTITY_NAME = "especie";

    private final EspecieRepository especieRepository;

    public EspecieResource(EspecieRepository especieRepository) {
        this.especieRepository = especieRepository;
    }

    /**
     * POST  /especies : Create a new especie.
     *
     * @param especie the especie to create
     * @return the ResponseEntity with status 201 (Created) and with body the new especie, or with status 400 (Bad Request) if the especie has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/especies")
    @Timed
    public ResponseEntity<Especie> createEspecie(@RequestBody Especie especie) throws URISyntaxException {
        log.debug("REST request to save Especie : {}", especie);
        if (especie.getId() != null) {
            throw new BadRequestAlertException("A new especie cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Especie result = especieRepository.save(especie);
        return ResponseEntity.created(new URI("/api/especies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /especies : Updates an existing especie.
     *
     * @param especie the especie to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated especie,
     * or with status 400 (Bad Request) if the especie is not valid,
     * or with status 500 (Internal Server Error) if the especie couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/especies")
    @Timed
    public ResponseEntity<Especie> updateEspecie(@RequestBody Especie especie) throws URISyntaxException {
        log.debug("REST request to update Especie : {}", especie);
        if (especie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Especie result = especieRepository.save(especie);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, especie.getId().toString()))
            .body(result);
    }

    /**
     * GET  /especies : get all the especies.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of especies in body
     */
    @GetMapping("/especies")
    @Timed
    public List<Especie> getAllEspecies() {
        log.debug("REST request to get all Especies");
        return especieRepository.findAll();
    }

    /**
     * GET  /especies/:id : get the "id" especie.
     *
     * @param id the id of the especie to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the especie, or with status 404 (Not Found)
     */
    @GetMapping("/especies/{id}")
    @Timed
    public ResponseEntity<Especie> getEspecie(@PathVariable Long id) {
        log.debug("REST request to get Especie : {}", id);
        Optional<Especie> especie = especieRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(especie);
    }

    /**
     * DELETE  /especies/:id : delete the "id" especie.
     *
     * @param id the id of the especie to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/especies/{id}")
    @Timed
    public ResponseEntity<Void> deleteEspecie(@PathVariable Long id) {
        log.debug("REST request to delete Especie : {}", id);

        especieRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
