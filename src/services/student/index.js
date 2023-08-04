import studentRepository from "../../repositories/student/index.js"

async function student(userId){
 
    const result = await studentRepository.student(userId)
    return result
}


const studentServices = {
    student
}

export default studentServices