package br.com.web.rest;

import br.com.WisevetApp;

import br.com.domain.Permissao;
import br.com.repository.PermissaoRepository;
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
 * Test class for the PermissaoResource REST controller.
 *
 * @see PermissaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WisevetApp.class)
public class PermissaoResourceIntTest {

    private static final Boolean DEFAULT_EDITAR = false;
    private static final Boolean UPDATED_EDITAR = true;

    private static final Boolean DEFAULT_EXCLUIR = false;
    private static final Boolean UPDATED_EXCLUIR = true;

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_RECURSO = "AAAAAAAAAA";
    private static final String UPDATED_RECURSO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_VISUALISAR = false;
    private static final Boolean UPDATED_VISUALISAR = true;

    @Autowired
    private PermissaoRepository permissaoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPermissaoMockMvc;

    private Permissao permissao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PermissaoResource permissaoResource = new PermissaoResource(permissaoRepository);
        this.restPermissaoMockMvc = MockMvcBuilders.standaloneSetup(permissaoResource)
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
    public static Permissao createEntity(EntityManager em) {
        Permissao permissao = new Permissao()
            .editar(DEFAULT_EDITAR)
            .excluir(DEFAULT_EXCLUIR)
            .nome(DEFAULT_NOME)
            .recurso(DEFAULT_RECURSO)
            .visualisar(DEFAULT_VISUALISAR);
        return permissao;
    }

    @Before
    public void initTest() {
        permissao = createEntity(em);
    }

    @Test
    @Transactional
    public void createPermissao() throws Exception {
        int databaseSizeBeforeCreate = permissaoRepository.findAll().size();

        // Create the Permissao
        restPermissaoMockMvc.perform(post("/api/permissaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(permissao)))
            .andExpect(status().isCreated());

        // Validate the Permissao in the database
        List<Permissao> permissaoList = permissaoRepository.findAll();
        assertThat(permissaoList).hasSize(databaseSizeBeforeCreate + 1);
        Permissao testPermissao = permissaoList.get(permissaoList.size() - 1);
        assertThat(testPermissao.isEditar()).isEqualTo(DEFAULT_EDITAR);
        assertThat(testPermissao.isExcluir()).isEqualTo(DEFAULT_EXCLUIR);
        assertThat(testPermissao.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testPermissao.getRecurso()).isEqualTo(DEFAULT_RECURSO);
        assertThat(testPermissao.isVisualisar()).isEqualTo(DEFAULT_VISUALISAR);
    }

    @Test
    @Transactional
    public void createPermissaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = permissaoRepository.findAll().size();

        // Create the Permissao with an existing ID
        permissao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPermissaoMockMvc.perform(post("/api/permissaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(permissao)))
            .andExpect(status().isBadRequest());

        // Validate the Permissao in the database
        List<Permissao> permissaoList = permissaoRepository.findAll();
        assertThat(permissaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPermissaos() throws Exception {
        // Initialize the database
        permissaoRepository.saveAndFlush(permissao);

        // Get all the permissaoList
        restPermissaoMockMvc.perform(get("/api/permissaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(permissao.getId().intValue())))
            .andExpect(jsonPath("$.[*].editar").value(hasItem(DEFAULT_EDITAR.booleanValue())))
            .andExpect(jsonPath("$.[*].excluir").value(hasItem(DEFAULT_EXCLUIR.booleanValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].recurso").value(hasItem(DEFAULT_RECURSO.toString())))
            .andExpect(jsonPath("$.[*].visualisar").value(hasItem(DEFAULT_VISUALISAR.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getPermissao() throws Exception {
        // Initialize the database
        permissaoRepository.saveAndFlush(permissao);

        // Get the permissao
        restPermissaoMockMvc.perform(get("/api/permissaos/{id}", permissao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(permissao.getId().intValue()))
            .andExpect(jsonPath("$.editar").value(DEFAULT_EDITAR.booleanValue()))
            .andExpect(jsonPath("$.excluir").value(DEFAULT_EXCLUIR.booleanValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.recurso").value(DEFAULT_RECURSO.toString()))
            .andExpect(jsonPath("$.visualisar").value(DEFAULT_VISUALISAR.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPermissao() throws Exception {
        // Get the permissao
        restPermissaoMockMvc.perform(get("/api/permissaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePermissao() throws Exception {
        // Initialize the database
        permissaoRepository.saveAndFlush(permissao);

        int databaseSizeBeforeUpdate = permissaoRepository.findAll().size();

        // Update the permissao
        Permissao updatedPermissao = permissaoRepository.findById(permissao.getId()).get();
        // Disconnect from session so that the updates on updatedPermissao are not directly saved in db
        em.detach(updatedPermissao);
        updatedPermissao
            .editar(UPDATED_EDITAR)
            .excluir(UPDATED_EXCLUIR)
            .nome(UPDATED_NOME)
            .recurso(UPDATED_RECURSO)
            .visualisar(UPDATED_VISUALISAR);

        restPermissaoMockMvc.perform(put("/api/permissaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPermissao)))
            .andExpect(status().isOk());

        // Validate the Permissao in the database
        List<Permissao> permissaoList = permissaoRepository.findAll();
        assertThat(permissaoList).hasSize(databaseSizeBeforeUpdate);
        Permissao testPermissao = permissaoList.get(permissaoList.size() - 1);
        assertThat(testPermissao.isEditar()).isEqualTo(UPDATED_EDITAR);
        assertThat(testPermissao.isExcluir()).isEqualTo(UPDATED_EXCLUIR);
        assertThat(testPermissao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testPermissao.getRecurso()).isEqualTo(UPDATED_RECURSO);
        assertThat(testPermissao.isVisualisar()).isEqualTo(UPDATED_VISUALISAR);
    }

    @Test
    @Transactional
    public void updateNonExistingPermissao() throws Exception {
        int databaseSizeBeforeUpdate = permissaoRepository.findAll().size();

        // Create the Permissao

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPermissaoMockMvc.perform(put("/api/permissaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(permissao)))
            .andExpect(status().isBadRequest());

        // Validate the Permissao in the database
        List<Permissao> permissaoList = permissaoRepository.findAll();
        assertThat(permissaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePermissao() throws Exception {
        // Initialize the database
        permissaoRepository.saveAndFlush(permissao);

        int databaseSizeBeforeDelete = permissaoRepository.findAll().size();

        // Get the permissao
        restPermissaoMockMvc.perform(delete("/api/permissaos/{id}", permissao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Permissao> permissaoList = permissaoRepository.findAll();
        assertThat(permissaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Permissao.class);
        Permissao permissao1 = new Permissao();
        permissao1.setId(1L);
        Permissao permissao2 = new Permissao();
        permissao2.setId(permissao1.getId());
        assertThat(permissao1).isEqualTo(permissao2);
        permissao2.setId(2L);
        assertThat(permissao1).isNotEqualTo(permissao2);
        permissao1.setId(null);
        assertThat(permissao1).isNotEqualTo(permissao2);
    }
}
