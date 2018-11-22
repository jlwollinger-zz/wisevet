package br.com.web.rest;

import br.com.WisevetApp;

import br.com.domain.VacinaAplicada;
import br.com.repository.VacinaAplicadaRepository;
import br.com.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static br.com.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the VacinaAplicadaResource REST controller.
 *
 * @see VacinaAplicadaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WisevetApp.class)
public class VacinaAplicadaResourceIntTest {

    private static final Instant DEFAULT_DATA_APLICACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_APLICACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_DOSES = 1;
    private static final Integer UPDATED_DOSES = 2;

    private static final String DEFAULT_OBSERVACAO = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACAO = "BBBBBBBBBB";

    @Autowired
    private VacinaAplicadaRepository vacinaAplicadaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVacinaAplicadaMockMvc;

    private VacinaAplicada vacinaAplicada;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VacinaAplicadaResource vacinaAplicadaResource = new VacinaAplicadaResource(vacinaAplicadaRepository);
        this.restVacinaAplicadaMockMvc = MockMvcBuilders.standaloneSetup(vacinaAplicadaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VacinaAplicada createEntity(EntityManager em) {
        VacinaAplicada vacinaAplicada = new VacinaAplicada()
            .dataAplicacao(DEFAULT_DATA_APLICACAO)
            .doses(DEFAULT_DOSES)
            .observacao(DEFAULT_OBSERVACAO);
        return vacinaAplicada;
    }

    @Before
    public void initTest() {
        vacinaAplicada = createEntity(em);
    }

    @Test
    @Transactional
    public void createVacinaAplicada() throws Exception {
        int databaseSizeBeforeCreate = vacinaAplicadaRepository.findAll().size();

        // Create the VacinaAplicada
        restVacinaAplicadaMockMvc.perform(post("/api/vacina-aplicadas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vacinaAplicada)))
            .andExpect(status().isCreated());

        // Validate the VacinaAplicada in the database
        List<VacinaAplicada> vacinaAplicadaList = vacinaAplicadaRepository.findAll();
        assertThat(vacinaAplicadaList).hasSize(databaseSizeBeforeCreate + 1);
        VacinaAplicada testVacinaAplicada = vacinaAplicadaList.get(vacinaAplicadaList.size() - 1);
        assertThat(testVacinaAplicada.getDataAplicacao()).isEqualTo(DEFAULT_DATA_APLICACAO);
        assertThat(testVacinaAplicada.getDoses()).isEqualTo(DEFAULT_DOSES);
        assertThat(testVacinaAplicada.getObservacao()).isEqualTo(DEFAULT_OBSERVACAO);
    }

    @Test
    @Transactional
    public void createVacinaAplicadaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vacinaAplicadaRepository.findAll().size();

        // Create the VacinaAplicada with an existing ID
        vacinaAplicada.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVacinaAplicadaMockMvc.perform(post("/api/vacina-aplicadas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vacinaAplicada)))
            .andExpect(status().isBadRequest());

        // Validate the VacinaAplicada in the database
        List<VacinaAplicada> vacinaAplicadaList = vacinaAplicadaRepository.findAll();
        assertThat(vacinaAplicadaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllVacinaAplicadas() throws Exception {
        // Initialize the database
        vacinaAplicadaRepository.saveAndFlush(vacinaAplicada);

        // Get all the vacinaAplicadaList
        restVacinaAplicadaMockMvc.perform(get("/api/vacina-aplicadas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vacinaAplicada.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataAplicacao").value(hasItem(DEFAULT_DATA_APLICACAO.toString())))
            .andExpect(jsonPath("$.[*].doses").value(hasItem(DEFAULT_DOSES)))
            .andExpect(jsonPath("$.[*].observacao").value(hasItem(DEFAULT_OBSERVACAO.toString())));
    }
    
    @Test
    @Transactional
    public void getVacinaAplicada() throws Exception {
        // Initialize the database
        vacinaAplicadaRepository.saveAndFlush(vacinaAplicada);

        // Get the vacinaAplicada
        restVacinaAplicadaMockMvc.perform(get("/api/vacina-aplicadas/{id}", vacinaAplicada.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vacinaAplicada.getId().intValue()))
            .andExpect(jsonPath("$.dataAplicacao").value(DEFAULT_DATA_APLICACAO.toString()))
            .andExpect(jsonPath("$.doses").value(DEFAULT_DOSES))
            .andExpect(jsonPath("$.observacao").value(DEFAULT_OBSERVACAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVacinaAplicada() throws Exception {
        // Get the vacinaAplicada
        restVacinaAplicadaMockMvc.perform(get("/api/vacina-aplicadas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVacinaAplicada() throws Exception {
        // Initialize the database
        vacinaAplicadaRepository.saveAndFlush(vacinaAplicada);

        int databaseSizeBeforeUpdate = vacinaAplicadaRepository.findAll().size();

        // Update the vacinaAplicada
        VacinaAplicada updatedVacinaAplicada = vacinaAplicadaRepository.findById(vacinaAplicada.getId()).get();
        // Disconnect from session so that the updates on updatedVacinaAplicada are not directly saved in db
        em.detach(updatedVacinaAplicada);
        updatedVacinaAplicada
            .dataAplicacao(UPDATED_DATA_APLICACAO)
            .doses(UPDATED_DOSES)
            .observacao(UPDATED_OBSERVACAO);

        restVacinaAplicadaMockMvc.perform(put("/api/vacina-aplicadas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVacinaAplicada)))
            .andExpect(status().isOk());

        // Validate the VacinaAplicada in the database
        List<VacinaAplicada> vacinaAplicadaList = vacinaAplicadaRepository.findAll();
        assertThat(vacinaAplicadaList).hasSize(databaseSizeBeforeUpdate);
        VacinaAplicada testVacinaAplicada = vacinaAplicadaList.get(vacinaAplicadaList.size() - 1);
        assertThat(testVacinaAplicada.getDataAplicacao()).isEqualTo(UPDATED_DATA_APLICACAO);
        assertThat(testVacinaAplicada.getDoses()).isEqualTo(UPDATED_DOSES);
        assertThat(testVacinaAplicada.getObservacao()).isEqualTo(UPDATED_OBSERVACAO);
    }

    @Test
    @Transactional
    public void updateNonExistingVacinaAplicada() throws Exception {
        int databaseSizeBeforeUpdate = vacinaAplicadaRepository.findAll().size();

        // Create the VacinaAplicada

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVacinaAplicadaMockMvc.perform(put("/api/vacina-aplicadas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vacinaAplicada)))
            .andExpect(status().isBadRequest());

        // Validate the VacinaAplicada in the database
        List<VacinaAplicada> vacinaAplicadaList = vacinaAplicadaRepository.findAll();
        assertThat(vacinaAplicadaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVacinaAplicada() throws Exception {
        // Initialize the database
        vacinaAplicadaRepository.saveAndFlush(vacinaAplicada);

        int databaseSizeBeforeDelete = vacinaAplicadaRepository.findAll().size();

        // Get the vacinaAplicada
        restVacinaAplicadaMockMvc.perform(delete("/api/vacina-aplicadas/{id}", vacinaAplicada.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<VacinaAplicada> vacinaAplicadaList = vacinaAplicadaRepository.findAll();
        assertThat(vacinaAplicadaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VacinaAplicada.class);
        VacinaAplicada vacinaAplicada1 = new VacinaAplicada();
        vacinaAplicada1.setId(1L);
        VacinaAplicada vacinaAplicada2 = new VacinaAplicada();
        vacinaAplicada2.setId(vacinaAplicada1.getId());
        assertThat(vacinaAplicada1).isEqualTo(vacinaAplicada2);
        vacinaAplicada2.setId(2L);
        assertThat(vacinaAplicada1).isNotEqualTo(vacinaAplicada2);
        vacinaAplicada1.setId(null);
        assertThat(vacinaAplicada1).isNotEqualTo(vacinaAplicada2);
    }
}
