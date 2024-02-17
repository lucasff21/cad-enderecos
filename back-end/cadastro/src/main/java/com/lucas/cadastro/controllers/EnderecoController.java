package com.lucas.cadastro.controllers;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.lucas.cadastro.model.Endereco;
import com.lucas.cadastro.service.EnderecoService;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/auth/enderecos")
public class EnderecoController {

	@Autowired
	private EnderecoService enderecoServ;
	
	
	@GetMapping
	public ResponseEntity<List<Endereco>> findAll(){
		List<Endereco> endereco = enderecoServ.findAll();
		return ResponseEntity.ok().body(endereco);
	}
	
	
	@PostMapping
	public ResponseEntity<Endereco> insert(@RequestBody Endereco endereco) throws Exception{
		
		URL url = new URL("https://viacep.com.br/ws/"+endereco.getCep()+"/json/");
		URLConnection connection = url.openConnection();
		InputStream is = connection.getInputStream();
		BufferedReader br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
		
		String cep = "";
		StringBuilder jsonCep = new StringBuilder();
		
		while((cep = br.readLine()) != null) {
			jsonCep.append(cep);
		}
		 
		Endereco enderAux = new Gson().fromJson(jsonCep.toString(), Endereco.class);
		endereco.setCep(enderAux.getCep());
		endereco.setLogradouro(enderAux.getLogradouro());
		endereco.setComplemento(enderAux.getComplemento());
		endereco.setBairro(enderAux.getBairro());
		endereco.setLocalidade(enderAux.getLocalidade());
		endereco.setUf(enderAux.getUf());
		
		
		endereco = enderecoServ.save(endereco);
		return ResponseEntity.ok().body(endereco);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Endereco> findById(@PathVariable Long id){
		Endereco endereco = enderecoServ.findById(id);
		return ResponseEntity.ok().body(endereco);
	}
	
	@PutMapping(value = "{id}")
	public ResponseEntity<Endereco> updateEndereco(@PathVariable Long id,@RequestBody Endereco exercicio){
		exercicio = enderecoServ.updateEndereco(id, exercicio);
		return ResponseEntity.ok().body(exercicio);
	}
	
	@DeleteMapping(value = "{id}")
	public ResponseEntity<Void> deleteEndereco(@PathVariable Long id){
		enderecoServ.deleteEnderecoId(id);
		return ResponseEntity.noContent().build();
	}
	
}
