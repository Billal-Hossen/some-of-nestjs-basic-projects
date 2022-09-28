import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  createStusentDto,
  FindStudentResponseDto,
  StudentResponseDto,
  UpdateStusentDto,
} from './dto/student.dto';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  // get all of stusdent
  @Get()
  getStudents(): FindStudentResponseDto[] {
    return this.studentService.getStudents();
  }
  // get student by id
  @Get('/:studentId')
  getStusentById(
    @Param('studentId', new ParseUUIDPipe()) studentId: string,
  ): FindStudentResponseDto {
    return this.studentService.getStusentById(studentId);
  }
  //create student
  @Post()
  createStudent(@Body() body: createStusentDto): FindStudentResponseDto {
    return this.studentService.createStudent(body);
  }
  // update student controller
  @Put('/:studentId')
  updateStudent(
    @Param('studentId', new ParseUUIDPipe()) studentId: string,
    @Body() body: UpdateStusentDto,
  ): StudentResponseDto {
    return this.studentService.updateStudent(body, studentId);
  }
}
