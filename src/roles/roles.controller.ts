import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role as RoleEnum } from '../auth/roles.enum';

@UseGuards(AuthGuard('jwt'), RolesGuard) // Protege esta rota para que apenas usuários autenticados com a role ADMIN possam acessá-la
@Roles(RoleEnum.ADMIN) // Define que esta rota só pode ser acessada por usuários com a role ADMIN
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id); // Converte para número
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto); // Converte para número
  }

  @Patch(':id/reativar')
  async reinstate(@Param('id') id: string) {
    return this.rolesService.reinstate(+id); // Converte para número
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id); // Converte para número
  }

  
  @Delete(':id/permanente')
  removePerm(@Param('id') id: string) {
    return this.rolesService.removePerm(+id); // Converte para número
  }
}