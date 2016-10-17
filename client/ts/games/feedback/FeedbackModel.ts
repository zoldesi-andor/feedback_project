import FeedbackTriggerType = require("FeedbackTriggerType");

export interface IFeedbackTrigger {
    /** The type of event that triggers the feedback (e.g. Success count, Progress count, time) */
    TriggerType:FeedbackTriggerType;
    /** The feedback will be played/replayed after the specified (FeedbackTriggerType) event occurred this many times */
    NumberOfEvents?:number;
    /** The NumberOfEvents will be offset by this many events first */
    EventNumberOffset?:number;
    /** If true the feedback will be played ever periodically after the specified event occurs NumberOfEvents times */
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