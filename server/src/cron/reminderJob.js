const cron = require("node-cron");
const Assignment = require("../models/Assignment");
const Company = require("../models/Company");
const Contact = require("../models/Contact");
const { createNotification } = require("../services/notificationService");

const startReminderJob = () => {
    // Schedule to run every minute for demo purposes
    cron.schedule("* * * * *", async () => {
        console.log("Running background assignment reminder job...");
        try {
            const assignments = await Assignment.find();

            for (const assignment of assignments) {
                try {
                    let entityName = "";
                    if (assignment.entityType === "company") {
                        const company = await Company.findById(assignment.entityId);
                        if (company) {
                            entityName = company.name;
                        }
                    } else if (assignment.entityType === "contact") {
                        const contact = await Contact.findById(assignment.entityId);
                        if (contact) {
                            entityName = contact.name;
                        }
                    }

                    if (entityName) {
                        await createNotification({
                            user: assignment.user,
                            title: "Reminder",
                            message: `Follow up with ${entityName}.`,
                            entityType: assignment.entityType,
                            entityId: assignment.entityId,
                        });
                        console.log(`Sent reminder for assignment ${assignment._id} to user ${assignment.user}`);
                    } else {
                        console.log(`Associated entity not found for assignment ${assignment._id}`);
                    }
                } catch (err) {
                    console.error(`Error processing assignment ${assignment._id}:`, err.message);
                }
            }
        } catch (err) {
            console.error("Error in reminder job:", err.message);
        }
    });
    console.log("Reminder job scheduled to run every minute.");
};

module.exports = {
    startReminderJob,
};
