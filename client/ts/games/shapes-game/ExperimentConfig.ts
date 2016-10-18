import FeedbackTriggerType = require("../feedback/FeedbackTriggerType");
import Model = require("../feedback/FeedbackModel");

var config: Model.IExperiment = {
    ExperimentName: "Here Comes The Experiment Name",
    FeedbackOptions: [
        {
            Name: "Control 1 (Target Change)",
            FeedbackEvents: [
                {
                    Trigger: {
                        TriggerType: FeedbackTriggerType.Begin
                    },
                    Text: "Are you ready?"
                },
                {
                    Trigger: {
                        TriggerType: FeedbackTriggerType.ProgressCountBased,
                        NumberOfEvents: 2
                    },
                    Text: "$targetCount targets completed"
                },
                {
                    Trigger: {
                        TriggerType: FeedbackTriggerType.ProgressCountBased,
                        NumberOfEvents: 5,
                        IsReoccurring: true
                    },
                    Text: "Score: $score"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.End },
                    Text: "Game Over!\nscore: $score"
                }
            ]
        },
        {
            Name: "Control 2 (Score)",
            FeedbackEvents: [
                {
                    Trigger: { TriggerType: FeedbackTriggerType.Begin },
                    Text: "Are you ready?"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.TimeBased, NumberOfEvents: 30, IsReoccurring: true },
                    Text: "Score: $score"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.End },
                    Text: "Game Over!\nscore: $score"
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
                    Trigger: { TriggerType: FeedbackTriggerType.ProgressCountBased, NumberOfEvents: 2 },
                    Text: "$targetCount targets completed\nGood job!",
                    ImageUrl: "images/feedback/wow-smiley.png"
                },
                {
                    Trigger: {
                        TriggerType: FeedbackTriggerType.ProgressCountBased,
                        NumberOfEvents: 15,
                        EventNumberOffset: 10,
                        IsReoccurring: true
                    },
                    Text: "$targetCount targets completed",
                    ImageUrl: "images/feedback/good_job.png"
                },
                {
                    Trigger: {
                        TriggerType: FeedbackTriggerType.ProgressCountBased,
                        NumberOfEvents: 15,
                        EventNumberOffset: 5,
                        IsReoccurring: true
                    },
                    Text: "$targetCount targets completed\nWell done!",
                    ImageUrl: "images/feedback/star_thumbs_up.png"
                },
                {
                    Trigger: {
                        TriggerType: FeedbackTriggerType.ProgressCountBased,
                        NumberOfEvents: 15,
                        IsReoccurring: true
                    },
                    Text: "$targetCount targets completed\nYou are great!",
                    ImageUrl: "images/feedback/wow-smiley.png"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.End },
                    Text: "Congratulations!\nscore: $score",
                    ImageUrl: "images/feedback/praise.png"
                }
            ]
        },
        {
            Name: "Encouragement",
            FeedbackEvents: [
                {
                    Trigger: { TriggerType: FeedbackTriggerType.Begin },
                    Text: "Good luck!",
                    ImageUrl: "images/feedback/4-leaf-clover.png"
                },
                { 
                    Trigger: { TriggerType: FeedbackTriggerType.TimeBased, NumberOfEvents: 30},
                    Text: "Score: $score\nYou can do it!",
                    ImageUrl: "images/feedback/encuragment_2.png"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.TimeBased, NumberOfEvents: 60},
                    Text: "Score: $score\nKeep it up!",
                    ImageUrl: "images/feedback/cool_face.png"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.TimeBased, NumberOfEvents: 90},
                    Text: "Score: $score\nAlmost there!",
                    ImageUrl: "images/feedback/encouragement_3.png"
                },
                {
                    Trigger: { TriggerType: FeedbackTriggerType.End },
                    Text: "Game Over!\nscore: $score",
                    ImageUrl: "images/feedback/hooray.png"
                }
            ]
        }
    ]
};

export = config;