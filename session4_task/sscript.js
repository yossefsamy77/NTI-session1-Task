// ==========================================
// Task 1: Fetch Product Information
// ==========================================
const products = {
    1: "Laptop",
    2: "Phone",
    3: "Tablet"
};

function getProduct(id) {
    return new Promise((resolve, reject) => {
        const product = products[id];
        if (product) {
            resolve(product);
        } else {
            reject("Product not found");
        }
    });
}

// ==========================================
// Task 2: Calculate Shipping Cost
// ==========================================
function calculateShipping(weight) {
    return new Promise((resolve, reject) => {
        if (weight > 0) {
            resolve(`Shipping cost: ${weight * 5}`);
        } else {
            reject("Invalid weight");
        }
    });
}

// ==========================================
// Task 3: Register New User with Email Verification
// ==========================================
function sendVerificationEmail(email) {
    return new Promise((resolve) => {
        console.log("Sending verification email...");
        setTimeout(() => {
            console.log("Email sent successfully");
            resolve();
        }, 1500);
    });
}

async function registerUser(name, email) {
    try {
        if (!name || !email) {
            throw new Error("Name and email are required");
        }
        
        await sendVerificationEmail(email);
        console.log("User registered successfully");
    } catch (error) {
        console.error("Registration failed:", error.message);
    }
}

// ==========================================
// Task 4: Fetch User Profile From API
// ==========================================
async function getUserProfile(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        
        if (!response.ok) {
            throw new Error(`User not found (Status: ${response.status})`);
        }
        
        const user = await response.json();
        
        console.log(`Name: ${user.name}`);
        console.log(`Email: ${user.email}`);
    } catch (error) {
        console.error("Error fetching user profile:", error.message);
    }
}

// ==========================================
// Execution / Testing
// ==========================================
async function runAllTasks() {
    console.log("--- Task 1 ---");
    try {
        const product = await getProduct(2);
        console.log(product);
    } catch (err) {
        console.log(err);
    }

    console.log("\n--- Task 2 ---");
    try {
        const cost = await calculateShipping(10);
        console.log(cost);
    } catch (err) {
        console.log(err);
    }

    console.log("\n--- Task 3 ---");
    await registerUser("Esraa", "esraa@gmail.com");

    console.log("\n--- Task 4 ---");
    await getUserProfile(1);
}

runAllTasks();