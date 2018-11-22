package br.com.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Vacina.
 */
@Entity
@Table(name = "vacina")
public class Vacina implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "contra_indicacoes")
    private String contraIndicacoes;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "frequencia_mes_aplicacao")
    private Integer frequenciaMesAplicacao;

    @OneToMany(mappedBy = "vacina")
    private Set<VacinaAplicada> vacinasAplicadas = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Vacina nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getContraIndicacoes() {
        return contraIndicacoes;
    }

    public Vacina contraIndicacoes(String contraIndicacoes) {
        this.contraIndicacoes = contraIndicacoes;
        return this;
    }

    public void setContraIndicacoes(String contraIndicacoes) {
        this.contraIndicacoes = contraIndicacoes;
    }

    public String getDescricao() {
        return descricao;
    }

    public Vacina descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getFrequenciaMesAplicacao() {
        return frequenciaMesAplicacao;
    }

    public Vacina frequenciaMesAplicacao(Integer frequenciaMesAplicacao) {
        this.frequenciaMesAplicacao = frequenciaMesAplicacao;
        return this;
    }

    public void setFrequenciaMesAplicacao(Integer frequenciaMesAplicacao) {
        this.frequenciaMesAplicacao = frequenciaMesAplicacao;
    }

    public Set<VacinaAplicada> getVacinasAplicadas() {
        return vacinasAplicadas;
    }

    public Vacina vacinasAplicadas(Set<VacinaAplicada> vacinaAplicadas) {
        this.vacinasAplicadas = vacinaAplicadas;
        return this;
    }

    public Vacina addVacinasAplicada(VacinaAplicada vacinaAplicada) {
        this.vacinasAplicadas.add(vacinaAplicada);
        vacinaAplicada.setVacina(this);
        return this;
    }

    public Vacina removeVacinasAplicada(VacinaAplicada vacinaAplicada) {
        this.vacinasAplicadas.remove(vacinaAplicada);
        //vacinaAplicada.setVacina(null);
        return this;
    }

    public void setVacinasAplicadas(Set<VacinaAplicada> vacinaAplicadas) {
        this.vacinasAplicadas = vacinaAplicadas;
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
        Vacina vacina = (Vacina) o;
        if (vacina.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vacina.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Vacina{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", contraIndicacoes='" + getContraIndicacoes() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", frequenciaMesAplicacao=" + getFrequenciaMesAplicacao() +
            "}";
    }
}
