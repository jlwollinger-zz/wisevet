package br.com.web.rest;

import br.com.WisevetApp;

import br.com.domain.Papel;
import br.com.repository.PapelRepository;
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
import java.util.List;


import static br.com.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PapelResource REST controller.
 *
 * @see PapelResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WisevetApp.class)
public class PapelResourceIntTest {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private PapelRepository papelRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPapelMockMvc;

    private Papel papel;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PapelResource papelResource = new PapelResource(papelRepository);
        this.restPapelMockMvc = MockMvcBuilders.standaloneSetup(papelResource)
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
    public static Papel createEntity(EntityManager em) {
        Papel papel = new Papel()
            .descricao(DEFAULT_DESCRICAO)
            .nome(DEFAULT_NOME);
        return papel;
    }

    @Before
    public void initTest() {
        papel = createEntity(em);
    }

    @Test
    @Transactional
    public void createPapel() throws Exception {
        int databaseSizeBeforeCreate = papelRepository.findAll().size();

        // Create the Papel
        restPapelMockMvc.perform(post("/api/papels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(papel)))
            .andExpect(status().isCreated());

        // Validate the Papel in the database
        List<Papel> papelList = papelRepository.findAll();
        assertThat(papelList).hasSize(databaseSizeBeforeCreate + 1);
        Papel testPapel = papelList.get(papelList.size() - 1);
        assertThat(testPapel.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testPapel.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createPapelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = papelRepository.findAll().size();

        // Create the Papel with an existing ID
        papel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPapelMockMvc.perform(post("/api/papels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(papel)))
            .andExpect(status().isBadRequest());

        // Validate the Papel in the database
        List<Papel> papelList = papelRepository.findAll();
        assertThat(papelList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPapels() throws Exception {
        // Initialize the database
        papelRepository.saveAndFlush(papel);

        // Get all the papelList
        restPapelMockMvc.perform(get("/api/papels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(papel.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())));
    }
    
    @Test
    @Transactional
    public void getPapel() throws Exception {
        // Initialize the database
        papelRepository.saveAndFlush(papel);

        // Get the papel
        restPapelMockMvc.perform(get("/api/papels/{id}", papel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(papel.getId().intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPapel() throws Exception {
        // Get the papel
        restPapelMockMvc.perform(get("/api/papels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePapel() throws Exception {
        // Initialize the database
        papelRepository.saveAndFlush(papel);

        int databaseSizeBeforeUpdate = papelRepository.findAll().size();

        // Update the papel
        Papel updatedPapel = papelRepository.findById(papel.getId()).get();
        // Disconnect from session so that the updates on updatedPapel are not directly saved in db
        em.detach(updatedPapel);
        updatedPapel
            .descricao(UPDATED_DESCRICAO)
            .nome(UPDATED_NOME);

        restPapelMockMvc.perform(put("/api/papels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPapel)))
            .andExpect(status().isOk());

        // Validate the Papel in the database
        List<Papel> papelList = papelRepository.findAll();
        assertThat(papelList).hasSize(databaseSizeBeforeUpdate);
        Papel testPapel = papelList.get(papelList.size() - 1);
        assertThat(testPapel.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testPapel.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingPapel() throws Exception {
        int databaseSizeBeforeUpdate = papelRepository.findAll().size();

        // Create the Papel

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPapelMockMvc.perform(put("/api/papels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(papel)))
            .andExpect(status().isBadRequest());

        // Validate the Papel in the database
        List<Papel> papelList = papelRepository.findAll();
        assertThat(papelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePapel() throws Exception {
        // Initialize the database
        papelRepository.saveAndFlush(papel);

        int databaseSizeBeforeDelete = papelRepository.findAll().size();

        // Get the papel
        restPapelMockMvc.perform(delete("/api/papels/{id}", papel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Papel> papelList = papelRepository.findAll();
        assertThat(papelList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Papel.class);
        Papel papel1 = new Papel();
        papel1.setId(1L);
        Papel papel2 = new Papel();
        papel2.setId(papel1.getId());
        assertThat(papel1).isEqualTo(papel2);
        papel2.setId(2L);
        assertThat(papel1).isNotEqualTo(papel2);
        papel1.setId(null);
        assertThat(papel1).isNotEqualTo(papel2);
    }
}
