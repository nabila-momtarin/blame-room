import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  //create a new department
  async createDept(dto: CreateDepartmentDto) {
    const newDept = await this.prisma.department.create({
      data: dto ,
    });

    console.log('Created Department:', newDept);
    return newDept;
  }

  //get all departments
  async getAllDepts() {
    const departments = await this.prisma.department.findMany();
    console.log('All Departments:', departments);
    return departments;
  }

  //get a department by id
  async getDeptById(id: string) {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });
    console.log('Found Department:', department);
    if (!department) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }

    return department;
  }

  //update a department
  async updateDept(id: string, dto: UpdateDepartmentDto) {
    await this.getDeptById(id);

    const updatedDept = this.prisma.department.update({
      where: { id },
      data: dto,
    });
    console.log('Updated Department:', updatedDept);
    return updatedDept;
  }

  //delete a department
  async removeDept(id: string) {
    await this.getDeptById(id);
    return this.prisma.department.delete({
      where: { id },
    });
  }
}
