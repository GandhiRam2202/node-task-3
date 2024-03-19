import express from 'express';
import { createMentor, createStudent, assignMentorToStudent, getPreviousMentorForStudent, assignStudentsToMentor, getStudentsForMentor, getAllStudents, getAllMentors } from '../Controller/Controller.js';

const router = express.Router();


// Routes for Mentor API
router.post('/mentors', createMentor);

// Routes for get All Mentor

router.get('/allmentors', getAllMentors);

// Routes for Student API

router.post('/students', createStudent);

// Routes for get All Student 

router.get('/allstudents', getAllStudents);

// Route for assigning students to a mentor

router.put('/assign-students/:mentorId', assignStudentsToMentor);

// Route for assigning or changing mentor for a particular student

router.put('/assign-mentor/:studentId', assignMentorToStudent);

// Route for getting all students for a particular mentor

router.get('/students/:mentorId', getStudentsForMentor);

// Route for getting the previously assigned mentor for a particular student

router.get('/previous-mentor/:studentId', getPreviousMentorForStudent);


export default router;
