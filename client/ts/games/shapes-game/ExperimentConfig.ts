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
                }
            ]
        },
        {
            Name: "Encouragement",
            FeedbackEvents: [
                {
                    Trigger: { TriggerType: FeedbackTriggerType.TimeBased, SecondsToWait: 30, IsReoccurring: true },
                    Text: "You can do it!",
                    ImageUrl: "images/feedback/you-can-do-it.jpg"
                },
                { 
                    Trigger: { TriggerType: FeedbackTriggerType.ProgressCountBased, NumberOfEvents: 1, IsReoccurring: true },
                    Text: "Very Good!",
                    ImageUrl: "images/feedback/very-good.png"
                }
            ]
        }
    ]
};

export = config;