package br.com.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.domain.SolicitacaoVinculo;
import br.com.repository.SolicitacaoVinculoRepository;
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
 * REST controller for managing SolicitacaoVinculo.
 */
@RestController
@RequestMapping("/api")
public class SolicitacaoVinculoResource {

    private final Logger log = LoggerFactory.getLogger(SolicitacaoVinculoResource.class);

    private static final String ENTITY_NAME = "solicitacaoVinculo";

    private final SolicitacaoVinculoRepository solicitacaoVinculoRepository;

    public SolicitacaoVinculoResource(SolicitacaoVinculoRepository solicitacaoVinculoRepository) {
        this.solicitacaoVinculoRepository = solicitacaoVinculoRepository;
    }

    /**
     * POST  /solicitacao-vinculos : Create a new solicitacaoVinculo.
     *
     * @param solicitacaoVinculo the solicitacaoVinculo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new solicitacaoVinculo, or with status 400 (Bad Request) if the solicitacaoVinculo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/solicitacao-vinculos")
    @Timed
    public ResponseEntity<SolicitacaoVinculo> createSolicitacaoVinculo(@RequestBody SolicitacaoVinculo solicitacaoVinculo) throws URISyntaxException {
        log.debug("REST request to save SolicitacaoVinculo : {}", solicitacaoVinculo);
        if (solicitacaoVinculo.getId() != null) {
            throw new BadRequestAlertException("A new solicitacaoVinculo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SolicitacaoVinculo result = solicitacaoVinculoRepository.save(solicitacaoVinculo);
        return ResponseEntity.created(new URI("/api/solicitacao-vinculos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /solicitacao-vinculos : Updates an existing solicitacaoVinculo.
     *
     * @param solicitacaoVinculo the solicitacaoVinculo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated solicitacaoVinculo,
     * or with status 400 (Bad Request) if the solicitacaoVinculo is not valid,
     * or with status 500 (Internal Server Error) if the solicitacaoVinculo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/solicitacao-vinculos")
    @Timed
    public ResponseEntity<SolicitacaoVinculo> updateSolicitacaoVinculo(@RequestBody SolicitacaoVinculo solicitacaoVinculo) throws URISyntaxException {
        log.debug("REST request to update SolicitacaoVinculo : {}", solicitacaoVinculo);
        if (solicitacaoVinculo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SolicitacaoVinculo result = solicitacaoVinculoRepository.save(solicitacaoVinculo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, solicitacaoVinculo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /solicitacao-vinculos : get all the solicitacaoVinculos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of solicitacaoVinculos in body
     */
    @GetMapping("/solicitacao-vinculos")
    @Timed
    public List<SolicitacaoVinculo> getAllSolicitacaoVinculos() {
        log.debug("REST request to get all SolicitacaoVinculos");
        return solicitacaoVinculoRepository.findAll();
    }

    /**
     * GET  /solicitacao-vinculos/:id : get the "id" solicitacaoVinculo.
     *
     * @param id the id of the solicitacaoVinculo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the solicitacaoVinculo, or with status 404 (Not Found)
     */
    @GetMapping("/solicitacao-vinculos/{id}")
    @Timed
    public ResponseEntity<SolicitacaoVinculo> getSolicitacaoVinculo(@PathVariable Long id) {
        log.debug("REST request to get SolicitacaoVinculo : {}", id);
        Optional<SolicitacaoVinculo> solicitacaoVinculo = solicitacaoVinculoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(solicitacaoVinculo);
    }

    /**
     * DELETE  /solicitacao-vinculos/:id : delete the "id" solicitacaoVinculo.
     *
     * @param id the id of the solicitacaoVinculo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/solicitacao-vinculos/{id}")
    @Timed
    public ResponseEntity<Void> deleteSolicitacaoVinculo(@PathVariable Long id) {
        log.debug("REST request to delete SolicitacaoVinculo : {}", id);

        solicitacaoVinculoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
