import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuariosRepository } from './repository/usuarios.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private readonly usuariosRepository: UsuariosRepository) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    // 1. Verifica se o e-mail já existe no banco
    const usuarioExistente = await this.usuariosRepository.findByEmail(createUsuarioDto.email);
    if (usuarioExistente) {
      throw new ConflictException('Este e-mail já está em uso.');
    }

    // 2. Criptografa a senha (o '10' é o fator de custo/segurança do hash)
    const salt = await bcrypt.genSalt(10);
    const senhaHasheada = await bcrypt.hash(createUsuarioDto.senha, salt);

    // 3. Monta o objeto no formato que o Prisma espera
    const dadosParaSalvar = {
      nome: createUsuarioDto.nome,
      email: createUsuarioDto.email,
      senha_hash: senhaHasheada,
      status: createUsuarioDto.status ?? 1,
      role: {
        connect: { id: createUsuarioDto.id_role }
      }
    };

    // 4. Salva no banco
    const usuarioCriado = await this.usuariosRepository.create(dadosParaSalvar);

    // 5. Remove o senha_hash antes de devolver como resposta usando o Rest Operator do JavaScript
    const {senha_hash, ...usuarioSemSenha} = usuarioCriado; 
    return usuarioSemSenha;
  }

  async findAll() {
    const usuarios = await this.usuariosRepository.findAll();
    // Remove o senha_hash de todos os usuários da lista
    return usuarios.map(usuario => {
      const {senha_hash, ...usuarioSemSenha} = usuario;
      return usuarioSemSenha;
    });
  }

  async findOne(id: number) {
    const usuario = await this.usuariosRepository.findOne(id);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    const {senha_hash, ...usuarioSemSenha} = usuario;
    return usuarioSemSenha;
  }

  async findByEmail(email: string) {
    const usuario = await this.usuariosRepository.findByEmail(email);
    return usuario; // Aqui é importante retornar o usuário completo, incluindo o senha_hash, para que o AuthService possa comparar a senha durante o login.
  }

  // Aqui eu creio que podemos usar o mesmo método de update tanto para atualizar os dados de um usuário quanto para alterar a senha dele, como todas as propriedades do UpdateUsuarioDto são opcionais, o front-end pode escolher se está tratando de uma solicitação de atualização de dados ou de senha.
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    // Garante que se não mandarem nenhum body, bloqueia a requisição
    if(!updateUsuarioDto || Object.keys(updateUsuarioDto).length === 0) {
      throw new BadRequestException('Nenhum dado para atualizar foi fornecido.');
    }

    const dadosParaAtualizar: any = { ...updateUsuarioDto };

    
    // Se o usuário está trocando a senha na atualização, criptografa ela aqui
    //Usando a interrogação para garantir que a propriedade só seja lida se o objeto existir
    if (updateUsuarioDto?.senha) {
      const salt = await bcrypt.genSalt(10);
      dadosParaAtualizar.senha_hash = await bcrypt.hash(updateUsuarioDto.senha, salt);
      delete dadosParaAtualizar.senha; // Remove o texto puro
    }

    // Remove o id_role solto e ajusta para o formato de relacionamento do Prisma
    if (updateUsuarioDto.id_role) {
      dadosParaAtualizar.role = { connect: { id: updateUsuarioDto.id_role } };
      delete dadosParaAtualizar.id_role;
    }

    const usuarioAtualizado = await this.usuariosRepository.update(id, dadosParaAtualizar);
    const {senha_hash, ...usuarioSemSenha} = usuarioAtualizado;
    return usuarioSemSenha;
  }

  async remove(id: number) {
    return this.usuariosRepository.remove(id);
  }
}