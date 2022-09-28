import { Injectable } from '@nestjs/common';
import { students } from 'src/db';
import { v4 as uuid } from 'uuid';
import {
  createStusentDto,
  FindStudentResponseDto,
  StudentResponseDto,
  UpdateStusentDto,
} from './dto/student.dto';

@Injectable()
export class StudentService {
  private students = students;
  getStudents(): FindStudentResponseDto[] {
    return this.students;
  }
  getStusentById(studentId: string): FindStudentResponseDto {
    return this.students.find((student) => student.id === studentId);
  }
  createStudent(payload: createStusentDto): StudentResponseDto {
    const newStudent = {
      id: uuid(),
      ...payload,
    };
    this.students.push(newStudent);
    return newStudent;
  }
  //   updateStudent(
  //     studentId: string,
  //     payload: UpdateStusentDto,
  //   ): StudentResponseDto {
  //     const updateStudentList = this.students.map((student) => {
  //       let updateStudent: StudentResponseDto;
  //       if (student.id === studentId) {
  //         updateStudent = {
  //           id,
  //           ...payload,
  //         };
  //         return updateStudent;
  //       } else {
  //         return students;
  //       }
  //     });
  //   }
  updateStudent(payload: UpdateStusentDto, id: string): StudentResponseDto {
    let updatedStudent: StudentResponseDto;
    console.log(payload);
    const updatedStudentList = this.students.map((student) => {
      if (student.id === id) {
        updatedStudent = {
          id,
          ...payload,
        };
        return updatedStudent;
      } else return student;
    });

    this.students = updatedStudentList;

    return updatedStudent;
  }
  getStusentsUnderTeacher(teacherId: string): FindStudentResponseDto[] {
    return this.students.filter((student) => student.teacher === teacherId);
  }
  // updateStusentsUnderTeacher(
  //   teacherId: string,
  //   studentId: string,
  // ): StudentResponseDto {
  //   let updateStudent: StudentResponseDto;
  //   const updateStudentList = this.students.map((student) => {
  //     if (student.id === studentId) {
  //       updateStudent = {
  //         ...student,
  //         teacher: teacherId,
  //       };
  //       return updateStudent;
  //     } else return student;

  //     this.students = updateStudentList;

  //     return updateStudent;
  //   });
  // }
  updateStudentTeacher(
    teacherId: string,
    studentId: string,
  ): StudentResponseDto {
    let updatedStudent: StudentResponseDto;

    const updatedStudentList = this.students.map((student) => {
      if (student.id === studentId) {
        updatedStudent = {
          ...student,
          teacher: teacherId,
        };
        return updatedStudent;
      } else return student;
    });

    this.students = updatedStudentList;

    return updatedStudent;
  }
}
