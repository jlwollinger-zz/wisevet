package br.com.web.rest;

import br.com.WisevetApp;

import br.com.domain.Veterinario;
import br.com.repository.VeterinarioRepository;
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
 * Test class for the VeterinarioResource REST controller.
 *
 * @see VeterinarioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WisevetApp.class)
public class VeterinarioResourceIntTest {

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_LOGIN = "AAAAAAAAAA";
    private static final String UPDATED_LOGIN = "BBBBBBBBBB";

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_SENHA = "AAAAAAAAAA";
    private static final String UPDATED_SENHA = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUMERO_REGISTRO_CFMV = 1;
    private static final Integer UPDATED_NUMERO_REGISTRO_CFMV = 2;

    private static final Integer DEFAULT_NUMERO_REGISTRO_CRMV = 1;
    private static final Integer UPDATED_NUMERO_REGISTRO_CRMV = 2;

    @Autowired
    private VeterinarioRepository veterinarioRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVeterinarioMockMvc;

    private Veterinario veterinario;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VeterinarioResource veterinarioResource = new VeterinarioResource(veterinarioRepository);
        this.restVeterinarioMockMvc = MockMvcBuilders.standaloneSetup(veterinarioResource)
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
    public static Veterinario createEntity(EntityManager em) {
        Veterinario veterinario = new Veterinario()
            .email(DEFAULT_EMAIL)
            .login(DEFAULT_LOGIN)
            .nome(DEFAULT_NOME)
            .senha(DEFAULT_SENHA)
            .numeroRegistroCfmv(DEFAULT_NUMERO_REGISTRO_CFMV)
            .numeroRegistroCrmv(DEFAULT_NUMERO_REGISTRO_CRMV);
        return veterinario;
    }

    @Before
    public void initTest() {
        veterinario = createEntity(em);
    }

