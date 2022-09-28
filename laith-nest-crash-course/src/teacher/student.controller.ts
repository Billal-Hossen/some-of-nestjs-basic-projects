import { Controller, Get, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import {
  FindStudentResponseDto,
  StudentResponseDto,
} from 'src/student/dto/student.dto';
import { StudentService } from 'src/student/student.service';

@Controller('teachers/:teacherId/students')
export class StudentTeacherController {
  constructor(private readonly studentService: StudentService) {}
  // get student under the teacher using teacher  id
  @Get()
  getStusentsUnderTeacher(
    @Param('teacherId', new ParseUUIDPipe()) teacherId: string,
  ): FindStudentResponseDto[] {
    return this.studentService.getStusentsUnderTeacher(teacherId);
  }
  // update student under the teacher using teacher  id
  @Put('/:studentId')
  updateStusentsUnderTeacher(
    @Param('teacherId', new ParseUUIDPipe()) teacherId: string,
    @Param('studentId', new ParseUUIDPipe()) studentId: string,
  ): StudentResponseDto {
    return this.studentService.updateStudentTeacher(teacherId, studentId);
  }
}
