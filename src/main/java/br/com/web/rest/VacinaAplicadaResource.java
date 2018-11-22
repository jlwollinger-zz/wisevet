package br.com.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.domain.VacinaAplicada;
import br.com.repository.VacinaAplicadaRepository;
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
 * REST controller for managing VacinaAplicada.
 */
@RestController
@RequestMapping("/api")
public class VacinaAplicadaResource {

    private final Logger log = LoggerFactory.getLogger(VacinaAplicadaResource.class);

    private static final String ENTITY_NAME = "vacinaAplicada";

    private final VacinaAplicadaRepository vacinaAplicadaRepository;

    public VacinaAplicadaResource(VacinaAplicadaRepository vacinaAplicadaRepository) {
        this.vacinaAplicadaRepository = vacinaAplicadaRepository;
    }

    /**
     * POST  /vacina-aplicadas : Create a new vacinaAplicada.
     *
     * @param vacinaAplicada the vacinaAplicada to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vacinaAplicada, or with status 400 (Bad Request) if the vacinaAplicada has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vacina-aplicadas")
    @Timed
    public ResponseEntity<VacinaAplicada> createVacinaAplicada(@RequestBody VacinaAplicada vacinaAplicada) throws URISyntaxException {
        log.debug("REST request to save VacinaAplicada : {}", vacinaAplicada);
        if (vacinaAplicada.getId() != null) {
            throw new BadRequestAlertException("A new vacinaAplicada cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VacinaAplicada result = vacinaAplicadaRepository.save(vacinaAplicada);
        return ResponseEntity.created(new URI("/api/vacina-aplicadas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vacina-aplicadas : Updates an existing vacinaAplicada.
     *
     * @param vacinaAplicada the vacinaAplicada to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vacinaAplicada,
     * or with status 400 (Bad Request) if the vacinaAplicada is not valid,
     * or with status 500 (Internal Server Error) if the vacinaAplicada couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vacina-aplicadas")
    @Timed
    public ResponseEntity<VacinaAplicada> updateVacinaAplicada(@RequestBody VacinaAplicada vacinaAplicada) throws URISyntaxException {
        log.debug("REST request to update VacinaAplicada : {}", vacinaAplicada);
        if (vacinaAplicada.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VacinaAplicada result = vacinaAplicadaRepository.save(vacinaAplicada);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vacinaAplicada.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vacina-aplicadas : get all the vacinaAplicadas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of vacinaAplicadas in body
     */
    @GetMapping("/vacina-aplicadas")
    @Timed
    public List<VacinaAplicada> getAllVacinaAplicadas() {
        log.debug("REST request to get all VacinaAplicadas");
        return vacinaAplicadaRepository.findAll();
    }

    /**
     * GET  /vacina-aplicadas/:id : get the "id" vacinaAplicada.
     *
     * @param id the id of the vacinaAplicada to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vacinaAplicada, or with status 404 (Not Found)
     */
    @GetMapping("/vacina-aplicadas/{id}")
    @Timed
    public ResponseEntity<VacinaAplicada> getVacinaAplicada(@PathVariable Long id) {
        log.debug("REST request to get VacinaAplicada : {}", id);
        Optional<VacinaAplicada> vacinaAplicada = vacinaAplicadaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vacinaAplicada);
    }

    /**
     * DELETE  /vacina-aplicadas/:id : delete the "id" vacinaAplicada.
     *
     * @param id the id of the vacinaAplicada to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vacina-aplicadas/{id}")
    @Timed
    public ResponseEntity<Void> deleteVacinaAplicada(@PathVariable Long id) {
        log.debug("REST request to delete VacinaAplicada : {}", id);

        vacinaAplicadaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
