import { useState , useEffect} from "react";

export default function courseDetails({sem})
{
    const[courseData, setCourseData] = useState([]);
    const userObj = JSON.parse(localStorage.getItem("user")) || null;
    
    const regulation = localStorage.getItem("regulation");
    const department = userObj.department || null;
    
    useEffect(() => {
        const fetchCourseData = async() =>
        {
            if(!sem)
            {
                const missingSem = "Missing semester info!"
                setCourseData(missingSem);
                return;
            }
            try{
                const result = await fetch(`http://localhost:5000/api/courses/?sem=${sem}&department=${department}&regulation=${regulation}`, {
                    method: "GET",
                    headers: {'Content-Type' : 'application/json'},
                });
                const data = await result.json();
                setCourseData(data.rows);
            }
            catch(error)
            {
                console.error("Error fetching course data", error);
                return;
            }
        }

        fetchCourseData();
    }, []);

    console.log("Course data: ", courseData);
    return(
        <div className = "bg-white text-black w-full flex items-center justify-center">
            {
                courseData.map(course => (
                    <div key={course.course_id} className="border-b-2 border-black p-4 w-full">
                        <h2>{course.course_name}</h2>
                        <p>Course ID: {course.course_code}</p>
                        <p>Course Name: {course.course_name}</p>
                        <p>Course Category: {course.category}</p>
                        <p>Theory/Practical: {course.tp}</p>
                        <p>Gate/Common: {course.gate_common}</p>
                        <p>Common Dept: {course.common_dept}</p>
                        <p>Credits: {course.credits}</p>
                        <p>LTP: {course.ltp}</p>
                    </div>
                ))
            }
        
        </div>
    )
}