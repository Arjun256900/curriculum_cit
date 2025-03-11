import React, { useEffect, useContext } from "react";
import logo from "../assets/cit_full_logo.png";
import { CreditsPieChartContext } from "./CreditsPieChart";

const Table = ({ semesterData, categoryData, categoryMapping }) => {
  const calculateTotalCredits = (courses) => {
    return courses.reduce(
      (total, course) => total + parseFloat(course.credits || 0),
      0
    );
  };

  const {department, selectedRegulation} = useContext(CreditsPieChartContext);
  useEffect(() => {
    const button = document.getElementById("pdf");

    const handlePrint = () => {
      const renderedContent = document.querySelectorAll(".generatePDF");
      const printWindow = window.open("", "PRINT", "height=500,width=800");

      if (!printWindow) {
        alert("Pop-up blocked. Please allow pop-ups for this website.");
        return;
      }

      const cssStyles = `
        @page {
          size: A4;
          margin: 0;
          margin-top: 5mm;
          margin-bottom: 5mm;
        }
        body {
          font-family: Arial, sans-serif;
          font-size: 12px;
          margin: 0;
          padding: 0;
        }
        .logo {
          text-align: center;
          margin-bottom: 20px;
        }
        .logo img {
          width: auto;
          height: auto;
        }
        table {
          width: 100%;
          margin-bottom: 20px;
          border: 2px solid black;
          text-align: center;
          border-collapse: collapse;
        }
        th, td {
          padding: 8px;
          border: 2px solid black;
          word-wrap: break-word;
          text-align: center;
        }
        .footer-note {
          position: absolute;
          font-size: 10px;
          margin-top: 20px;
          text-align: center;
          color: #555;
        }
        .generatePDF {
          page-break-inside: avoid;
        }
      `;

      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Course Details</title>
            <style>${cssStyles}</style>
          </head>
          <body>
            <div class="logo">
              <img src="${logo}" alt="Institute Logo" />
            </div>
            <h2 style = "text-align: center;"> Department: ${department} Regulation: ${selectedRegulation} </h2>
      `);

      renderedContent.forEach((content) => {
        const heading = content.previousElementSibling;
        if (heading) {
          printWindow.document.write(
            `<h2 style="text-align: center;">${heading.innerText}</h2>`
          );
        }
        printWindow.document.write(content.outerHTML);
      });

      printWindow.document.write(`
        <div class="footer-note">
          *NCC Credit Course is offered for NCC students only. The grades earned by the students will be recorded in the Mark Sheet; however, the same shall not be considered for the computation of CGPA.
        </div>
        </body>
        </html>
      `);

      printWindow.document.close();

      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
        };
      }, 500);
    };

    button.addEventListener("click", handlePrint);

    return () => {
      button.removeEventListener("click", handlePrint);
    };
  }, []);

  const isEmptyData =
    (semesterData && Object.keys(semesterData).length === 0) &&
    (categoryData && Object.keys(categoryData).length === 0);

  return (
    <div>
      {isEmptyData ? (
        <div className="no-data">
          No data available for the selected department and regulation.
        </div>
      ) : (
        <>
        <h2> Department: {department} Regulation: {selectedRegulation} </h2>
          {/* Render semester tables */}
          
          {Object.entries(semesterData || {}).map(([semester, courses]) => (
            
            <div key={semester} style={{ marginBottom: "20px" }}>
              {courses && courses.length > 0 ? (
                <table
                  className="generatePDF"
                  style={{
                    margin: "10px auto",
                    borderCollapse: "collapse",
                    width: "95%",
                    border: "1px solid black",
                  }}
                >
                  
                  <thead>
                    <tr>
                      <th colSpan = "6" style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "15px"}}>Semester {semester}</th>
                    </tr>
                    <tr>
                      <th style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>S.NO.</th>
                      <th style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>Course Code</th>
                      <th style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>Course Name</th>
                      <th style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>Theory/Practical</th>
                      <th style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px", width: "35px"}}>LTP</th>
                      <th style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course, index) => (
                      <tr key={index}>
                        <td style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}> {index+1}</td>
                        <td style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}> {course.course_code}</td>
                        <td style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>{course.course_name}</td>
                        <td style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>{course.tp}</td>
                        <td style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px", width: "35px"}}>{course.ltp}</td>
                        <td style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>{course.credits}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="5" style={{ padding: "10px", textAlign: "right", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>
                        <strong>Total Credits:</strong>
                      </td>
                      <td style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}><strong>{calculateTotalCredits(courses)}</strong></td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                <p>No records available for Semester {semester}.</p>
              )}
            </div>
          ))}

          {/* Render category tables */}
          {Object.entries(categoryData || {}).map(([category, courses]) => (
            <div key={category} style={{ marginBottom: "20px" }}>
              {/* <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
                {categoryMapping && categoryMapping[category]}
              </h3> */}
              <table
                className="generatePDF"
                style={{
                  margin: "10px auto",
                  borderCollapse: "collapse",
                  width: "95%",
                  border: "1px solid black",
                }}
              >
                <thead>
                  <tr>
                    <th colSpan = "6" style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "15px"}}>{categoryMapping && categoryMapping[category]}</th>
                  </tr>
                  <tr>
                    <th style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>S.NO.</th>
                    <th style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>Course Code</th>
                    <th style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>Course Name</th>
                    <th style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>Theory/Practical</th>
                    
                    <th style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px", width: "35px"}}>LTP</th>
                    <th style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={index}>
                      <td style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>{index + 1}</td>
                      <td style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>{course.course_code}</td>
                      <td style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>{course.course_name}</td>
                      <td style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>{course.tp}</td>
                      <td style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px", width: "35px"}}>{course.ltp}</td>
                      <td style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>{course.credits}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="5" style={{ padding: "10px", textAlign: "right", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}>
                      <strong>Total Credits:</strong>
                    </td>
                    <td style={{ padding: "10px", textAlign: "center", border: "1px solid black", background: "white", color: "black", fontSize: "12px"}}><strong>{calculateTotalCredits(courses)}</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ))}
        </>
      )}
      <button
        id="pdf"
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "rgb(40, 167, 69)",
          color: "rgb(255, 255, 255)",
          cursor: "pointer",
          width: "100px",
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
      >
        Print
      </button>
    </div>
  );
};

export default Table;