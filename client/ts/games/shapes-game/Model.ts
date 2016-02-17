import GameModel = require("../GameModel");
import Shape = require("Shape");
import ShapeType = require("ShapeType");

declare module Model {      
    /** Interface for the game model. */
    export interface IShapeGameModel extends GameModel.IGameModel {
        /** 
         * Adds a new shape to the game field 
         * @param {Shape} s - The shape to add to the game field.
         */
        addShape(s: Shape): void;
        
        /** Gets all the shapes on the game field */
        getShapes(): Array<Shape>;
        
        /** Gets the target shape type (the kind of shape the user has to find) */
        getTargetShapeType(): ShapeType;
        
        /** 
         * Sets the target shape type (the kind of shape the user has to find) 
         * @param {ShapeType} t - The new target shape type.
         */
        setTargetShapeType(t: ShapeType): void;
        
        /** Gets the number of shapes on the game field matching the target shape type */
        getTargetCount(): number;
    }
}

export = Model;