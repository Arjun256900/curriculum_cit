import { useState, useEffect} from "react";
import { Listbox } from "@headlessui/react";


export default function FacultyDashboard() {
  const[records, setRecords] = useState([]);
  const[selected, setSelected] = useState([]);
  const[chosenRecords, setChosenRecords] = useState([]);
  const[viewSelectedSyllabus, setViewSelectedSyllabus] = useState({});

  const userObj = JSON.parse(localStorage.getItem('user'));
  const department = userObj.department;
  const regulation = localStorage.getItem("regulation");

  console.log(department, regulation);
  
  useEffect(() => {
    const fetchRecords = async() => {
      if (!regulation || !department) return; 
      try {
        const response = await fetch(
          `http://localhost:5000/api/syllabus?regulation=${regulation}&department=${department}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); 
        // console.log("Extracted Data:", data);

        setRecords(data);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    }
    fetchRecords();
  }, [regulation, department]);
  
  useEffect(() => {
    const newChosenRecords = selected.map((courseCode) =>
      records.find((record) => record.course_code === courseCode)
    ).filter(record => record != null); 
    setChosenRecords(newChosenRecords);
  }, [selected, records]);

  const handleCourseSelect = (event) => {
    const selectedCourse = event.target.value;
    console.log("Currently selected: ", selectedCourse);
    if(selectedCourse && !selected.includes(selectedCourse))
    {
      setSelected([...selected, selectedCourse]);
    }
  }

  const handleRemoveCourse = (courseToRemove) => {
    setSelected(selected.filter((course) => course !== courseToRemove))
  }

  const handleViewSyllabus = (syllabusContent) => {
    setViewSelectedSyllabus(syllabusContent);
    console.log(syllabusContent);
  }

  const handleCloseSyllabus = () =>
  {
    setViewSelectedSyllabus({});
  }
  return (
    <>
      <div className={`flex w-full justify-center mt-[15vh]`}>
      
      {Object.keys(viewSelectedSyllabus).length > 0 && (
        <div className="fixed inset-15 z-10 bg-white shadow-2xl h-[85 vh] w-[90vw] p-4 flex flex-row text-black overflow-y-scroll">
          <div>
            {Object.entries(viewSelectedSyllabus).map(([key, value]) => (
              <div key = {key}>
                <h1 className="text-3xl">{key === 'unit1' ? 'Unit 1' : key === 'unit2' ? 'Unit 2' : key === 'unit3' ? 'Unit 3' : key === 'unit4' ? 'Unit 4' : key === 'unit5' ? 'Unit 5' : ""} - {value.name}</h1>
                {Object.entries(value).map(([unitContent, content]) => (
                  <div key = {unitContent}>
                    <p className="text-xl">{unitContent === "name" ? (<h1></h1>) : (content)}</p>
                  </div>
                ))}
                <br />
              </div>
          ))}
          </div>
          <button className="absolute right-3 top-3 hover:scale-210 active:scale-150 cursor-pointer transition-all duration-300" onClick = {handleCloseSyllabus}>⤫</button>
        </div>
      )}   
        
        <div className="bg-white rounded-2xl w-[75%] p-5 transition-all duration-300  lg:scale-110 md:scale-100">
          <div className="flex flex-row gap-4 mb-4">
            <select
              className="bg-white border border-gray-300 text-black h-10 overflow-y-scroll rounded-md"
              defaultValue=""
              required
                
              onChange = {handleCourseSelect}
            >
              <option value="" disabled hidden>
                Select Course Code
              </option>
              {records.map((record) => (
                   <option key = {record.course_code} value = {record.course_code}>{record.course_code} - {record.course_name}</option> 
              ))}
            </select>
            {/* <Listbox.Button>
              {selected}
            </Listbox.Button> */}
            {/* <input
              type="submit"
              className="bg-white text-black rounded-md px-4 py-2 border border-gray-300 
                    hover:bg-blue-700 hover:text-white hover:border-blue-700 
                    transition duration-200 ease-in-out cursor-pointer"
              value="Search"
              onClick = {handleSearch}
            /> */}
          </div>
          <div className = "bg-gray-100 border-black border-1 w-full p-4 mb-5 text-md text-black transition-all duration-300 flex flex-row gap-4 overflow-x-auto">
                {selected.length == 0 ? 
                (
                  <h3 className="text-gray-500">No Courses in Selection yet...</h3>
                ):
                (
                  <div className = "flex flex-row gap-2 ">
                    {selected.map((course) => (
                        <div className = "bg-white p-2 rounded-2xl flex flex-row gap-3 border-1 border-black">
                          <h1 className = "text-black" key = {course} value = {course}>{course}</h1>
                          <button className="hover:scale-220 cursor-pointer transition-all duration-300" onClick = {() => handleRemoveCourse(course)}>⤫</button>
                        </div>
                    ))}
                  </div>
                )}
            </div>

          <div className="bg-gray-100 border-1 border-black rounded-2xl p-4 w-full text-black">
            
            {chosenRecords.length == 0 ? (
              <p className="text-gray-500 text-center">View courses here...</p>
            ) :
            (
              <div>
                <table className="w-full">
                    <thead className="border-b-1 border-black">
                      <tr className="flex flex-row items-center w-full text-xl pb-2">
                        <th className="w-1/5 overflow-hidden">Course Code</th>
                        <th className="w-1/2 overflow-hidden">Course Name</th>
                        <th className="w-1/5 overflow-hidden">Semester</th>
                        <th className="w-1/4 overflow-hidden">Syllabus </th>
                      </tr>
                    </thead>
                    <tbody>
                      {chosenRecords.map((chosenRecord) => (
                            <tr key = {chosenRecord.course_code} className="flex flex-row w-full text-center items-center h-[50px] mt-3 pb-2">
                              <td className="w-1/5 overflow-hidden">{chosenRecord.course_code}</td>
                              <td className="w-1/2 overflow-hidden">{chosenRecord.course_name}</td>
                              <td className="w-1/5 overflow-hidden">{chosenRecord.semester}</td>
                              <td className="w-1/4 overflow-hidden"><button className="bg-blue-600 text-white pl-3 pr-3 rounded-md cursor-pointer hover:scale-110 transition-all duration-300 active:scale-95" onClick = {() => handleViewSyllabus(chosenRecord.syllabus)}>View</button></td>
                            </tr>
                          ))}
                    </tbody>
                </table>
                             
              </div>
            )
          }
           
          </div>
        </div>
      </div>
    </>
  );
}


{/* <div className="">
  {Object.keys(viewSelectedSyllabus).length > 0 && (
    <div className="relative bg-white rounded-lg shadow-2xl h-[95vh] w-[95vw] p-4 flex flex-row">
      hi
      <button className="absolute right-4 top-4">X</button>
    </div>
  )}   
</div>  */}