import FeedbackTriggerType = require("FeedbackTriggerType");

export interface IFeedbackTrigger {
    TriggerType:FeedbackTriggerType;
    NumberOfEvents?:number;
    SecondsToWait?:number;
    IsReoccurring?:boolean;
}

export interface IFeedbackEvent {
    Trigger:IFeedbackTrigger;
    Text?:string;
    ImageUrl?:string;
}

export interface IFeedbackOption {
    Name:string;
    FeedbackEvents:Array<IFeedbackEvent>;
}

export interface IExperiment {
    ExperimentName: string;
    FeedbackOptions:Array<IFeedbackOption>;
}