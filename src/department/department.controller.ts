import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  createDepartment(@Body() dto: CreateDepartmentDto) {
    return this.departmentService.createDept(dto);
  }

  @Get()
  getAllDepartments() {
    return this.departmentService.getAllDepts();
  }

  @Get(':id')
  async getDepartmentById(@Param('id') id: string) {
    return this.departmentService.getDeptById(id);
  }

  @Patch(':id')
  async updateDepartment(@Param('id') id: string, @Body() dto: UpdateDepartmentDto) {
    return this.departmentService.updateDept(id, dto);
  }

    @Delete(':id')
    async removeDepartment(@Param('id') id: string) {
        return this.departmentService.removeDept(id);
    }
}
