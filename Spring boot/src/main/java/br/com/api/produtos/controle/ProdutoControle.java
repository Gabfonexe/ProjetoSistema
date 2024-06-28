package br.com.api.produtos.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.produtos.modelo.ProdutoModelo;
import br.com.api.produtos.modelo.RespostaModelo;
import br.com.api.produtos.servico.ProdutoServico;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // colocando "*" fica liberado a entrade de qualquer rota
public class ProdutoControle {

  @Autowired
  private ProdutoServico ps;

  @DeleteMapping("/remover/{codigo}") //{codigo} é uma var dentro da url
  /*o PathVariable puxa o valor que está presente no {codigo}. E como o valor do {codigo} é o Id
   * usarei o Long para representar o tipo de parametro que devo utilizar como o esperado*/
  public ResponseEntity<RespostaModelo> remover(@PathVariable long codigo){
    return ps.remover(codigo);
  }

  @PutMapping("/alterar")
  public ResponseEntity<?> alterar(@RequestBody ProdutoModelo pm){ // espera um obj do tipo pm
    return ps.cadastrarAlterar(pm, "alterar");
  }

  @PostMapping("/cadastrar") 
  public ResponseEntity<?> cadastrar(@RequestBody ProdutoModelo pm){ // espera um obj do tipo pm
    return ps.cadastrarAlterar(pm, "cadastrar");
  }

  @GetMapping("/listar")
  public Iterable<ProdutoModelo> listar(){
    return ps.listar();

  }

  @GetMapping("/")
  public String rota(){
    return "API de produtos funcionando";
  }

}
