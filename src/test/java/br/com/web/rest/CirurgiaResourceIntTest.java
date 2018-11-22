package br.com.web.rest;

import br.com.WisevetApp;

import br.com.domain.Cirurgia;
import br.com.repository.CirurgiaRepository;
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
 * Test class for the CirurgiaResource REST controller.
 *
 * @see CirurgiaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WisevetApp.class)
public class CirurgiaResourceIntTest {

    private static final Instant DEFAULT_DATA_HORA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_HORA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_NOME_PROCEDIMENTO = "AAAAAAAAAA";
    private static final String UPDATED_NOME_PROCEDIMENTO = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACOES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACOES = "BBBBBBBBBB";

    @Autowired
    private CirurgiaRepository cirurgiaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCirurgiaMockMvc;

    private Cirurgia cirurgia;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CirurgiaResource cirurgiaResource = new CirurgiaResource(cirurgiaRepository);
        this.restCirurgiaMockMvc = MockMvcBuilders.standaloneSetup(cirurgiaResource)
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
    public static Cirurgia createEntity(EntityManager em) {
        Cirurgia cirurgia = new Cirurgia()
            .dataHora(DEFAULT_DATA_HORA)
            .nomeProcedimento(DEFAULT_NOME_PROCEDIMENTO)
            .observacoes(DEFAULT_OBSERVACOES);
        return cirurgia;
    }

    @Before
    public void initTest() {
        cirurgia = createEntity(em);
    }

    @Test
    @Transactional
    public void createCirurgia() throws Exception {
        int databaseSizeBeforeCreate = cirurgiaRepository.findAll().size();

        // Create the Cirurgia
        restCirurgiaMockMvc.perform(post("/api/cirurgias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cirurgia)))
            .andExpect(status().isCreated());

        // Validate the Cirurgia in the database
        List<Cirurgia> cirurgiaList = cirurgiaRepository.findAll();
        assertThat(cirurgiaList).hasSize(databaseSizeBeforeCreate + 1);
        Cirurgia testCirurgia = cirurgiaList.get(cirurgiaList.size() - 1);
        assertThat(testCirurgia.getDataHora()).isEqualTo(DEFAULT_DATA_HORA);
        assertThat(testCirurgia.getNomeProcedimento()).isEqualTo(DEFAULT_NOME_PROCEDIMENTO);
        assertThat(testCirurgia.getObservacoes()).isEqualTo(DEFAULT_OBSERVACOES);
    }

    @Test
    @Transactional
    public void createCirurgiaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cirurgiaRepository.findAll().size();

        // Create the Cirurgia with an existing ID
        cirurgia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCirurgiaMockMvc.perform(post("/api/cirurgias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cirurgia)))
            .andExpect(status().isBadRequest());

        // Validate the Cirurgia in the database
        List<Cirurgia> cirurgiaList = cirurgiaRepository.findAll();
        assertThat(cirurgiaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCirurgias() throws Exception {
        // Initialize the database
        cirurgiaRepository.saveAndFlush(cirurgia);

        // Get all the cirurgiaList
        restCirurgiaMockMvc.perform(get("/api/cirurgias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cirurgia.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataHora").value(hasItem(DEFAULT_DATA_HORA.toString())))
            .andExpect(jsonPath("$.[*].nomeProcedimento").value(hasItem(DEFAULT_NOME_PROCEDIMENTO.toString())))
            .andExpect(jsonPath("$.[*].observacoes").value(hasItem(DEFAULT_OBSERVACOES.toString())));
    }
    
    @Test
    @Transactional
    public void getCirurgia() throws Exception {
        // Initialize the database
        cirurgiaRepository.saveAndFlush(cirurgia);

        // Get the cirurgia
        restCirurgiaMockMvc.perform(get("/api/cirurgias/{id}", cirurgia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cirurgia.getId().intValue()))
            .andExpect(jsonPath("$.dataHora").value(DEFAULT_DATA_HORA.toString()))
            .andExpect(jsonPath("$.nomeProcedimento").value(DEFAULT_NOME_PROCEDIMENTO.toString()))
            .andExpect(jsonPath("$.observacoes").value(DEFAULT_OBSERVACOES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCirurgia() throws Exception {
        // Get the cirurgia
        restCirurgiaMockMvc.perform(get("/api/cirurgias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCirurgia() throws Exception {
        // Initialize the database
        cirurgiaRepository.saveAndFlush(cirurgia);

        int databaseSizeBeforeUpdate = cirurgiaRepository.findAll().size();

        // Update the cirurgia
        Cirurgia updatedCirurgia = cirurgiaRepository.findById(cirurgia.getId()).get();
        // Disconnect from session so that the updates on updatedCirurgia are not directly saved in db
        em.detach(updatedCirurgia);
        updatedCirurgia
            .dataHora(UPDATED_DATA_HORA)
            .nomeProcedimento(UPDATED_NOME_PROCEDIMENTO)
            .observacoes(UPDATED_OBSERVACOES);

        restCirurgiaMockMvc.perform(put("/api/cirurgias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCirurgia)))
            .andExpect(status().isOk());

        // Validate the Cirurgia in the database
        List<Cirurgia> cirurgiaList = cirurgiaRepository.findAll();
        assertThat(cirurgiaList).hasSize(databaseSizeBeforeUpdate);
        Cirurgia testCirurgia = cirurgiaList.get(cirurgiaList.size() - 1);
        assertThat(testCirurgia.getDataHora()).isEqualTo(UPDATED_DATA_HORA);
        assertThat(testCirurgia.getNomeProcedimento()).isEqualTo(UPDATED_NOME_PROCEDIMENTO);
        assertThat(testCirurgia.getObservacoes()).isEqualTo(UPDATED_OBSERVACOES);
    }

    @Test
    @Transactional
    public void updateNonExistingCirurgia() throws Exception {
        int databaseSizeBeforeUpdate = cirurgiaRepository.findAll().size();

        // Create the Cirurgia

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCirurgiaMockMvc.perform(put("/api/cirurgias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cirurgia)))
            .andExpect(status().isBadRequest());

        // Validate the Cirurgia in the database
        List<Cirurgia> cirurgiaList = cirurgiaRepository.findAll();
        assertThat(cirurgiaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCirurgia() throws Exception {
        // Initialize the database
        cirurgiaRepository.saveAndFlush(cirurgia);

        int databaseSizeBeforeDelete = cirurgiaRepository.findAll().size();

        // Get the cirurgia
        restCirurgiaMockMvc.perform(delete("/api/cirurgias/{id}", cirurgia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cirurgia> cirurgiaList = cirurgiaRepository.findAll();
        assertThat(cirurgiaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cirurgia.class);
        Cirurgia cirurgia1 = new Cirurgia();
        cirurgia1.setId(1L);
        Cirurgia cirurgia2 = new Cirurgia();
        cirurgia2.setId(cirurgia1.getId());
        assertThat(cirurgia1).isEqualTo(cirurgia2);
        cirurgia2.setId(2L);
        assertThat(cirurgia1).isNotEqualTo(cirurgia2);
        cirurgia1.setId(null);
        assertThat(cirurgia1).isNotEqualTo(cirurgia2);
    }
}
