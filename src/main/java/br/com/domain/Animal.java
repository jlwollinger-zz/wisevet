package br.com.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import br.com.domain.enumeration.Tamanho;

/**
 * A Animal.
 */
@Entity
@Table(name = "animal")
public class Animal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cor_pele")
    private String corPele;

    @Column(name = "data_nascimento")
    private Instant dataNascimento;

    @Column(name = "nome")
    private String nome;

    @Column(name = "observacoes")
    private String observacoes;

    @Enumerated(EnumType.STRING)
    @Column(name = "tamanho")
    private Tamanho tamanho;

    @OneToOne    @JoinColumn(unique = true)
    private Especie especie;

    @OneToMany(mappedBy = "vacina")
    private Set<VacinaAplicada> vacinasAplicadas = new HashSet<>();
    @OneToMany(mappedBy = "animal")
    private Set<Cirurgia> cirurgias = new HashSet<>();
    @OneToMany(mappedBy = "animal")
    private Set<Consulta> consultas = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCorPele() {
        return corPele;
    }

    public Animal corPele(String corPele) {
        this.corPele = corPele;
        return this;
    }

    public void setCorPele(String corPele) {
        this.corPele = corPele;
    }

    public Instant getDataNascimento() {
        return dataNascimento;
    }

    public Animal dataNascimento(Instant dataNascimento) {
        this.dataNascimento = dataNascimento;
        return this;
    }

    public void setDataNascimento(Instant dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getNome() {
        return nome;
    }

    public Animal nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public Animal observacoes(String observacoes) {
        this.observacoes = observacoes;
        return this;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Tamanho getTamanho() {
        return tamanho;
    }

    public Animal tamanho(Tamanho tamanho) {
        this.tamanho = tamanho;
        return this;
    }

    public void setTamanho(Tamanho tamanho) {
        this.tamanho = tamanho;
    }

    public Especie getEspecie() {
        return especie;
    }

    public Animal especie(Especie especie) {
        this.especie = especie;
        return this;
    }

    public void setEspecie(Especie especie) {
        this.especie = especie;
    }

    public Set<VacinaAplicada> getVacinasAplicadas() {
        return vacinasAplicadas;
    }

    public Animal vacinasAplicadas(Set<VacinaAplicada> vacinaAplicadas) {
        this.vacinasAplicadas = vacinaAplicadas;
        return this;
    }

    public Animal addVacinasAplicada(VacinaAplicada vacinaAplicada) {
        this.vacinasAplicadas.add(vacinaAplicada);
        //vacinaAplicada.setVacina(this);
        return this;
    }

    public Animal removeVacinasAplicada(VacinaAplicada vacinaAplicada) {
        this.vacinasAplicadas.remove(vacinaAplicada);
        vacinaAplicada.setVacina(null);
        return this;
    }

    public void setVacinasAplicadas(Set<VacinaAplicada> vacinaAplicadas) {
        this.vacinasAplicadas = vacinaAplicadas;
    }

    public Set<Cirurgia> getCirurgias() {
        return cirurgias;
    }

    public Animal cirurgias(Set<Cirurgia> cirurgias) {
        this.cirurgias = cirurgias;
        return this;
    }

    public Animal addCirurgias(Cirurgia cirurgia) {
        this.cirurgias.add(cirurgia);
        cirurgia.setAnimal(this);
        return this;
    }

    public Animal removeCirurgias(Cirurgia cirurgia) {
        this.cirurgias.remove(cirurgia);
        //cirurgia.setAnimal(null);
        return this;
    }

    public void setCirurgias(Set<Cirurgia> cirurgias) {
        this.cirurgias = cirurgias;
    }

    public Set<Consulta> getConsultas() {
        return consultas;
    }

    public Animal consultas(Set<Consulta> consultas) {
        this.consultas = consultas;
        return this;
    }

    public Animal addConsultas(Consulta consulta) {
        this.consultas.add(consulta);
        consulta.setAnimal(this);
        return this;
    }

    public Animal removeConsultas(Consulta consulta) {
        this.consultas.remove(consulta);
        //consulta.setAnimal(null);
        return this;
    }

    public void setConsultas(Set<Consulta> consultas) {
        this.consultas = consultas;
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
        Animal animal = (Animal) o;
        if (animal.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), animal.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Animal{" +
            "id=" + getId() +
            ", corPele='" + getCorPele() + "'" +
            ", dataNascimento='" + getDataNascimento() + "'" +
            ", nome='" + getNome() + "'" +
            ", observacoes='" + getObservacoes() + "'" +
            ", tamanho='" + getTamanho() + "'" +
            "}";
    }
}
