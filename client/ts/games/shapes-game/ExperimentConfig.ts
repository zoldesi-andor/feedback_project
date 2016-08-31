import FeedbackTriggerType = require("../feedback/FeedbackTriggerType");
import Model = require("../feedback/FeedbackModel");

var config: Model.IExperiment = {
    FeedbackOptions: [
        {
            Name: "No feedback",
            FeedbackEvents: [
                {
                    Trigger: { TriggerType: FeedbackTriggerType.Begin },
                    Text: "Are you ready?"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.ProgressCountBased, NumberOfEvents: 1 },
                    Text: "Score: $score"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.ProgressCountBased, NumberOfEvents: 3, IsReoccurring: true },
                    Text: "Score: $score"
                }
            ]
        },
        {
            Name: "Praise",
            FeedbackEvents: [
                {
                    Trigger: { TriggerType: FeedbackTriggerType.Begin },
                    Text: "Are you ready?"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.ProgressCountBased, NumberOfEvents: 1 },
                    Text: "Score: $score",
                    ImageUrl: "images/feedback/well_done.png"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.ProgressCountBased, NumberOfEvents: 3, IsReoccurring: true },
                    Text: "Score: $score",
                    ImageUrl: "images/feedback/well_done.png"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.End },
                    Text: "Congratulations!",
                    ImageUrl: "images/feedback/good_job_green_ribbon.png"
                }
            ]
        },
        {
            Name: "Encouragement",
            FeedbackEvents: [
                {
                    Trigger: { TriggerType: FeedbackTriggerType.Begin },
                    Text: "Good luck!",
                    ImageUrl: "images/feedback/clover.png"
                },
                { 
                    Trigger: { TriggerType: FeedbackTriggerType.TimeBased, NumberOfEvents: 20, IsReoccurring: true},
                    Text: "You can do it!",
                    ImageUrl: "images/feedback/fingerscrossed.png"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.End },
                    ImageUrl: "images/feedback/winking_encouragement.jpg"
                }
            ]
        }
    ]
};

export = config;