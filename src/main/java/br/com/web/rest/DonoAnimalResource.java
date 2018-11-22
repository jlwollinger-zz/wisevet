package br.com.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.domain.DonoAnimal;
import br.com.repository.DonoAnimalRepository;
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
 * REST controller for managing DonoAnimal.
 */
@RestController
@RequestMapping("/api")
public class DonoAnimalResource {

    private final Logger log = LoggerFactory.getLogger(DonoAnimalResource.class);

    private static final String ENTITY_NAME = "donoAnimal";

    private final DonoAnimalRepository donoAnimalRepository;

    public DonoAnimalResource(DonoAnimalRepository donoAnimalRepository) {
        this.donoAnimalRepository = donoAnimalRepository;
    }

    /**
     * POST  /dono-animals : Create a new donoAnimal.
     *
     * @param donoAnimal the donoAnimal to create
     * @return the ResponseEntity with status 201 (Created) and with body the new donoAnimal, or with status 400 (Bad Request) if the donoAnimal has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dono-animals")
    @Timed
    public ResponseEntity<DonoAnimal> createDonoAnimal(@RequestBody DonoAnimal donoAnimal) throws URISyntaxException {
        log.debug("REST request to save DonoAnimal : {}", donoAnimal);
        if (donoAnimal.getId() != null) {
            throw new BadRequestAlertException("A new donoAnimal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DonoAnimal result = donoAnimalRepository.save(donoAnimal);
        return ResponseEntity.created(new URI("/api/dono-animals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dono-animals : Updates an existing donoAnimal.
     *
     * @param donoAnimal the donoAnimal to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated donoAnimal,
     * or with status 400 (Bad Request) if the donoAnimal is not valid,
     * or with status 500 (Internal Server Error) if the donoAnimal couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dono-animals")
    @Timed
    public ResponseEntity<DonoAnimal> updateDonoAnimal(@RequestBody DonoAnimal donoAnimal) throws URISyntaxException {
        log.debug("REST request to update DonoAnimal : {}", donoAnimal);
        if (donoAnimal.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DonoAnimal result = donoAnimalRepository.save(donoAnimal);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, donoAnimal.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dono-animals : get all the donoAnimals.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of donoAnimals in body
     */
    @GetMapping("/dono-animals")
    @Timed
    public List<DonoAnimal> getAllDonoAnimals() {
        log.debug("REST request to get all DonoAnimals");
        return donoAnimalRepository.findAll();
    }

    /**
     * GET  /dono-animals/:id : get the "id" donoAnimal.
     *
     * @param id the id of the donoAnimal to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the donoAnimal, or with status 404 (Not Found)
     */
    @GetMapping("/dono-animals/{id}")
    @Timed
    public ResponseEntity<DonoAnimal> getDonoAnimal(@PathVariable Long id) {
        log.debug("REST request to get DonoAnimal : {}", id);
        Optional<DonoAnimal> donoAnimal = donoAnimalRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(donoAnimal);
    }

    /**
     * DELETE  /dono-animals/:id : delete the "id" donoAnimal.
     *
     * @param id the id of the donoAnimal to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dono-animals/{id}")
    @Timed
    public ResponseEntity<Void> deleteDonoAnimal(@PathVariable Long id) {
        log.debug("REST request to delete DonoAnimal : {}", id);

        donoAnimalRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
