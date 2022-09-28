import { Injectable } from '@nestjs/common';
import { teachers } from 'src/db';
import { FindTeacherResponseDto } from './dto/teacher.dto';

@Injectable()
export class TeacherService {
  private teachers = teachers;
  getTeacher(): FindTeacherResponseDto[] {
    return this.teachers;
  }
  getTeacherById(teacherId: string): FindTeacherResponseDto {
    return this.teachers.find((teacher) => teacher.id === teacherId);
  }
}
