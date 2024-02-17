package com.lucas.cadastro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lucas.cadastro.model.Endereco;
import com.lucas.cadastro.repository.EnderecoRepository;

@Service
public class EnderecoService {

	
	@Autowired
	private EnderecoRepository enderecoRepository;
	
	public List<Endereco>findAll(){
		return enderecoRepository.findAll();
	}
	
	public Endereco findById(Long id) {
		Optional<Endereco> endereco = enderecoRepository.findById(id);
		return endereco.get();
	}
	
	public Endereco save(Endereco endereco) {
		return enderecoRepository.save(endereco);
	}
	
	public void deleteEnderecoId(Long id) {
		enderecoRepository.deleteById(id);
	}
	
	public Endereco updateEndereco(Long id, Endereco endereco) {
		Endereco endereco2 = enderecoRepository.findById(id).get();
		endereco2.setNome(endereco.getNome());
		endereco2.setCep(endereco.getCep());
		endereco2.setLogradouro(endereco.getLogradouro());
		endereco2.setComplemento(endereco.getComplemento());
		endereco2.setBairro(endereco.getBairro());
		endereco2.setLocalidade(endereco.getLocalidade());
		endereco2.setUf(endereco.getUf());
		return enderecoRepository.save(endereco2);
	}
	
	
}
