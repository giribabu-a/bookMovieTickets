const express = require('express');
const mysql = require("mysql");
const cors = require("cors");

const port = 4000 || process.env.PORT;
const app = express();

app.use(cors())  // middleware to allow cross-origin requests
app.use(express.json())  // middleware to parse JSON data

// database connectivity
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ticketBooking'
});

db.connect((error) => {
    if (error) {
        console.error("Database connection failed", error)
    } else {
        console.log("Connected to MySQL database")
    }
});

// registration
app.post("/register", (request, response) => {
    try {
        const { fullName, email, mobileNumber, password } = request.body;

        // Input validation
        if (!fullName || !email || !mobileNumber || !password) {
            return response.status(400).json({ message: "All fields are required" });
        }

        const isUserFoundQuery = "SELECT * FROM usersdata1 WHERE email = ?";
        const newUserQuery = "INSERT INTO usersdata1 (fullName,email,mobileNumber,password) VALUES (?,?,?,?)";

        // hashed password
        // const hashedPassword = await bcrypt.hash(password, 10);

        db.query(isUserFoundQuery, [email], (error, result) => {
            if (error) {
                console.log("Error checking existing user:", error);
                return response.status(500).json({ message: 'Internal server error' });
            }
            else if (result.length > 0) {
                return response.status(400).json({ message: "User already exists!" })
            }
            else {
                db.query(newUserQuery, [fullName, email, mobileNumber, password], (err, result) => {
                    if (err) {
                        console.log("Error creating new user", err);
                        return response.status(500).json({ message: "Internal server error" });
                    }
                    else {
                        return response.status(201).json({ message: "Registration successful!" });
                    }
                })
            }
        })
    }
    catch (error) {
        console.log("Register API error:", error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

// login
app.post("/login", (request, response) => {
    try {
        const { email, password } = request.body;

        const isUserFoundQuery = "SELECT * FROM usersdata1 WHERE email = ? AND password = ?";
        const isEmailFoundQuery = "SELECT * FROM usersdata1 WHERE email = ?";

        db.query(isUserFoundQuery, [email, password], (err, results) => {
            if (err) {
                return response.status(500).json({ message: "Internal server error at user details in Login API" })
            }
            else if (results.length > 0) {
                const userid = results[0].userId;
                return response.status(200).json({ userid, message: "Login Successful!" })
            }
            else {
                db.query(isEmailFoundQuery, [email], (error, result) => {
                    if (error) {
                        return response.status(500).json({ message: "Internal server error at User Email found in Login API" })
                    }
                    else if (result.length > 0) {
                        return response.status(400).json({ message: "Incorrect password!" })
                    }
                    else {
                        return response.status(401).json({ message: "Invalid email, please register!" })
                    }
                })
            }
        })
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Internal server error at Login API' })
    }
});

// profile details
app.get("/profile/:userid", (request, response) => {
    try {
        const { userid } = request.params;

        //input validation
        if (!userid) {
            return response.status(400).json({ message: "User ID is required" })
        }
        const isUserQuery = `SELECT * FROM usersdata1 WHERE userId = ?`;
        const isUserGenresQuery = `SELECT * FROM usergenres WHERE user_id = ?`;

        db.query(isUserQuery, [userid], (err, res) => {
            if (err) {
                console.error("Error fetching user profile", err);
                return response.status(500).json({ message: "Internal server error at User Profile" })
            }
            else if (res.length > 0) {
                const userProfile = res[0];
                
                db.query(isUserGenresQuery, [userid], (genreError, genreResult) => {
                    if (genreError) {
                        return response.status(500).json({ message: "Internal server error at User Genres" })
                    }
                    // else if (genreResult.length > 0) {
                    //     const genre = genreResult[0];
                    //     return response.status(200).json({ message: "Successfully fetched user details", user: userProfile, genres: genre })
                    // }
                    else{
                        const genre = genreResult[0];
                        return response.status(200).json({ message: "Successfully fetched user details", user: userProfile, genres: genre })
                    }
                })
            }
            else {
                return response.status(404).json({ message: "User not found" })
            }
        })
    }
    catch (error) {
        console.error("Profile API error", error);
        return response.status(500).json({ message: "Internal server error at User Profile API" })
    }
});

// updating user details
app.put("/edituserdetails", (request, response) => {
    try {
        const { accountDetails, selectedGenres } = request.body;
        const { userId, fullName, email, mobileNumber, password, age, gender, address } = accountDetails;

        const updateQuery = `
            UPDATE usersdata1     
            SET fullName = ?, email = ?, mobileNumber = ?, age = ?, gender = ?, address = ?
            WHERE userId = ?
        `;

        db.query(updateQuery, [fullName, email, mobileNumber, age, gender, address, userId], (error, result) => {
            if (error) {
                console.error('Database Error:', error);
                return response.status(500).json({ message: 'Internal server error' });
            }
            if (result.affectedRows === 0) {
                return response.status(404).json({ message: 'User not found' });
            }

            // handle selectedGenres update
            const deleteGenresQuery = `DELETE FROM usergenres WHERE user_id = ?`;
            db.query(deleteGenresQuery, [userId], (deleteError) => {
                if (deleteError) {
                    console.error("Error deleting genres:", deleteError)
                    return response.status(500).json({ message: "Failed to update genres" })
                }
            });

            // insert new genres
            const insertGenresQuery = `INSERT INTO usergenres (user_id,genres) VALUES (?,?)`
            const genreValues = selectedGenres.toString();

            db.query(insertGenresQuery, [userId, genreValues], (insertError) => {
                if (insertError) {
                    console.error("Error inserting genres:", insertError)
                    return response.status(500).json({ message: "Failed to update genres" })
                }
            })
            response.status(200).json({ message: 'User details updated successfully' });
        });
    } catch (error) {
        console.error('Error:', error.message);
        return response.status(500).json({ message: 'Internal server error at PUT API' });
    }
});

// change password
app.put("/change-password", (request, response) => {
    try {
        const { userId, oldPassword, newPassword } = request.body;

        if(!userId || !oldPassword || !newPassword){
            return response.status(400).json({message: "Missing required fields!"})
        }

        const userUserFoundQuery = `SELECT * FROM usersdata1 WHERE userId = ? AND password = ?`;
        const updatePasswordQuery = "UPDATE usersdata1 SET password = ? WHERE userId = ?";

        db.query(userUserFoundQuery, [userId, oldPassword], (error, result) => {
            if(error){
                console.log('Database error during user lookup: ' + error)
                return response.status(500).json({message: 'Database error'})
            }
            else if(result.length > 0){
                db.query(updatePasswordQuery, [newPassword, userId], (err, results) => {
                    if(err){
                        console.log('Database error during password update: ' + error)
                        return response.status(500).json({message: "Failed to update password"})
                    }
                    else if(results.affectedRows > 0){
                        console.log('Password updated successfully for userId: ' + userId)
                        return response.status(200).json({message: "Password updated successfully!"})
                    }
                    else{
                        console.log("No rows affected")
                        return response.status(500).json({message: "Failed to update password"})
                    }
                })
            }
            else{
                console.log('Incorrect old password')
                return response.status(401).json({message: "Incorrect old password"})
            }
        })
    }
    catch (error) {
        console.error("Error in change password route: " + error.message);
        return response.status(500).json({ message: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Server running on ${port}`)
});