import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RulesService } from './rules.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Rule } from './entities/rule.entity';

@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Post()
  @ApiResponse({status:201, description:'Rule Creado exitosamente', type: Rule})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createRuleDto: CreateRuleDto) {
    return this.rulesService.create(createRuleDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.rulesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rulesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string ,
        @Body() updateRuleDto: UpdateRuleDto) 
        {
    return this.rulesService.update(id, updateRuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rulesService.remove(id);
  }
}
