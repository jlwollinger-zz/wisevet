package br.com.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.domain.Papel;
import br.com.repository.PapelRepository;
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
 * REST controller for managing Papel.
 */
@RestController
@RequestMapping("/api")
public class PapelResource {

    private final Logger log = LoggerFactory.getLogger(PapelResource.class);

    private static final String ENTITY_NAME = "papel";

    private final PapelRepository papelRepository;

    public PapelResource(PapelRepository papelRepository) {
        this.papelRepository = papelRepository;
    }

    /**
     * POST  /papels : Create a new papel.
     *
     * @param papel the papel to create
     * @return the ResponseEntity with status 201 (Created) and with body the new papel, or with status 400 (Bad Request) if the papel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/papels")
    @Timed
    public ResponseEntity<Papel> createPapel(@RequestBody Papel papel) throws URISyntaxException {
        log.debug("REST request to save Papel : {}", papel);
        if (papel.getId() != null) {
            throw new BadRequestAlertException("A new papel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Papel result = papelRepository.save(papel);
        return ResponseEntity.created(new URI("/api/papels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /papels : Updates an existing papel.
     *
     * @param papel the papel to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated papel,
     * or with status 400 (Bad Request) if the papel is not valid,
     * or with status 500 (Internal Server Error) if the papel couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/papels")
    @Timed
    public ResponseEntity<Papel> updatePapel(@RequestBody Papel papel) throws URISyntaxException {
        log.debug("REST request to update Papel : {}", papel);
        if (papel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Papel result = papelRepository.save(papel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, papel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /papels : get all the papels.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of papels in body
     */
    @GetMapping("/papels")
    @Timed
    public List<Papel> getAllPapels() {
        log.debug("REST request to get all Papels");
        return papelRepository.findAll();
    }

    /**
     * GET  /papels/:id : get the "id" papel.
     *
     * @param id the id of the papel to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the papel, or with status 404 (Not Found)
     */
    @GetMapping("/papels/{id}")
    @Timed
    public ResponseEntity<Papel> getPapel(@PathVariable Long id) {
        log.debug("REST request to get Papel : {}", id);
        Optional<Papel> papel = papelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(papel);
    }

    /**
     * DELETE  /papels/:id : delete the "id" papel.
     *
     * @param id the id of the papel to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/papels/{id}")
    @Timed
    public ResponseEntity<Void> deletePapel(@PathVariable Long id) {
        log.debug("REST request to delete Papel : {}", id);

        papelRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
