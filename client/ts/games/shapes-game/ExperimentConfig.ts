import FeedbackTriggerType = require("../feedback/FeedbackTriggerType");
import Model = require("../feedback/FeedbackModel");

var config: Model.IExperiment = {
    FeedbackOptions: [
        {
            Name: "No feedback",
            FeedbackEvents: []
        },
        {
            Name: "Praise",
            FeedbackEvents: [
                { 
                    Trigger: { TriggerType: FeedbackTriggerType.SuccessCountBased, NumberOfEvents: 3 },
                    Text: "Very Good!",
                    ImageUrl: "images/feedback/very-good.png"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.SuccessCountBased, NumberOfEvents: 6 },
                    Text: "Well done!",
                    ImageUrl: "images/feedback/well-done.png"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.SuccessCountBased, NumberOfEvents: 9 },
                    Text: "You're great!",
                    ImageUrl: "images/feedback/you-are-great.png"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.SuccessCountBased, NumberOfEvents: 12 },
                    Text: "Great Job!",
                    ImageUrl: "images/feedback/great-job.png"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.SuccessCountBased, NumberOfEvents: 15 },
                    Text: "Bravo!",
                    ImageUrl: "images/feedback/bravo.png"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.End },
                    Text: "Good job!",
                    ImageUrl: "images/feedback/good-job.png"
                }
            ]
        },
        {
            Name: "Encouragement",
            FeedbackEvents: [
                {
                    Trigger: { TriggerType: FeedbackTriggerType.Begin },
                    Text: "Good luck!",
                    ImageUrl: "images/feedback/good-luck.png"
                },
                { 
                    Trigger: { TriggerType: FeedbackTriggerType.TimeBased, NumberOfEvents: 20,},
                    Text: "You can do it!",
                    ImageUrl: "images/feedback/very-good.png"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.TimeBased, NumberOfEvents: 40 },
                    Text: "Fingers Crossed!",
                    ImageUrl: "images/feedback/fingers-crossed.png"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.TimeBased, NumberOfEvents: 60 },
                    Text: "You can do it!",
                    ImageUrl: "images/feedback/keep-going.png"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.TimeBased, NumberOfEvents: 80 },
                    Text: "Yayy, do it!",
                    ImageUrl: "images/feedback/yayy-do-it.png"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.TimeBased, NumberOfEvents: 100 },
                    Text: "Go on!",
                    ImageUrl: "images/feedback/go-on.png"
                }
            ]
        }
    ]
};

export = config;