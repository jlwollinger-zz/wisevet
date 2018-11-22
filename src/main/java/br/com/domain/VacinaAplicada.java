package br.com.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A VacinaAplicada.
 */
@Entity
@Table(name = "vacina_aplicada")
public class VacinaAplicada implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "data_aplicacao")
    private Instant dataAplicacao;

    @Column(name = "doses")
    private Integer doses;

    @Column(name = "observacao")
    private String observacao;

    @ManyToOne
    @JsonIgnoreProperties("vacinasAplicadas")
    private Vacina vacina;

    @ManyToOne
    @JsonIgnoreProperties("vacinasAplicadas")
    private Animal animal;

    @ManyToOne
    @JsonIgnoreProperties("vacinasAplicadas")
    private Veterinario veterinario;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDataAplicacao() {
        return dataAplicacao;
    }

    public VacinaAplicada dataAplicacao(Instant dataAplicacao) {
        this.dataAplicacao = dataAplicacao;
        return this;
    }

    public void setDataAplicacao(Instant dataAplicacao) {
        this.dataAplicacao = dataAplicacao;
    }

    public Integer getDoses() {
        return doses;
    }

    public VacinaAplicada doses(Integer doses) {
        this.doses = doses;
        return this;
    }

    public void setDoses(Integer doses) {
        this.doses = doses;
    }

    public String getObservacao() {
        return observacao;
    }

    public VacinaAplicada observacao(String observacao) {
        this.observacao = observacao;
        return this;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public Vacina getVacina() {
        return vacina;
    }

    public VacinaAplicada vacina(Vacina vacina) {
        this.vacina = vacina;
        return this;
    }

    public void setVacina(Vacina vacina) {
        this.vacina = vacina;
    }

    public Animal getAnimal() {
        return animal;
    }

    public VacinaAplicada animal(Animal animal) {
        this.animal = animal;
        return this;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    public Veterinario getVeterinario() {
        return veterinario;
    }

    public VacinaAplicada veterinario(Veterinario veterinario) {
        this.veterinario = veterinario;
        return this;
    }

    public void setVeterinario(Veterinario veterinario) {
        this.veterinario = veterinario;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        VacinaAplicada vacinaAplicada = (VacinaAplicada) o;
        if (vacinaAplicada.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vacinaAplicada.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VacinaAplicada{" +
            "id=" + getId() +
            ", dataAplicacao='" + getDataAplicacao() + "'" +
            ", doses=" + getDoses() +
            ", observacao='" + getObservacao() + "'" +
            "}";
    }
}
