package br.com.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Veterinario.
 */
@Entity
@Table(name = "veterinario")
public class Veterinario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "login")
    private String login;

    @Column(name = "nome")
    private String nome;

    @Column(name = "senha")
    private String senha;

    @Column(name = "numero_registro_cfmv")
    private Integer numeroRegistroCfmv;

    @Column(name = "numero_registro_crmv")
    private Integer numeroRegistroCrmv;

    @OneToOne    @JoinColumn(unique = true)
    private Endereco endereco;

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

    public String getEmail() {
        return email;
    }

    public Veterinario email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLogin() {
        return login;
    }

    public Veterinario login(String login) {
        this.login = login;
        return this;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getNome() {
        return nome;
    }

    public Veterinario nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public Veterinario senha(String senha) {
        this.senha = senha;
        return this;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Integer getNumeroRegistroCfmv() {
        return numeroRegistroCfmv;
    }

    public Veterinario numeroRegistroCfmv(Integer numeroRegistroCfmv) {
        this.numeroRegistroCfmv = numeroRegistroCfmv;
        return this;
    }

    public void setNumeroRegistroCfmv(Integer numeroRegistroCfmv) {
        this.numeroRegistroCfmv = numeroRegistroCfmv;
    }

    public Integer getNumeroRegistroCrmv() {
        return numeroRegistroCrmv;
    }

    public Veterinario numeroRegistroCrmv(Integer numeroRegistroCrmv) {
        this.numeroRegistroCrmv = numeroRegistroCrmv;
        return this;
    }

    public void setNumeroRegistroCrmv(Integer numeroRegistroCrmv) {
        this.numeroRegistroCrmv = numeroRegistroCrmv;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public Veterinario endereco(Endereco endereco) {
        this.endereco = endereco;
        return this;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Set<VacinaAplicada> getVacinasAplicadas() {
        return vacinasAplicadas;
    }

    public Veterinario vacinasAplicadas(Set<VacinaAplicada> vacinaAplicadas) {
        this.vacinasAplicadas = vacinaAplicadas;
        return this;
    }

    public Veterinario addVacinasAplicada(VacinaAplicada vacinaAplicada) {
        this.vacinasAplicadas.add(vacinaAplicada);
        //vacinaAplicada.setVacina(this);
        return this;
    }

    public Veterinario removeVacinasAplicada(VacinaAplicada vacinaAplicada) {
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

    public Veterinario cirurgias(Set<Cirurgia> cirurgias) {
        this.cirurgias = cirurgias;
        return this;
    }

    public Veterinario addCirurgias(Cirurgia cirurgia) {
        this.cirurgias.add(cirurgia);
        //cirurgia.setAnimal(this);
        return this;
    }

    public Veterinario removeCirurgias(Cirurgia cirurgia) {
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

    public Veterinario consultas(Set<Consulta> consultas) {
        this.consultas = consultas;
        return this;
    }

    public Veterinario addConsultas(Consulta consulta) {
        this.consultas.add(consulta);
        //consulta.setAnimal(this);
        return this;
    }

    public Veterinario removeConsultas(Consulta consulta) {
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
        Veterinario veterinario = (Veterinario) o;
        if (veterinario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), veterinario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Veterinario{" +
            "id=" + getId() +
            ", email='" + getEmail() + "'" +
            ", login='" + getLogin() + "'" +
            ", nome='" + getNome() + "'" +
            ", senha='" + getSenha() + "'" +
            ", numeroRegistroCfmv=" + getNumeroRegistroCfmv() +
            ", numeroRegistroCrmv=" + getNumeroRegistroCrmv() +
            "}";
    }
}
