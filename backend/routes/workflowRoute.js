import express from "express";
import Request from "../models/Request.js";
import Change from "../models/Change.js";
import DeanRequest from "../models/DeanRequest.js";

const router = express.Router();

// Here we register a new request
router.post("/make-request", async (req, res) => {
  console.log("Received course modification request:", req.body);
  const body = req.body;
  try {
    const newRequest = new Request({
      course: body.course,
      requestText: body.requestText,
      facultyName: body.facultyName,
      requestedBy: body.requestedBy, // Role
      department: body.department,
      lastViewed: body.lastViewed,
      hodComment: body.hodComment,
      deanComment: body.deanComment,
      status: "Forwarded to HOD",
      statusForNoti: "pending",
    });
    await newRequest.save();
    res.status(200).json({ message: "Request received" });
  } catch (err) {
    console.error("Error modifying course:", err);
  }
});

// To handle as a HOD
router.post("/hod-action", async (req, res) => {
  console.log("Received HOD action request:", req.body);
  try {
    if (req.body.action === "accepted") {
      const newChangeMade = new Change({
        course: req.body.course,
        requestText: req.body.requestText,
        name: req.body.hodName,
        requestedBy: req.body.requestedBy, // Role
        department: req.body.department,
        lastViewed: req.body.lastViewed,
        hodComment: req.body.hod_comment,
        deanComment: req.body.deanComment,
        status: req.body.status,
        statusForNoti: req.body.statusForNoti,
        acceptedBy: req.body.acceptedBy,
        action: req.body.action,
      });
      await newChangeMade.save();
      await Request.updateOne(
        { requestText: req.body.requestText },
        {
          statusForNoti: "accepted",
          hodComment: req.body.hod_comment,
          deanComment: "Did not require Dean's review",
          status: req.body.status,
          lastViewed: req.body.lastViewed,
        }
      );
    } else if (req.body.action === "rejected") {
      await Request.updateOne(
        { requestText: req.body.requestText },
        {
          statusForNoti: "rejected",
          hodComment: req.body.hod_comment,
          deanComment: "Did not require Dean's review",
          status: req.body.status,
          lastViewed: req.body.lastViewed,
        }
      );
    } else if (req.body.action === "forwarded") {
      const newDeanRequest = new DeanRequest({
        course: req.body.course,
        requestText: req.body.requestText,
        name: req.body.facultyName,
        requestedBy: req.body.requestedBy, // Who raised the request
        department: req.body.department,
        lastViewed: req.body.lastViewed,
        hodComment: req.body.hod_comment,
        deanComment: req.body.deanComment,
        status: req.body.status,
        statusForNoti: req.body.statusForNoti,
        acceptedBy: req.body.acceptedBy,
        action: req.body.action,
      });
      await newDeanRequest.save();
      await Request.updateOne(
        { requestText: req.body.requestText },
        {
          status: `Forwarded to dean by HOD ${req.body.hodName}`,
          hodComment: req.body.hod_comment,
          lastViewed: req.body.lastViewed,
          statusForNoti: "forwarded",
        }
      );
    }
    res.status(200).json({
      message: `${req.body.action} action taken by HOD of department ${req.body.department}`,
    });
  } catch (e) {
    console.error("Error handling HOD action:", e);
  }
});

router.post("/dean-action", async (req, res) => {
  const body = req.body;
  try {
    if (body.action === "accepted") {
      const newChangeMade = new Change({
        course: req.body.course,
        requestText: req.body.requestText,
        name: req.body.hodName,
        requestedBy: req.body.requestedBy, // Role
        department: req.body.department,
        lastViewed: req.body.lastViewed,
        hodComment: req.body.hod_comment,
        deanComment: req.body.deanComment,
        status: req.body.status,
        statusForNoti: req.body.statusForNoti,
        acceptedBy: req.body.acceptedBy,
        action: req.body.action,
      });
      await Request.updateOne(
        { requestText: body.requestText },
        {
          status: `Accepted by Dean Dr. Neethi`,
          statusForNoti: "accepted",
          deanComment: req.body.dean_comment,
          lastViewed: req.body.lastViewed,
          acceptedBy: req.body.acceptedBy,
        }
      );
      await DeanRequest.updateOne(
        { requestText: body.requestText },
        {
          lastViewed: req.body.lastViewed,
          statusForNoti: "accepted",
          deanComment: req.body.dean_comment,
          status: req.body.status,
          acceptedBy: "Dean",
        }
      );
      await newChangeMade.save();
    } else if (body.action === "rejected") {
    }
  } catch (err) {
    console.error("Error handling Dean action:", err);
  }
});

router.get("/all-notifications", async (req, res) => {
  const department = req.query.department;
  const role = req.query.role;

  try {
    if (!department) {
      return res.status(400).json({ error: "Department is required" });
    }
    var requests;
    if (role !== "dean")
      requests = await Request.find({ department: department });
    else requests = await DeanRequest.find();
    res.status(200).json({
      message: "Retrieved all the requests",
      requests: requests,
    });
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
