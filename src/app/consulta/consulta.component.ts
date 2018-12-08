import { Consulta } from './consulta.model';
import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import {CardModule} from 'primeng/card';
import { Vacina } from './vacina.model';
import { Cirurgia } from './cirurgia.model';

@Component({
  selector: 'consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  
  public consultas: Consulta[] = []
  public vacinas: Vacina[] = []
  public cirurgias: Cirurgia[] = []
  
  constructor() { }

  ngOnInit() {
    let consu: Consulta = new Consulta()
    consu.dataHora = new Date()
    consu.descricao = 'Verificação de alergia'
    consu.estabelecimento = 'CIA veterinária'
    consu.veterinario = 'Amadeu da Costa - Animais & CIA'
    this.consultas.push(consu)


    let vaci: Vacina = new Vacina()
    vaci.dataAplicacao = new Date()
    vaci.doses = 2
    vaci.nome = 'Raiva'
    vaci.veterinario = 'Amadeu da Costa - Animais & CIA'
    this.vacinas.push(vaci)

    let vaci2: Vacina = new Vacina()
    let date2 = new Date()
    date2.setDate(1)
    vaci2.dataAplicacao = date2
    vaci2.doses = 1
    vaci2.nome = 'Gripe canina'
    vaci2.veterinario = 'Amadeu da Costa - Animais & CIA'
    this.vacinas.push(vaci2)

    let ciru: Cirurgia = new Cirurgia()
    ciru.dataHora = new Date()
    ciru.nomeProcedimento = 'Castração'
    ciru.observacoes = 'Reagiu bem'
    ciru.veterinario = 'Amadeu da Costa - Animais & CIA'
    this.cirurgias.push(ciru)

    let ciru2: Cirurgia = new Cirurgia()
    let date = new Date()
    date.setHours(10)
    ciru2.dataHora = date
    ciru2.nomeProcedimento = 'Remoção de bola de gordura'
    ciru2.observacoes = 'Reagiu mal'
    ciru2.veterinario = 'Amadeu da Costa - Animais & CIA'
    this.cirurgias.push(ciru2)
  }

}
