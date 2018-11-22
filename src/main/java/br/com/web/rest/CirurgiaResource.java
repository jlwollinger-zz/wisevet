package br.com.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.domain.Cirurgia;
import br.com.repository.CirurgiaRepository;
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
 * REST controller for managing Cirurgia.
 */
@RestController
@RequestMapping("/api")
public class CirurgiaResource {

    private final Logger log = LoggerFactory.getLogger(CirurgiaResource.class);

    private static final String ENTITY_NAME = "cirurgia";

    private final CirurgiaRepository cirurgiaRepository;

    public CirurgiaResource(CirurgiaRepository cirurgiaRepository) {
        this.cirurgiaRepository = cirurgiaRepository;
    }

    /**
     * POST  /cirurgias : Create a new cirurgia.
     *
     * @param cirurgia the cirurgia to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cirurgia, or with status 400 (Bad Request) if the cirurgia has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cirurgias")
    @Timed
    public ResponseEntity<Cirurgia> createCirurgia(@RequestBody Cirurgia cirurgia) throws URISyntaxException {
        log.debug("REST request to save Cirurgia : {}", cirurgia);
        if (cirurgia.getId() != null) {
            throw new BadRequestAlertException("A new cirurgia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cirurgia result = cirurgiaRepository.save(cirurgia);
        return ResponseEntity.created(new URI("/api/cirurgias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cirurgias : Updates an existing cirurgia.
     *
     * @param cirurgia the cirurgia to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cirurgia,
     * or with status 400 (Bad Request) if the cirurgia is not valid,
     * or with status 500 (Internal Server Error) if the cirurgia couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cirurgias")
    @Timed
    public ResponseEntity<Cirurgia> updateCirurgia(@RequestBody Cirurgia cirurgia) throws URISyntaxException {
        log.debug("REST request to update Cirurgia : {}", cirurgia);
        if (cirurgia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cirurgia result = cirurgiaRepository.save(cirurgia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cirurgia.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cirurgias : get all the cirurgias.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cirurgias in body
     */
    @GetMapping("/cirurgias")
    @Timed
    public List<Cirurgia> getAllCirurgias() {
        log.debug("REST request to get all Cirurgias");
        return cirurgiaRepository.findAll();
    }

    /**
     * GET  /cirurgias/:id : get the "id" cirurgia.
     *
     * @param id the id of the cirurgia to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cirurgia, or with status 404 (Not Found)
     */
    @GetMapping("/cirurgias/{id}")
    @Timed
    public ResponseEntity<Cirurgia> getCirurgia(@PathVariable Long id) {
        log.debug("REST request to get Cirurgia : {}", id);
        Optional<Cirurgia> cirurgia = cirurgiaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cirurgia);
    }

    /**
     * DELETE  /cirurgias/:id : delete the "id" cirurgia.
     *
     * @param id the id of the cirurgia to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cirurgias/{id}")
    @Timed
    public ResponseEntity<Void> deleteCirurgia(@PathVariable Long id) {
        log.debug("REST request to delete Cirurgia : {}", id);

        cirurgiaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
