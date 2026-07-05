import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: {
        name: dto.name,
        email: dto.email,
        department: { connect: { id: dto.departmentId } },
        ...(dto.TLId && { TL: { connect: { id: dto.TLId } } }),
      },
    });
  }

  findAll() {
    return this.prisma.employee.findMany({
      include: {
        department: true,
        TL: true,
      },
    });
  }

  async findOne(id: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        department: true,
        TL: true,
        teamMembers: true,
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }

    return employee;
  }

  async update(id: string, dto: UpdateEmployeeDto) {
    await this.findOne(id);

    return this.prisma.employee.update({
      where: { id },
      data: {
        name: dto.name,
        email: dto.email,
        ...(dto.departmentId && { department: { connect: { id: dto.departmentId } } }),
        ...(dto.TLId && { TL: { connect: { id: dto.TLId } } }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.employee.delete({
      where: { id },
    });
  }
}