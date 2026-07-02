import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  createDepartment(@Body('name') name: string) {
    return this.departmentService.createDept(name);
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
  async updateDepartment(@Param('id') id: string, @Body('name') name: string) {
    return this.departmentService.updateDept(id, name);
  }

    @Delete(':id')
    async removeDepartment(@Param('id') id: string) {
        return this.departmentService.removeDept(id);
    }
}
