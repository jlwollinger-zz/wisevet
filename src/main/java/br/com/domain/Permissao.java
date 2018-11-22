package br.com.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Permissao.
 */
@Entity
@Table(name = "permissao")
public class Permissao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "editar")
    private Boolean editar;

    @Column(name = "excluir")
    private Boolean excluir;

    @Column(name = "nome")
    private String nome;

    @Column(name = "recurso")
    private String recurso;

    @Column(name = "visualisar")
    private Boolean visualisar;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isEditar() {
        return editar;
    }

    public Permissao editar(Boolean editar) {
        this.editar = editar;
        return this;
    }

    public void setEditar(Boolean editar) {
        this.editar = editar;
    }

    public Boolean isExcluir() {
        return excluir;
    }

    public Permissao excluir(Boolean excluir) {
        this.excluir = excluir;
        return this;
    }

    public void setExcluir(Boolean excluir) {
        this.excluir = excluir;
    }

    public String getNome() {
        return nome;
    }

    public Permissao nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getRecurso() {
        return recurso;
    }

    public Permissao recurso(String recurso) {
        this.recurso = recurso;
        return this;
    }

    public void setRecurso(String recurso) {
        this.recurso = recurso;
    }

    public Boolean isVisualisar() {
        return visualisar;
    }

    public Permissao visualisar(Boolean visualisar) {
        this.visualisar = visualisar;
        return this;
    }

    public void setVisualisar(Boolean visualisar) {
        this.visualisar = visualisar;
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
        Permissao permissao = (Permissao) o;
        if (permissao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), permissao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Permissao{" +
            "id=" + getId() +
            ", editar='" + isEditar() + "'" +
            ", excluir='" + isExcluir() + "'" +
            ", nome='" + getNome() + "'" +
            ", recurso='" + getRecurso() + "'" +
            ", visualisar='" + isVisualisar() + "'" +
            "}";
    }
}
