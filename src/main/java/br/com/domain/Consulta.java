package br.com.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Consulta.
 */
@Entity
@Table(name = "consulta")
public class Consulta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "data_hora")
    private Instant dataHora;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "observacoes")
    private String observacoes;

    @Column(name = "realizada")
    private Boolean realizada;

    @ManyToOne
    @JsonIgnoreProperties("consultas")
    private Animal animal;

    @ManyToOne
    @JsonIgnoreProperties("consultas")
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

    public Consulta dataHora(Instant dataHora) {
        this.dataHora = dataHora;
        return this;
    }

    public void setDataHora(Instant dataHora) {
        this.dataHora = dataHora;
    }

    public String getDescricao() {
        return descricao;
    }

    public Consulta descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public Consulta observacoes(String observacoes) {
        this.observacoes = observacoes;
        return this;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Boolean isRealizada() {
        return realizada;
    }

    public Consulta realizada(Boolean realizada) {
        this.realizada = realizada;
        return this;
    }

    public void setRealizada(Boolean realizada) {
        this.realizada = realizada;
    }

    public Animal getAnimal() {
        return animal;
    }

    public Consulta animal(Animal animal) {
        this.animal = animal;
        return this;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    public Veterinario getVeterinario() {
        return veterinario;
    }

    public Consulta veterinario(Veterinario veterinario) {
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
        Consulta consulta = (Consulta) o;
        if (consulta.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), consulta.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Consulta{" +
            "id=" + getId() +
            ", dataHora='" + getDataHora() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", observacoes='" + getObservacoes() + "'" +
            ", realizada='" + isRealizada() + "'" +
            "}";
    }
}
