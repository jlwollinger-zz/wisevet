package br.com.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Cirurgia.
 */
@Entity
@Table(name = "cirurgia")
public class Cirurgia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "data_hora")
    private Instant dataHora;

    @Column(name = "nome_procedimento")
    private String nomeProcedimento;

    @Column(name = "observacoes")
    private String observacoes;

    @ManyToOne
    @JsonIgnoreProperties("cirurgias")
    private Animal animal;

    @ManyToOne
    @JsonIgnoreProperties("cirurgias")
    private Veterinario veterinario;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDataHora() {
        return dataHora;
    }

    public Cirurgia dataHora(Instant dataHora) {
        this.dataHora = dataHora;
        return this;
    }

    public void setDataHora(Instant dataHora) {
        this.dataHora = dataHora;
    }

    public String getNomeProcedimento() {
        return nomeProcedimento;
    }

    public Cirurgia nomeProcedimento(String nomeProcedimento) {
        this.nomeProcedimento = nomeProcedimento;
        return this;
    }

    public void setNomeProcedimento(String nomeProcedimento) {
        this.nomeProcedimento = nomeProcedimento;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public Cirurgia observacoes(String observacoes) {
        this.observacoes = observacoes;
        return this;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Animal getAnimal() {
        return animal;
    }

    public Cirurgia animal(Animal animal) {
        this.animal = animal;
        return this;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    public Veterinario getVeterinario() {
        return veterinario;
    }

    public Cirurgia veterinario(Veterinario veterinario) {
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
        Cirurgia cirurgia = (Cirurgia) o;
        if (cirurgia.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cirurgia.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cirurgia{" +
            "id=" + getId() +
            ", dataHora='" + getDataHora() + "'" +
            ", nomeProcedimento='" + getNomeProcedimento() + "'" +
            ", observacoes='" + getObservacoes() + "'" +
            "}";
    }
}
