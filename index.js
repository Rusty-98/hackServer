import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/user.js';
import Job from './models/jobs.js';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import attendanceRouter from './routes/attendance.js';
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(cors(
    {
        origin: '*'
    }
));
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World');
});


//resgister routes

// app.post('/register', async (req, res) => {
//     try {
//         // Destructure user data from request body
//         const { name, email, password } = req.body;

//         // Check for existing user with email
//         const existingUser = await User.findOne({ email });

//         if (existingUser) {
//             return res.status(400).send('User already exists');
//         }

//         // Create a new user instance
//         const user = await User.create({ name, email, password });
//         const createdUser = await User.findById(user._id).select("-password")

//         if (!createdUser) {
//             return res.status(400).send('User not found');
//         }

//         // Respond with success message (optional)
//         res.status(201).send('User created successfully');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Registration failed');
//     }
// })

app.use("/user", userRouter)

app.use("/api", attendanceRouter)
// create job

app.post("/create-job", async (req, res) => {
    try {
        // Destructure job data from request body
        const { title, company, location, salary, description, skills } = req.body;

        // Create a new job instance
        const job = await Job.create({ title, company, location, salary, description, skills });

        if (!job) {
            return res.status(400).send('Job not found');
        }

        // Respond with success message (optional)
        res.status(201).send('Job created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Job creation failed');
    }
})

app.get("/jobs", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).send(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch jobs');
    }
})

app.listen(port, () => {
    console.log('Server is running on http://localhost:3000');
});