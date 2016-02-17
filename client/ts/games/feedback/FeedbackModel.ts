import FeedbackTriggerType = require("FeedbackTriggerType");

declare module FeedbackModel {   
    export interface IFeedbackTrigger { 
        TriggerType: FeedbackTriggerType;
        NumberOfSuccesses?: number;
        SecondsToWait?: number;
        IsReocuring?: boolean;
    }
    
    export interface IFeedbackEvent {
        Trigger: IFeedbackTrigger;
        Text: string;
        ImageUrl: string;
    }
    
    export interface IFeedbackOption {
        Name: string;
        FeedbackEvents: Array<IFeedbackEvent>;
    }
    
    export interface IExperiment {
        FeedbackOptions: Array<IFeedbackOption>;
    }
}

export = FeedbackModel;