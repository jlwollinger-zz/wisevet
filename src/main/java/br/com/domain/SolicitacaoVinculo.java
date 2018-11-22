package br.com.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import br.com.domain.enumeration.STATUSSOLICITACAOVINCULO;

/**
 * A SolicitacaoVinculo.
 */
@Entity
@Table(name = "solicitacao_vinculo")
public class SolicitacaoVinculo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "data_envio")
    private Instant dataEnvio;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private STATUSSOLICITACAOVINCULO status;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDataEnvio() {
        return dataEnvio;
    }

    public SolicitacaoVinculo dataEnvio(Instant dataEnvio) {
        this.dataEnvio = dataEnvio;
        return this;
    }

    public void setDataEnvio(Instant dataEnvio) {
        this.dataEnvio = dataEnvio;
    }

    public STATUSSOLICITACAOVINCULO getStatus() {
        return status;
    }

    public SolicitacaoVinculo status(STATUSSOLICITACAOVINCULO status) {
        this.status = status;
        return this;
    }

    public void setStatus(STATUSSOLICITACAOVINCULO status) {
        this.status = status;
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
        SolicitacaoVinculo solicitacaoVinculo = (SolicitacaoVinculo) o;
        if (solicitacaoVinculo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), solicitacaoVinculo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SolicitacaoVinculo{" +
            "id=" + getId() +
            ", dataEnvio='" + getDataEnvio() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
