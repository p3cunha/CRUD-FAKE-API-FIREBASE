import { Component, OnInit } from '@angular/core';

import { Funcionario } from '../funcionario';
import { FuncionarioDataService } from '../funcionario-data.service';
import { FuncionarioService } from '../funcionario.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  funcionario: Funcionario
  key: string = '' // sempre que clicar sobre lista de funcionário, chave vai ser guardada para saber se chamará insert ou update

  constructor(private _funcionarioService: FuncionarioService,
              private _funcionarioDataService: FuncionarioDataService) { }

  ngOnInit(): void {
      this.funcionario = new Funcionario();
      this._funcionarioDataService.funcionarioAtual.subscribe(data => {
        if (data.funcionario && data.key){
          this.funcionario = new Funcionario()
          this.funcionario.nome = data.funcionario.nome
          this.funcionario.departamento = data.funcionario.departamento
          this.funcionario.funcao = data.funcionario.funcao
          this.key  = data.key
        }

      })
  }
  onSubmit(){                      // quando funcionário submeter o form
    if (this.key){                 // se existir uma chave, funcionário ta editando
      this._funcionarioService.edit(this.funcionario, this.key)
    } else {                       // Se não, ele ta inserino um novo usuário
      this._funcionarioService.insert(this.funcionario)
    }

    this.funcionario = new Funcionario() // reset funcionario p/ usuário inserir proximo
    this.key = null                       //zerar chave tbm. Ao att pag infos zeradas
  
  }

}
