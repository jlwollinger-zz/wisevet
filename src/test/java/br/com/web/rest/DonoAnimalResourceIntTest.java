package br.com.web.rest;

import br.com.WisevetApp;

import br.com.domain.DonoAnimal;
import br.com.repository.DonoAnimalRepository;
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
 * Test class for the DonoAnimalResource REST controller.
 *
 * @see DonoAnimalResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WisevetApp.class)
public class DonoAnimalResourceIntTest {

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_LOGIN = "AAAAAAAAAA";
    private static final String UPDATED_LOGIN = "BBBBBBBBBB";

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_SENHA = "AAAAAAAAAA";
    private static final String UPDATED_SENHA = "BBBBBBBBBB";

    @Autowired
    private DonoAnimalRepository donoAnimalRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDonoAnimalMockMvc;

    private DonoAnimal donoAnimal;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DonoAnimalResource donoAnimalResource = new DonoAnimalResource(donoAnimalRepository);
        this.restDonoAnimalMockMvc = MockMvcBuilders.standaloneSetup(donoAnimalResource)
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
    public static DonoAnimal createEntity(EntityManager em) {
        DonoAnimal donoAnimal = new DonoAnimal()
            .email(DEFAULT_EMAIL)
            .login(DEFAULT_LOGIN)
            .nome(DEFAULT_NOME)
            .senha(DEFAULT_SENHA);
        return donoAnimal;
    }

    @Before
    public void initTest() {
        donoAnimal = createEntity(em);
    }

    @Test
    @Transactional
    public void createDonoAnimal() throws Exception {
        int databaseSizeBeforeCreate = donoAnimalRepository.findAll().size();

        // Create the DonoAnimal
        restDonoAnimalMockMvc.perform(post("/api/dono-animals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(donoAnimal)))
            .andExpect(status().isCreated());

        // Validate the DonoAnimal in the database
        List<DonoAnimal> donoAnimalList = donoAnimalRepository.findAll();
        assertThat(donoAnimalList).hasSize(databaseSizeBeforeCreate + 1);
        DonoAnimal testDonoAnimal = donoAnimalList.get(donoAnimalList.size() - 1);
        assertThat(testDonoAnimal.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testDonoAnimal.getLogin()).isEqualTo(DEFAULT_LOGIN);
        assertThat(testDonoAnimal.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testDonoAnimal.getSenha()).isEqualTo(DEFAULT_SENHA);
    }

    @Test
    @Transactional
    public void createDonoAnimalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = donoAnimalRepository.findAll().size();

        // Create the DonoAnimal with an existing ID
        donoAnimal.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDonoAnimalMockMvc.perform(post("/api/dono-animals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(donoAnimal)))
            .andExpect(status().isBadRequest());

        // Validate the DonoAnimal in the database
        List<DonoAnimal> donoAnimalList = donoAnimalRepository.findAll();
        assertThat(donoAnimalList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDonoAnimals() throws Exception {
        // Initialize the database
        donoAnimalRepository.saveAndFlush(donoAnimal);

        // Get all the donoAnimalList
        restDonoAnimalMockMvc.perform(get("/api/dono-animals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(donoAnimal.getId().intValue())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN.toString())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].senha").value(hasItem(DEFAULT_SENHA.toString())));
    }
    
    @Test
    @Transactional
    public void getDonoAnimal() throws Exception {
        // Initialize the database
        donoAnimalRepository.saveAndFlush(donoAnimal);

        // Get the donoAnimal
        restDonoAnimalMockMvc.perform(get("/api/dono-animals/{id}", donoAnimal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(donoAnimal.getId().intValue()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.login").value(DEFAULT_LOGIN.toString()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.senha").value(DEFAULT_SENHA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDonoAnimal() throws Exception {
        // Get the donoAnimal
        restDonoAnimalMockMvc.perform(get("/api/dono-animals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDonoAnimal() throws Exception {
        // Initialize the database
        donoAnimalRepository.saveAndFlush(donoAnimal);

        int databaseSizeBeforeUpdate = donoAnimalRepository.findAll().size();

        // Update the donoAnimal
        DonoAnimal updatedDonoAnimal = donoAnimalRepository.findById(donoAnimal.getId()).get();
        // Disconnect from session so that the updates on updatedDonoAnimal are not directly saved in db
        em.detach(updatedDonoAnimal);
        updatedDonoAnimal
            .email(UPDATED_EMAIL)
            .login(UPDATED_LOGIN)
            .nome(UPDATED_NOME)
            .senha(UPDATED_SENHA);

        restDonoAnimalMockMvc.perform(put("/api/dono-animals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDonoAnimal)))
            .andExpect(status().isOk());

        // Validate the DonoAnimal in the database
        List<DonoAnimal> donoAnimalList = donoAnimalRepository.findAll();
        assertThat(donoAnimalList).hasSize(databaseSizeBeforeUpdate);
        DonoAnimal testDonoAnimal = donoAnimalList.get(donoAnimalList.size() - 1);
        assertThat(testDonoAnimal.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testDonoAnimal.getLogin()).isEqualTo(UPDATED_LOGIN);
        assertThat(testDonoAnimal.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testDonoAnimal.getSenha()).isEqualTo(UPDATED_SENHA);
    }

    @Test
    @Transactional
    public void updateNonExistingDonoAnimal() throws Exception {
        int databaseSizeBeforeUpdate = donoAnimalRepository.findAll().size();

        // Create the DonoAnimal

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDonoAnimalMockMvc.perform(put("/api/dono-animals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(donoAnimal)))
            .andExpect(status().isBadRequest());

        // Validate the DonoAnimal in the database
        List<DonoAnimal> donoAnimalList = donoAnimalRepository.findAll();
        assertThat(donoAnimalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDonoAnimal() throws Exception {
        // Initialize the database
        donoAnimalRepository.saveAndFlush(donoAnimal);

        int databaseSizeBeforeDelete = donoAnimalRepository.findAll().size();

        // Get the donoAnimal
        restDonoAnimalMockMvc.perform(delete("/api/dono-animals/{id}", donoAnimal.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DonoAnimal> donoAnimalList = donoAnimalRepository.findAll();
        assertThat(donoAnimalList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DonoAnimal.class);
        DonoAnimal donoAnimal1 = new DonoAnimal();
        donoAnimal1.setId(1L);
        DonoAnimal donoAnimal2 = new DonoAnimal();
        donoAnimal2.setId(donoAnimal1.getId());
        assertThat(donoAnimal1).isEqualTo(donoAnimal2);
        donoAnimal2.setId(2L);
        assertThat(donoAnimal1).isNotEqualTo(donoAnimal2);
        donoAnimal1.setId(null);
        assertThat(donoAnimal1).isNotEqualTo(donoAnimal2);
    }
}
