import { Mentor, Student } from '../Models/Schema.js';

// Controller function to create a new mentor

export const createMentor = async (req, res) => {
    try {
        const { mentor_name, mentor_id, mentor_mail } = req.body;
        const mentor = await Mentor.create({ mentor_name, mentor_id, mentor_mail });
        res.status(201).json(mentor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Controller function to create a new student

export const createStudent = async (req, res) => {
    try {
        const { name, mail, stud_id } = req.body;
        const student = await Student.create({ name, mail, stud_id });
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Controller function to get all Mentors

export const getAllMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find();
        res.status(200).json(mentors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Controller function to get all Students

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Controller function to assign multiple students to a mentor


export const assignStudentsToMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;
        const { studentIds } = req.body;

        // Ensure that mentorId and studentIds are valid
        if (!mentorId || !studentIds || !Array.isArray(studentIds)) {
            return res.status(400).json({ error: 'Invalid mentor ID or student IDs' });
        }

        // Update mentor ID for all students
        await Student.updateMany(
            { stud_id: { $in: studentIds } },
            { $set: { 'mentor_id.curr_mentor_id': mentorId } }
        );

        res.status(200).json({ success: true, message: 'Students assigned to mentor successfully' });
    } catch (error) {
        console.error('Error assigning students to mentor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};










// Controller function to assign or change the mentor for a particular student

export const assignMentorToStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { mentorId } = req.body;



        // Find the student by ID
        const student = await Student.findOne({ stud_id: studentId });


        // Check if the student exists
        if (!student) {

            return res.status(404).json({ error: `Student with ID ${studentId} not found` });
        }

        // Check if the student already has a current mentor
        const prevMentorId = student.mentor_id.curr_mentor_id;
        if (prevMentorId) {
            // If the student has a current mentor, update the previous mentor ID

            student.mentor_id.prev_mentor_id = prevMentorId;
        }

        // Update the current mentor ID with the new mentor ID
        student.mentor_id.curr_mentor_id = mentorId;



        // Save the updated student
        await student.save();



        // Respond with success message
        res.status(200).json({ success: true, message: 'Mentor assigned to student successfully' });
    } catch (error) {
        // Handle any errors
        console.error('Error assigning mentor to student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};





// Controller function to get all students for a particular mentor

export const getStudentsForMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;

        // Assuming you have a method in your model to find students by mentor ID
        const students = await Student.find({ 'mentor_id.curr_mentor_id': mentorId }, { name: 1, mail: 1, _id: 0 });

        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students for mentor:', error); // Log any errors for troubleshooting
        res.status(500).json({ error: error.message });
    }
};






// Controller function to get the previously assigned mentor for a particular student

export const getPreviousMentorForStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findOne({ stud_id: studentId });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const prevMentorId = student.mentor_id.prev_mentor_id;
        const prevMentor = await Mentor.findOne({ mentor_id: prevMentorId });
        if (!prevMentor) {
            return res.status(404).json({ error: 'Previous mentor not found' });
        }

        const response = {
            previous_mentor_id: prevMentorId,
            previous_mentor_name: prevMentor.mentor_name
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