    @Test
    @Transactional
    public void createVeterinario() throws Exception {
        int databaseSizeBeforeCreate = veterinarioRepository.findAll().size();

        // Create the Veterinario
        restVeterinarioMockMvc.perform(post("/api/veterinarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(veterinario)))
            .andExpect(status().isCreated());

        // Validate the Veterinario in the database
        List<Veterinario> veterinarioList = veterinarioRepository.findAll();
        assertThat(veterinarioList).hasSize(databaseSizeBeforeCreate + 1);
        Veterinario testVeterinario = veterinarioList.get(veterinarioList.size() - 1);
        assertThat(testVeterinario.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testVeterinario.getLogin()).isEqualTo(DEFAULT_LOGIN);
        assertThat(testVeterinario.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testVeterinario.getSenha()).isEqualTo(DEFAULT_SENHA);
        assertThat(testVeterinario.getNumeroRegistroCfmv()).isEqualTo(DEFAULT_NUMERO_REGISTRO_CFMV);
        assertThat(testVeterinario.getNumeroRegistroCrmv()).isEqualTo(DEFAULT_NUMERO_REGISTRO_CRMV);
    }

    @Test
    @Transactional
    public void createVeterinarioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = veterinarioRepository.findAll().size();

        // Create the Veterinario with an existing ID
        veterinario.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVeterinarioMockMvc.perform(post("/api/veterinarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(veterinario)))
            .andExpect(status().isBadRequest());

        // Validate the Veterinario in the database
        List<Veterinario> veterinarioList = veterinarioRepository.findAll();
        assertThat(veterinarioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllVeterinarios() throws Exception {
        // Initialize the database
        veterinarioRepository.saveAndFlush(veterinario);

        // Get all the veterinarioList
        restVeterinarioMockMvc.perform(get("/api/veterinarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(veterinario.getId().intValue())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN.toString())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].senha").value(hasItem(DEFAULT_SENHA.toString())))
            .andExpect(jsonPath("$.[*].numeroRegistroCfmv").value(hasItem(DEFAULT_NUMERO_REGISTRO_CFMV)))
            .andExpect(jsonPath("$.[*].numeroRegistroCrmv").value(hasItem(DEFAULT_NUMERO_REGISTRO_CRMV)));
    }
    
    @Test
    @Transactional
    public void getVeterinario() throws Exception {
        // Initialize the database
        veterinarioRepository.saveAndFlush(veterinario);

        // Get the veterinario
        restVeterinarioMockMvc.perform(get("/api/veterinarios/{id}", veterinario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(veterinario.getId().intValue()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.login").value(DEFAULT_LOGIN.toString()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.senha").value(DEFAULT_SENHA.toString()))
            .andExpect(jsonPath("$.numeroRegistroCfmv").value(DEFAULT_NUMERO_REGISTRO_CFMV))
            .andExpect(jsonPath("$.numeroRegistroCrmv").value(DEFAULT_NUMERO_REGISTRO_CRMV));
    }

    @Test
    @Transactional
    public void getNonExistingVeterinario() throws Exception {
        // Get the veterinario
        restVeterinarioMockMvc.perform(get("/api/veterinarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVeterinario() throws Exception {
        // Initialize the database
        veterinarioRepository.saveAndFlush(veterinario);

        int databaseSizeBeforeUpdate = veterinarioRepository.findAll().size();

        // Update the veterinario
        Veterinario updatedVeterinario = veterinarioRepository.findById(veterinario.getId()).get();
        // Disconnect from session so that the updates on updatedVeterinario are not directly saved in db
        em.detach(updatedVeterinario);
        updatedVeterinario
            .email(UPDATED_EMAIL)
            .login(UPDATED_LOGIN)
            .nome(UPDATED_NOME)
            .senha(UPDATED_SENHA)
            .numeroRegistroCfmv(UPDATED_NUMERO_REGISTRO_CFMV)
            .numeroRegistroCrmv(UPDATED_NUMERO_REGISTRO_CRMV);

        restVeterinarioMockMvc.perform(put("/api/veterinarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVeterinario)))
            .andExpect(status().isOk());

        // Validate the Veterinario in the database
        List<Veterinario> veterinarioList = veterinarioRepository.findAll();
        assertThat(veterinarioList).hasSize(databaseSizeBeforeUpdate);
        Veterinario testVeterinario = veterinarioList.get(veterinarioList.size() - 1);
        assertThat(testVeterinario.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testVeterinario.getLogin()).isEqualTo(UPDATED_LOGIN);
        assertThat(testVeterinario.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testVeterinario.getSenha()).isEqualTo(UPDATED_SENHA);
        assertThat(testVeterinario.getNumeroRegistroCfmv()).isEqualTo(UPDATED_NUMERO_REGISTRO_CFMV);
        assertThat(testVeterinario.getNumeroRegistroCrmv()).isEqualTo(UPDATED_NUMERO_REGISTRO_CRMV);
    }

    @Test
    @Transactional
    public void updateNonExistingVeterinario() throws Exception {
        int databaseSizeBeforeUpdate = veterinarioRepository.findAll().size();

        // Create the Veterinario

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVeterinarioMockMvc.perform(put("/api/veterinarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(veterinario)))
            .andExpect(status().isBadRequest());

        // Validate the Veterinario in the database
        List<Veterinario> veterinarioList = veterinarioRepository.findAll();
        assertThat(veterinarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVeterinario() throws Exception {
        // Initialize the database
        veterinarioRepository.saveAndFlush(veterinario);

        int databaseSizeBeforeDelete = veterinarioRepository.findAll().size();

        // Get the veterinario
        restVeterinarioMockMvc.perform(delete("/api/veterinarios/{id}", veterinario.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Veterinario> veterinarioList = veterinarioRepository.findAll();
        assertThat(veterinarioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Veterinario.class);
        Veterinario veterinario1 = new Veterinario();
        veterinario1.setId(1L);
        Veterinario veterinario2 = new Veterinario();
        veterinario2.setId(veterinario1.getId());
        assertThat(veterinario1).isEqualTo(veterinario2);
        veterinario2.setId(2L);
        assertThat(veterinario1).isNotEqualTo(veterinario2);
        veterinario1.setId(null);
        assertThat(veterinario1).isNotEqualTo(veterinario2);
    }
}
