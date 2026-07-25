// ==========================================
// Step 1: Base Class for All School Members
// ==========================================
class Person {
    // Private fields
    #email;
    #id;

    constructor(name, email, id) {
        this.name = name;
        this.setEmail(email);
        this.setId(id);
    }

    // Email Getter and Setter with Validation
    getEmail() {
        return this.#email;
    }

    setEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof email === "string" && emailRegex.test(email)) {
            this.#email = email;
        } else {
            throw new Error(`Invalid email format for ${this.name}: "${email}"`);
        }
    }

    // ID Getter and Setter with Validation
    getId() {
        return this.#id;
    }

    setId(id) {
        if (id && (typeof id === "number" || typeof id === "string")) {
            this.#id = id;
        } else {
            throw new Error(`Invalid ID provided for ${this.name}`);
        }
    }

    // Shared method to be overridden by subclasses
    describeRole() {
        return `${this.name} (ID: ${this.#id}) is a general school member.`;
    }
}

// ==========================================
// Step 2: Principal Role
// ==========================================
class Principal extends Person {
    constructor(name, email, id) {
        super(name, email, id);
        this.members = [];
    }

    addMember(person) {
        if (person instanceof Person) {
            this.members.push(person);
            console.log(`[Principal] Added ${person.name} to the school roster.`);
        } else {
            console.error("[Principal] Cannot add non-Person instance.");
        }
    }

    removeMember(id) {
        const initialLength = this.members.length;
        this.members = this.members.filter(member => member.getId() !== id);
        if (this.members.length < initialLength) {
            console.log(`[Principal] Member with ID "${id}" was removed.`);
        } else {
            console.log(`[Principal] Member with ID "${id}" not found.`);
        }
    }

    listMembers() {
        console.log("\n--- School Roster ---");
        if (this.members.length === 0) {
            console.log("No members in the school.");
            return;
        }
        this.members.forEach(member => {
            console.log(`- ${member.name} (${member.constructor.name}) | Email: ${member.getEmail()}`);
        });
    }

   describeRole() {
        return `Principal ${this.name} manages school operations and members.`;
    }
}

// ==========================================
// Step 3: Teacher Role
// ==========================================
class Teacher extends Person {
    constructor(name, email, id, subject) {
        super(name, email, id);
        this.subject = subject;
        this.grades = new Map(); // Stores studentName -> grade
    }

    gradeStudent(studentName, grade) {
        if (typeof grade === "number" && grade >= 0 && grade <= 100) {
            this.grades.set(studentName, grade);
            console.log(`[Teacher ${this.name}] Graded ${studentName}: ${grade}`);
        } else {
            console.error(`[Teacher ${this.name}] Invalid grade: ${grade}. Grade must be between 0 and 100.`);
        }
    }

    listGradedStudents() {
        console.log(`\n--- Grades given by Teacher ${this.name} (${this.subject}) ---`);
        if (this.grades.size === 0) {
            console.log("No students graded yet.");
            return;
        }
        this.grades.forEach((grade, student) => {
            console.log(`- ${student}: ${grade}`);
        });
    }

    describeRole() {
        return `Teacher ${this.name} teaches ${this.subject} and evaluates students.`;
    }
}

// ==========================================
// Step 4: Student Role
// ==========================================
class Student extends Person {
    constructor(name, email, id) {
        super(name, email, id);
        this.enrolledSubjects = [];
    }

    enroll(subject) {
        if (typeof subject === "string" && !this.enrolledSubjects.includes(subject)) {
            this.enrolledSubjects.push(subject);
            console.log(`[Student ${this.name}] Enrolled in ${subject}.`);
        } else {
            console.log(`[Student ${this.name}] Already enrolled in or invalid subject: ${subject}`);
        }
    }

    listEnrolledSubjects() {
        console.log(`\n--- Enrolled Subjects for ${this.name} ---`);
        if (this.enrolledSubjects.length === 0) {
            console.log("No subjects enrolled.");
            return;
        }
        this.enrolledSubjects.forEach(subject => {
            console.log(`- ${subject}`);
        });
    }

    describeRole() {
        return `Student ${this.name} attends classes and studies enrolled subjects.`;
    }
}

// ==========================================
// Step 5: Simulation Execution
// ==========================================
console.log("=== 🏫 SCHOOL SYSTEM SIMULATION ===\n");

// 1. Create Instances
const principal = new Principal("Dr. Ahmed", "ahmed@school.edu", "P001");
const teacher1 = new Teacher("Ms. Sarah", "sarah@school.edu", "T001", "Cyber Security");
const teacher2 = new Teacher("Mr. Omar", "omar@school.edu", "T002", "Mathematics");
const student1 = new Student("Youssef", "youssef@student.edu", "S001");
const student2 = new Student("Esraa", "esraa@student.edu", "S002");

// 2. Principal Adds Members
console.log("--- 1. Registering School Members ---");
principal.addMember(teacher1);
principal.addMember(teacher2);
principal.addMember(student1);
principal.addMember(student2);

// 3. Student Actions
console.log("\n--- 2. Enrolling Subjects ---");
student1.enroll("Cyber Security");
student1.enroll("Network Security");
student2.enroll("Mathematics");

student1.listEnrolledSubjects();

// 4. Teacher Actions
console.log("\n--- 3. Grading Students ---");
teacher1.gradeStudent(student1.name, 95);
teacher1.gradeStudent(student2.name, 88);

teacher1.listGradedStudents();

// 5. Display All Roles (Polymorphism)
console.log("\n--- 4. Describing All Roles (Polymorphism) ---");
const schoolMembers = [principal, teacher1, teacher2, student1, student2];

schoolMembers.forEach(member => {
    console.log(member.describeRole());
});

// 6. Principal Roster View & Removal Test
principal.listMembers();

console.log("\n--- 5. Removing a Member ---");
principal.removeMember("T002"); // Removing Mr. Omar
principal.listMembers();