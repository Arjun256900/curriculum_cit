import { pool } from "../config/db.js"
import express from "express"

const router  = express.Router();

router.get('/', async(req, res) => {
    try
    {
        const {sem, department, regulation} = req.query;
        console.log(sem, department, regulation);
        if(!sem || !department || !regulation)
        {
            return res.status(400).json({message: "Missing required parameters: semester, department, regulation"});
        }
        const result = await pool.query("SELECT * FROM courses WHERE semester = $1 AND department = $2 AND regulation = $3",
        [sem, department, regulation]);
        return res.status(200).json(result);
    }
    catch(error)
    {   
        console.error(error);
        return res.status(500).json({message: "Server error"});
    }
});

export default router;
