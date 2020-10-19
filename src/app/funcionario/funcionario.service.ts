import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, catchError } from 'rxjs/operators';
import { Funcionario } from './funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService { // todos os metodos p edit, att, inserir, retornar registros de funcionario

  constructor(private _angularFireDatabase: AngularFireDatabase) { }

  insert(funcionario: Funcionario){
    this._angularFireDatabase.list('contato').push(funcionario)
    .then((result: any) => console.log(result.key))
  }

  edit(funcionario: Funcionario, key: string){
    this._angularFireDatabase.list('contato').update(key, funcionario)
  }

  getAll(){ // retornar lista de funcionários pra view
    return this._angularFireDatabase.list('contato')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(data => ({ key: data.payload.key, ...data.payload.val() as {} }));
        })
      )
  }

  delete(key: string){
    this._angularFireDatabase.object(`contato/${key}`).remove();
  }
}
