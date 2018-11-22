package br.com.web.rest;

import br.com.WisevetApp;

import br.com.domain.SolicitacaoVinculo;
import br.com.repository.SolicitacaoVinculoRepository;
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

import br.com.domain.enumeration.STATUSSOLICITACAOVINCULO;
/**
 * Test class for the SolicitacaoVinculoResource REST controller.
 *
 * @see SolicitacaoVinculoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WisevetApp.class)
public class SolicitacaoVinculoResourceIntTest {

    private static final Instant DEFAULT_DATA_ENVIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_ENVIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final STATUSSOLICITACAOVINCULO DEFAULT_STATUS = STATUSSOLICITACAOVINCULO.ENVIADO;
    private static final STATUSSOLICITACAOVINCULO UPDATED_STATUS = STATUSSOLICITACAOVINCULO.ACEITO;

    @Autowired
    private SolicitacaoVinculoRepository solicitacaoVinculoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSolicitacaoVinculoMockMvc;

    private SolicitacaoVinculo solicitacaoVinculo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SolicitacaoVinculoResource solicitacaoVinculoResource = new SolicitacaoVinculoResource(solicitacaoVinculoRepository);
        this.restSolicitacaoVinculoMockMvc = MockMvcBuilders.standaloneSetup(solicitacaoVinculoResource)
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
    public static SolicitacaoVinculo createEntity(EntityManager em) {
        SolicitacaoVinculo solicitacaoVinculo = new SolicitacaoVinculo()
            .dataEnvio(DEFAULT_DATA_ENVIO)
            .status(DEFAULT_STATUS);
        return solicitacaoVinculo;
    }

    @Before
    public void initTest() {
        solicitacaoVinculo = createEntity(em);
    }

    @Test
    @Transactional
    public void createSolicitacaoVinculo() throws Exception {
        int databaseSizeBeforeCreate = solicitacaoVinculoRepository.findAll().size();

        // Create the SolicitacaoVinculo
        restSolicitacaoVinculoMockMvc.perform(post("/api/solicitacao-vinculos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitacaoVinculo)))
            .andExpect(status().isCreated());

        // Validate the SolicitacaoVinculo in the database
        List<SolicitacaoVinculo> solicitacaoVinculoList = solicitacaoVinculoRepository.findAll();
        assertThat(solicitacaoVinculoList).hasSize(databaseSizeBeforeCreate + 1);
        SolicitacaoVinculo testSolicitacaoVinculo = solicitacaoVinculoList.get(solicitacaoVinculoList.size() - 1);
        assertThat(testSolicitacaoVinculo.getDataEnvio()).isEqualTo(DEFAULT_DATA_ENVIO);
        assertThat(testSolicitacaoVinculo.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createSolicitacaoVinculoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = solicitacaoVinculoRepository.findAll().size();

        // Create the SolicitacaoVinculo with an existing ID
        solicitacaoVinculo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSolicitacaoVinculoMockMvc.perform(post("/api/solicitacao-vinculos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitacaoVinculo)))
            .andExpect(status().isBadRequest());

        // Validate the SolicitacaoVinculo in the database
        List<SolicitacaoVinculo> solicitacaoVinculoList = solicitacaoVinculoRepository.findAll();
        assertThat(solicitacaoVinculoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSolicitacaoVinculos() throws Exception {
        // Initialize the database
        solicitacaoVinculoRepository.saveAndFlush(solicitacaoVinculo);

        // Get all the solicitacaoVinculoList
        restSolicitacaoVinculoMockMvc.perform(get("/api/solicitacao-vinculos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(solicitacaoVinculo.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataEnvio").value(hasItem(DEFAULT_DATA_ENVIO.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getSolicitacaoVinculo() throws Exception {
        // Initialize the database
        solicitacaoVinculoRepository.saveAndFlush(solicitacaoVinculo);

        // Get the solicitacaoVinculo
        restSolicitacaoVinculoMockMvc.perform(get("/api/solicitacao-vinculos/{id}", solicitacaoVinculo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(solicitacaoVinculo.getId().intValue()))
            .andExpect(jsonPath("$.dataEnvio").value(DEFAULT_DATA_ENVIO.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSolicitacaoVinculo() throws Exception {
        // Get the solicitacaoVinculo
        restSolicitacaoVinculoMockMvc.perform(get("/api/solicitacao-vinculos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSolicitacaoVinculo() throws Exception {
        // Initialize the database
        solicitacaoVinculoRepository.saveAndFlush(solicitacaoVinculo);

        int databaseSizeBeforeUpdate = solicitacaoVinculoRepository.findAll().size();

        // Update the solicitacaoVinculo
        SolicitacaoVinculo updatedSolicitacaoVinculo = solicitacaoVinculoRepository.findById(solicitacaoVinculo.getId()).get();
        // Disconnect from session so that the updates on updatedSolicitacaoVinculo are not directly saved in db
        em.detach(updatedSolicitacaoVinculo);
        updatedSolicitacaoVinculo
            .dataEnvio(UPDATED_DATA_ENVIO)
            .status(UPDATED_STATUS);

        restSolicitacaoVinculoMockMvc.perform(put("/api/solicitacao-vinculos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSolicitacaoVinculo)))
            .andExpect(status().isOk());

        // Validate the SolicitacaoVinculo in the database
        List<SolicitacaoVinculo> solicitacaoVinculoList = solicitacaoVinculoRepository.findAll();
        assertThat(solicitacaoVinculoList).hasSize(databaseSizeBeforeUpdate);
        SolicitacaoVinculo testSolicitacaoVinculo = solicitacaoVinculoList.get(solicitacaoVinculoList.size() - 1);
        assertThat(testSolicitacaoVinculo.getDataEnvio()).isEqualTo(UPDATED_DATA_ENVIO);
        assertThat(testSolicitacaoVinculo.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingSolicitacaoVinculo() throws Exception {
        int databaseSizeBeforeUpdate = solicitacaoVinculoRepository.findAll().size();

        // Create the SolicitacaoVinculo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSolicitacaoVinculoMockMvc.perform(put("/api/solicitacao-vinculos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solicitacaoVinculo)))
            .andExpect(status().isBadRequest());

        // Validate the SolicitacaoVinculo in the database
        List<SolicitacaoVinculo> solicitacaoVinculoList = solicitacaoVinculoRepository.findAll();
        assertThat(solicitacaoVinculoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSolicitacaoVinculo() throws Exception {
        // Initialize the database
        solicitacaoVinculoRepository.saveAndFlush(solicitacaoVinculo);

        int databaseSizeBeforeDelete = solicitacaoVinculoRepository.findAll().size();

        // Get the solicitacaoVinculo
        restSolicitacaoVinculoMockMvc.perform(delete("/api/solicitacao-vinculos/{id}", solicitacaoVinculo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SolicitacaoVinculo> solicitacaoVinculoList = solicitacaoVinculoRepository.findAll();
        assertThat(solicitacaoVinculoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SolicitacaoVinculo.class);
        SolicitacaoVinculo solicitacaoVinculo1 = new SolicitacaoVinculo();
        solicitacaoVinculo1.setId(1L);
        SolicitacaoVinculo solicitacaoVinculo2 = new SolicitacaoVinculo();
        solicitacaoVinculo2.setId(solicitacaoVinculo1.getId());
        assertThat(solicitacaoVinculo1).isEqualTo(solicitacaoVinculo2);
        solicitacaoVinculo2.setId(2L);
        assertThat(solicitacaoVinculo1).isNotEqualTo(solicitacaoVinculo2);
        solicitacaoVinculo1.setId(null);
        assertThat(solicitacaoVinculo1).isNotEqualTo(solicitacaoVinculo2);
    }
}
