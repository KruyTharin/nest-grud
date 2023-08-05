import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  private students = [
    { id: 0, name: 'mike', gender: 'male', age: 20 },
    { id: 1, name: 'alica', gender: 'female', age: 18 },
    { id: 2, name: 'jame', gender: 'male', age: 19 },
    { id: 3, name: 'jimmy', gender: 'female', age: 20 },
    { id: 4, name: 'chen', gender: 'male', age: 22 },
    { id: 5, name: 'michael', gender: 'male', age: 23 },
  ];

  createStudent(createStudentDto: CreateStudentDto) {
    const student = {
      ...createStudentDto,
      id: Date.now(),
    };

    this.students.push(student);

    return student;
  }

  getStudents(name?: string) {
    if (name) {
      return this.students.filter((s) => s.name === name);
    }

    return this.students;
  }

  getStudent(id: number) {
    const student = this.students.find((s) => s.id === id);

    if (!student) {
      throw new Error('This student not found');
    }

    return student;
  }

  updateStudent(id: number, updateStudentDto: UpdateStudentDto) {
    this.students = this.students.map((s) => {
      if (s.id === id) {
        return { ...s, ...updateStudentDto };
      }

      return s;
    });

    return this.getStudent(id);
  }

  removeStudent(id: number) {
    const tobeRemoved = this.getStudent(id);
    this.students = this.students.filter((s) => s.id !== id);

    return tobeRemoved;
  }
}
