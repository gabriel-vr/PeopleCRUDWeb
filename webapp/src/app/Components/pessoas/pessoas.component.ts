import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PessoasService } from 'src/app/Services/Pessoas/pessoas.service';

import {Pessoa} from "../../Classes/Pessoa"

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  formulario: any;
  tituloFormulario: string;
  pessoas: Pessoa[];
  visibilidadeFormulario: boolean;
  visibilidadeTabela: boolean;
  nomePessoa:  string;
  pessoaId: number

  modalRef: BsModalRef;

  constructor (private pessoasService: PessoasService, private modalService: BsModalService) {

  }

  ResetarFormulario(): void {
    this.formulario = new FormGroup ({
      nome: new FormControl(null),
      idade: new FormControl(null),
      sobrenome: new FormControl(null),
      profissao: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.visibilidadeTabela =  true;
    this.visibilidadeFormulario =  false;
    this.pessoasService.pegarTodos().subscribe(result => {
      this.pessoas = result;
    });

    this.ResetarFormulario();

    this.tituloFormulario = "Nova Pessoa";
  }

  EnviarFormulario() : void {
    const pessoa: Pessoa = this.formulario.value;

    if(pessoa.pessoaId > 0) {
      this.pessoasService.atualizarPessoa(pessoa).subscribe(resultado => {
        this.FecharFormulario();
        this.pessoasService.pegarTodos().subscribe(result => {
          this.pessoas = result;
        });
        alert("Pessoa atualizada com sucesso!");
      })
      return;
    }

    this.pessoasService
    .salvarPessoa(pessoa)
    .subscribe(resultado => {
      this.FecharFormulario();
      this.pessoasService.pegarTodos().subscribe(result => {
        this.pessoas = result;
      });
      alert("Pessoa inserida com sucesso!");
    })


  }

  AtualizarPessoa(pessoaId: number): void {
    this.AbrirFormulario();
    this.pessoasService.pegarPorId(pessoaId).subscribe(resultado => {
      this.formulario = new FormGroup ({
        pessoaId: new FormControl(resultado.pessoaId),
        nome: new FormControl(resultado.nome),
        sobrenome: new FormControl(resultado.sobrenome),
        idade: new FormControl(resultado.idade),
        profissao: new FormControl(resultado.profissao),
      })
      this.tituloFormulario = `Atualizar ${resultado.nome} ${resultado.sobrenome}`
    })
    
  }

  AbrirFormulario(): void {
    this.visibilidadeFormulario = true;
    this.visibilidadeTabela = false;
  }

  FecharFormulario(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
    this.tituloFormulario = "Nova Pessoa";
    this.ResetarFormulario();
  }

  ModalExclusao(pessoaId: number, pessoaNome: string, conteudoModal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(conteudoModal);
    this.pessoaId = pessoaId;
    this.nomePessoa = pessoaNome;
  }

  ExcluirPessoa(pessoaId:  number): void {
    this.pessoasService.deletarPessoa(pessoaId).subscribe(resultado => {
      alert("Pessoa excluida com sucesso");
      this.pessoasService.pegarTodos().subscribe(result => {
        this.pessoas = result;
      });
      this.modalRef.hide();
    })
  }

}
